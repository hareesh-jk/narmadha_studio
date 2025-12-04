# Setup Guide for Narmadha Studio Photography

This guide will help you set up all the required services for the application to run independently with free tiers.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Accounts for the following services (all have free tiers):
  - Supabase (Database & Auth)
  - Stripe (Payments)
  - Cloudflare (R2 Storage & Workers)
  - Resend (Email) or similar
  - Twilio (WhatsApp) or similar

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase (Free Tier)

### Understanding the Authentication System

The authentication uses a **two-layer system**:
1. **Supabase Auth** - Handles login (email + password verification)
2. **admin_profiles table** - Controls who has admin access

**Why two layers?** Even if someone knows the password, they can't access admin features unless they're also in the `admin_profiles` table. This provides extra security.

### Detailed Setup Steps:

1. **Create Supabase Account**
   - Go to [Supabase](https://supabase.com) and create a free account
   - Free tier includes: 500MB database, 2GB bandwidth/month

2. **Create New Project**
   - Click "New Project"
   - Choose a name (e.g., "narmadha-studio")
   - Set a database password (save this securely!)
   - Wait for project to initialize (~2 minutes)

3. **Get API Credentials**
   - Go to **Settings** → **API**
   - Copy these values (you'll need them for `.env` file):
     - **Project URL**: `https://xxxxx.supabase.co`
     - **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ⚠️ **Service Role Key** is secret - never expose in frontend!

4. **Set Up Database Schema**
   - Go to **SQL Editor** in Supabase dashboard
   - Click "New Query"
   - Copy and paste the entire contents of `supabase-schema.sql`
   - Click "Run" (or press Ctrl+Enter)
   - ✅ You should see "Success. No rows returned"
   - This creates the `admin_profiles` table and security policies

5. **Create Admin User in Supabase Auth**
   - Go to **Authentication** → **Users** → **Add User**
   - **Email**: `admin@narmadhastudio.com`
   - **Password**: Choose a strong password (save it securely!)
   - **Auto Confirm User**: ✅ Check this (for admin, skip email verification)
   - Click "Create User"
   - ⚠️ **Important**: After creating, click on the user to see details
   - Copy the **User ID** (UUID format like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

6. **Link User to Admin Profile**
   - Go back to **SQL Editor**
   - Run this SQL (replace `<user_id_from_step_5>` with the actual User ID):
   ```sql
   INSERT INTO admin_profiles (id, email, full_name, role)
   VALUES (
     '<user_id_from_step_5>',  -- Paste the User ID here
     'admin@narmadhastudio.com',
     'Admin',
     'admin'
   );
   ```
   - Click "Run"
   - ✅ Should see "Success. 1 row inserted"

### What Just Happened?

- **Step 5** created a user in `auth.users` (Supabase's authentication table)
- **Step 6** linked that user to `admin_profiles` (your custom table)
- Now when this user logs in, they'll have admin access!

### Verify Setup:

Run this SQL to check:
```sql
SELECT ap.*, au.email as auth_email
FROM admin_profiles ap
JOIN auth.users au ON ap.id = au.id;
```

You should see your admin user listed.

### Troubleshooting:

- **"User ID not found"**: Make sure you copied the entire UUID from Step 5
- **"Duplicate key"**: User already exists in admin_profiles
- **"Foreign key violation"**: User ID doesn't exist in auth.users - check Step 5

📚 **For deeper understanding**, see `AUTHENTICATION_DEEP_DIVE.md` and `AUTHENTICATION_FLOW_DIAGRAM.md`

## Step 3: Set Up Stripe (Free Tier)

1. Go to [Stripe](https://stripe.com) and create an account
2. Get your API keys from Dashboard > Developers > API keys
3. Copy:
   - Publishable key (starts with `pk_`)
   - Secret key (starts with `sk_`) - keep this secure

## Step 4: Set Up Cloudflare R2 (Free Tier)

1. Go to [Cloudflare](https://cloudflare.com) and create an account
2. Go to R2 > Create bucket
3. Name your bucket (e.g., `narmadha-studio-photos`)
4. Go to Manage R2 API Tokens > Create API Token
5. Copy:
   - Account ID
   - Access Key ID
   - Secret Access Key
6. Set up public access:
   - Go to your bucket > Settings > Public Access
   - Enable public access and note the public URL

## Step 5: Set Up Email Service (Resend - Free Tier)

1. Go to [Resend](https://resend.com) and create an account
2. Verify your domain or use their test domain
3. Copy your API key from API Keys section

## Step 6: Set Up WhatsApp (Twilio - Free Trial)

1. Go to [Twilio](https://twilio.com) and create an account (free trial available)
2. Go to Console > Phone Numbers > WhatsApp
3. Get your WhatsApp number
4. Copy:
   - Account SID
   - Auth Token
   - WhatsApp number

## Step 7: Deploy Edge Functions

### Email Function

1. Go to Cloudflare Dashboard > Workers & Pages
2. Create a new Worker
3. Copy the code from `functions/notifications/email.ts`
4. Add environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `EMAIL_FROM`: noreply@narmadhastudio.com
5. Deploy and note the Worker URL

### WhatsApp Function

1. Create another Worker in Cloudflare
2. Copy the code from `functions/notifications/whatsapp.ts`
3. Add environment variables:
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
   - `TWILIO_WHATSAPP_NUMBER`: Your WhatsApp number (format: whatsapp:+1234567890)
4. Deploy and note the Worker URL

## Step 8: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in all the values in `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_R2_ACCOUNT_ID=your_r2_account_id
   VITE_R2_ACCESS_KEY_ID=your_r2_access_key_id
   VITE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   VITE_R2_BUCKET_NAME=your_r2_bucket_name
   VITE_R2_PUBLIC_URL=your_r2_public_url
   VITE_WHATSAPP_API_KEY=your_whatsapp_api_key
   VITE_WHATSAPP_API_SECRET=your_whatsapp_api_secret
   VITE_WHATSAPP_PHONE_NUMBER=your_whatsapp_phone_number
   VITE_EMAIL_API_KEY=your_email_api_key
   VITE_EMAIL_FROM=noreply@narmadhastudio.com
   VITE_APP_URL=http://localhost:8080
   ```

## Step 9: Set Up API Routes (Backend)

You'll need to create backend API routes for:
- Stripe payment intent creation (`/api/stripe/create-payment-intent`)
- Email notifications (`/api/notifications/email`)
- WhatsApp notifications (`/api/notifications/whatsapp`)

These can be deployed as:
- Cloudflare Workers (recommended - free tier)
- Vercel Serverless Functions
- Netlify Functions
- Or any Node.js backend

Example structure:
```
/api
  /stripe
    create-payment-intent.ts
  /notifications
    email.ts
    whatsapp.ts
```

## Step 10: Add Logo and Video

1. Place your logo file in `public/logo.png` (or update references)
2. Place your video file in `public/video.mp4` (or update references)
3. Update components to use these assets

## Step 11: Run the Application

```bash
npm run dev
```

The application should now be running at `http://localhost:8080`

## Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check that RLS policies are set up correctly
- Ensure admin profile exists in database

### Payment Issues
- Verify Stripe keys are correct
- Check that payment intent API route is deployed
- Ensure webhook is configured in Stripe dashboard

### Storage Issues
- Verify R2 credentials are correct
- Check bucket permissions
- Ensure public URL is configured

### Notification Issues
- Verify edge function URLs are correct
- Check environment variables in Workers
- Test API endpoints directly

## Free Tier Limits

- **Supabase**: 500MB database, 2GB bandwidth/month
- **Stripe**: No free tier, but test mode is free
- **Cloudflare R2**: 10GB storage, 1M Class A operations/month
- **Cloudflare Workers**: 100,000 requests/day
- **Resend**: 3,000 emails/month
- **Twilio**: Free trial credits available

## Next Steps

1. Customize branding and content
2. Add your logo and video assets
3. Configure custom domain
4. Set up production environment variables
5. Test all features thoroughly
6. Deploy to production

