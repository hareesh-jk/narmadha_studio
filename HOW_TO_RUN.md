# 🚀 How to Run the Application

## Quick Start (Without Backend Setup)

The app can run **without** Supabase, Stripe, or other backend services configured. Follow these steps:

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create Environment File (Optional)

Create a `.env` file in the root directory (or skip this step to run without backend):

```bash
# Copy the example file
cp .env.example .env
```

**Note**: You can leave the `.env` file empty or skip it entirely. The app will run, but backend features (login, bookings, etc.) won't work until you configure the services.

### Step 3: Run the Development Server

```bash
npm run dev
```

The app should start at: **http://localhost:8080**

---

## ✅ What Works Without Backend Setup

- ✅ **Homepage** - All sections display
- ✅ **Portfolio Page** - Shows portfolio items
- ✅ **Services Page** - Displays services
- ✅ **About Page** - Shows about content
- ✅ **Contact Page** - Contact form (won't send emails)
- ✅ **Pricing Page** - Shows pricing
- ✅ **Navigation** - All pages accessible

## ⚠️ What Won't Work Without Backend

- ❌ **Admin Login** - Requires Supabase setup
- ❌ **Admin Dashboard** - Requires authentication
- ❌ **Booking Form** - Won't save to database
- ❌ **Payment Processing** - Requires Stripe setup

---

## 🔧 Troubleshooting

### Problem: "Cannot find module" errors

**Solution**: Run `npm install` again

```bash
npm install
```

### Problem: Port 8080 already in use

**Solution**: Change the port in `vite.config.ts`:

```typescript
server: {
  port: 3000, // Change to any available port
}
```

### Problem: App crashes on load

**Solution**: Check browser console for errors. Common issues:
- Missing environment variables (app should still run)
- Import errors (run `npm install`)
- Port conflicts

### Problem: "Missing Supabase environment variables" error

**Solution**: This shouldn't happen anymore, but if it does:
1. Create `.env` file (can be empty)
2. Or add placeholder values:
   ```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   ```

---

## 📋 Complete Setup (For Full Functionality)

If you want **all features** to work, follow the complete setup guide:

1. See `SETUP.md` for detailed instructions
2. Set up Supabase for database and authentication
3. Set up Stripe for payments
4. Set up Cloudflare R2 for photo storage
5. Configure email/WhatsApp notifications

---

## 🎯 Running Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for linting errors
npm run lint
```

---

## 🌐 Access the Application

Once running, open your browser to:
- **Local**: http://localhost:8080
- **Network**: Check terminal output for network URL

---

## 💡 Tips

1. **First Time Running**: Just run `npm install` then `npm run dev`
2. **No Backend Needed**: The app works fine for viewing pages without backend setup
3. **Add Backend Later**: You can configure Supabase, Stripe, etc. later without breaking the app
4. **Check Terminal**: The dev server shows errors in the terminal
5. **Check Browser Console**: Press F12 to see browser errors

---

## 🆘 Still Having Issues?

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version
   ```
   Should be Node.js 18+ or higher

3. **Check if port is available**:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   
   # Mac/Linux
   lsof -i :8080
   ```

4. **Try a different port**:
   Edit `vite.config.ts` and change port number

