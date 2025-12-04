# 🔐 Authentication System - Deep Dive Explanation

## Overview

The authentication system uses **Supabase Auth** (a managed authentication service) combined with a custom **admin_profiles** table to control admin access. This is a **two-layer security system**.

---

## 🏗️ Architecture: Two-Layer Authentication System

### Layer 1: Supabase Auth (Authentication Layer)
**Location**: Managed by Supabase (cloud service)

**What it does**:
- Handles user credentials (email + password)
- Stores encrypted passwords
- Manages login sessions
- Provides JWT tokens
- Handles password reset, email verification, etc.

**Table**: `auth.users` (automatically created by Supabase)
- This table is **NOT** in your database schema
- It's managed entirely by Supabase
- You can't directly query it with SQL
- Access it only through Supabase Auth API

### Layer 2: Admin Profiles (Authorization Layer)
**Location**: Your database (`admin_profiles` table)

**What it does**:
- Stores additional admin information
- Links Supabase user ID to admin role
- Controls who can access admin features
- Enables role-based access control

**Table**: `admin_profiles` (created by you in `supabase-schema.sql`)

---

## 📋 Step-by-Step Setup Explanation

### Step 1-3: Supabase Project Setup

```
1. Create Supabase account → Get cloud database + auth service
2. Create project → Get unique project URL
3. Get API keys → Connect your app to Supabase
```

**What you get**:
- **Project URL**: `https://xxxxx.supabase.co`
- **Anon Key**: Public key (safe to use in frontend)
- **Service Key**: Secret key (NEVER expose in frontend)

---

### Step 4: Database Schema Setup

When you run `supabase-schema.sql`, you create:

