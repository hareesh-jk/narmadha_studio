# Quick Start Guide - Narmadha Studio Photography

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your service credentials (see `SETUP.md` for detailed instructions)

### Step 3: Set Up Database
1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL from `supabase-schema.sql` in Supabase SQL Editor
4. Create an admin user and add to `admin_profiles` table

### Step 4: Add Your Logo
1. Place `logo.png` in the `public/` folder
2. The logo will appear automatically in navbar, footer, and admin panel

### Step 5: Run the Application
```bash
npm run dev
```

Visit `http://localhost:8080` to see your site!

## 📋 What's Included

✅ **Database**: Supabase (free tier) for bookings, customers, portfolio  
✅ **Authentication**: Admin login with Supabase Auth  
✅ **Payments**: Stripe integration ready  
✅ **Storage**: Cloudflare R2 for photo storage  
✅ **Notifications**: Email & WhatsApp via edge functions  
✅ **Branding**: All updated to "Narmadha Studio"  

## 🔗 Important Links

- **Full Setup Guide**: See `SETUP.md`
- **Logo/Video Setup**: See `LOGO_VIDEO_SETUP.md`
- **Implementation Summary**: See `IMPLEMENTATION_SUMMARY.md`

## ⚠️ Before Going Live

1. Set up all services (Supabase, Stripe, Cloudflare R2, etc.)
2. Deploy edge functions for notifications
3. Create backend API routes for payments
4. Add your logo and video assets
5. Test all features thoroughly
6. Update production environment variables

## 💡 Need Help?

Check the detailed guides:
- `SETUP.md` - Complete setup instructions
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `LOGO_VIDEO_SETUP.md` - Adding your assets