```sql
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Key Point**: The `id` column references `auth.users(id)` - this creates the link!

---

### Step 5: Create Admin User in Supabase Auth

**Where**: Supabase Dashboard → Authentication → Users → Add User

**What happens**:
1. You enter email: `admin@narmadhastudio.com`
2. You enter password: `your-secure-password`
3. Supabase creates a record in `auth.users` table
4. Password is **hashed** (never stored in plain text)
5. Supabase returns a **User ID** (UUID format)

**Example User ID**: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Important**: 
- This user can now **authenticate** (login)
- But they **cannot** access admin features yet
- They need to be added to `admin_profiles` table

---

### Step 6: Link User to Admin Profile

**Where**: Supabase Dashboard → SQL Editor

**What you do**:
```sql
INSERT INTO admin_profiles (id, email, full_name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',  -- User ID from Step 5
  'admin@narmadhastudio.com',
  'Admin',
  'admin'
);
```

**What happens**:
1. Creates a record in `admin_profiles` table
2. Links the Supabase user to admin role
3. Now the user can access admin features

---

## 🔄 Complete Authentication Flow

### When Admin Logs In:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User enters email + password in AdminLogin component     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Frontend calls: signInAdmin(email, password)            │
│    Location: src/lib/auth.ts                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Supabase Auth verifies credentials                       │
│    Checks: auth.users table                                 │
│    Validates: Email exists? Password correct?                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. If valid: Supabase returns JWT token + user data        │
│    Token stored in browser (localStorage/cookies)            │
│    User ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Check admin_profiles table                               │
│    Query: SELECT * FROM admin_profiles                      │
│            WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'│
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. If profile exists: Login successful ✅                   │
│    If profile missing: Login failed ❌                       │
│    (Even if password was correct!)                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Admin state stored in AuthContext                        │
│    Location: src/contexts/AuthContext.tsx                   │
│    Available throughout the app                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📍 Where Authentication Lives in Code

### 1. **Authentication Functions** (`src/lib/auth.ts`)

```typescript
// This is the core authentication logic
export async function signInAdmin(email: string, password: string) {
  // Step 1: Authenticate with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Step 2: Check if user is admin
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', data.user.id)  // Match user ID from auth.users
    .single();

  // Step 3: If no admin profile, reject login
  if (!profile) {
    await supabase.auth.signOut();
    throw new Error('Unauthorized: Admin access required');
  }

  return { user: data.user, profile };
}
```

**What this does**:
- Authenticates user credentials
- Checks admin authorization
- Returns user + profile data

---

### 2. **Auth Context** (`src/contexts/AuthContext.tsx`)

```typescript
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  
  // Check if user is logged in when app loads
  useEffect(() => {
    getCurrentAdmin().then((admin) => {
      setAdmin(admin);
    });
  }, []);

  // Provide auth functions to entire app
  return (
    <AuthContext.Provider value={{ admin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**What this does**:
- Manages authentication state globally
- Provides `signIn` and `signOut` functions
- Makes admin data available everywhere

---

### 3. **Login Page** (`src/pages/admin/AdminLogin.tsx`)

```typescript
const { signIn } = useAuth();  // Get signIn function from context

const handleSubmit = async (e) => {
  await signIn(credentials.email, credentials.password);
  navigate("/admin/dashboard");
};
```

**What this does**:
- Collects email/password from form
- Calls `signIn` function
- Redirects to dashboard on success

---

### 4. **Protected Routes** (`src/components/ProtectedRoute.tsx`)

```typescript
export function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (!admin) {
    return <Navigate to="/admin/login" />;  // Redirect if not admin
  }

  return <>{children}</>;  // Show content if admin
}
```

**What this does**:
- Checks if user is admin
- Blocks access if not authenticated
- Redirects to login page

---

## 🔒 Security Features

### 1. **Password Hashing**
- Supabase automatically hashes passwords using bcrypt
- Passwords are NEVER stored in plain text
- Even database admins can't see passwords

### 2. **JWT Tokens**
- After login, Supabase issues a JWT token
- Token contains user ID and expiration time
- Token is signed and can't be tampered with
- Stored securely in browser

### 3. **Row Level Security (RLS)**
```sql
-- Only admins can read bookings
CREATE POLICY "Admins can read all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()  -- auth.uid() = current user ID
    )
  );
```

**What this does**:
- Even if someone bypasses frontend, they can't access data
- Database enforces permissions
- `auth.uid()` automatically gets current user ID from JWT token

### 4. **Two-Layer Protection**
- **Layer 1**: Must authenticate (correct password)
- **Layer 2**: Must be in admin_profiles table
- **Both** must pass for admin access

---

## 🎯 Why Two Tables?

### Why Not Just Use `auth.users`?

**Problem**: Supabase Auth is for **all users** (customers, admins, etc.)
- You can't add custom fields easily
- You can't control who is admin vs customer
- Limited customization

### Why Add `admin_profiles`?

**Solution**: Separate table for admin-specific data
- ✅ Control who is admin
- ✅ Add custom fields (role, full_name, etc.)
- ✅ Easy to add/remove admins
- ✅ Can have multiple roles in future

### Example Scenario:

```
auth.users table:
├── User 1: customer@example.com (customer)
├── User 2: admin@narmadhastudio.com (admin)
└── User 3: another@example.com (customer)

admin_profiles table:
└── Only User 2 (admin@narmadhastudio.com)

Result:
- User 1 & 3: Can login but NO admin access
- User 2: Can login AND has admin access
```

---

## 🔍 How to Check Current Authentication State

### In Browser Console:

```javascript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log(user);  // null if not logged in

// Check admin profile
const { data: profile } = await supabase
  .from('admin_profiles')
  .select('*')
  .eq('id', user.id)
  .single();
console.log(profile);  // null if not admin
```

### In React Component:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { admin, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!admin) return <div>Not logged in</div>;
  
  return <div>Welcome, {admin.email}!</div>;
}
```

---

## 🛠️ Troubleshooting

### Problem: "Invalid credentials" but password is correct

**Cause**: User exists in `auth.users` but NOT in `admin_profiles`

**Solution**: Run Step 6 SQL to add user to admin_profiles

---

### Problem: Can login but can't access admin dashboard

**Cause**: RLS policy blocking access

**Solution**: Check that `auth.uid()` matches admin_profiles.id

---

### Problem: "Unauthorized: Admin access required"

**Cause**: User authenticated but no admin profile

**Solution**: Add user to admin_profiles table

---

## 📊 Database Relationships

```
auth.users (Supabase managed)
    │
    │ id (UUID)
    │ email
    │ encrypted_password
    │
    └───┐
        │
        │ REFERENCES
        │
        ▼
admin_profiles (Your table)
    │ id (UUID) ← Links to auth.users.id
    │ email
    │ full_name
    │ role
```

**Key**: The `id` in `admin_profiles` MUST match `id` in `auth.users`

---

## 🎓 Summary

1. **Supabase Auth** = Handles login (email + password)
2. **admin_profiles** = Controls who is admin
3. **Both** must pass for admin access
4. **RLS Policies** = Database-level security
5. **JWT Tokens** = Secure session management

This two-layer system ensures:
- ✅ Secure password storage
- ✅ Role-based access control
- ✅ Database-level security
- ✅ Easy admin management

