# Narmadha Studio Photography

Professional photography studio website with booking system, portfolio management, and admin dashboard.

## 🚀 Quick Start

### Run the Application (3 Simple Steps)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:8080
```

**That's it!** The app will run without any backend setup. 🎉

> **Note**: Backend features (admin login, bookings, payments) require additional setup. See `SETUP.md` for details.

## 📚 Documentation

- **`START_HERE.md`** - Quick start guide
- **`HOW_TO_RUN.md`** - Detailed running instructions & troubleshooting
- **`SETUP.md`** - Complete backend setup guide
- **`AUTHENTICATION_DEEP_DIVE.md`** - Authentication system explained

## 🎯 What Works Out of the Box

- ✅ Homepage with all sections
- ✅ Portfolio page (displays all photos)
- ✅ Services, About, Contact, Pricing pages
- ✅ Navigation and routing
- ✅ Responsive design

## ⚙️ Prerequisites (For Full Functionality)

- Node.js 18+ and npm installed
- Supabase account (free tier) - for database & auth
- Cloudflare account (for R2 storage)
- Stripe account (for payments)

## Features

- **Booking System**: Multi-step booking form with date/time selection
- **Portfolio Management**: Dynamic portfolio galleries
- **Admin Dashboard**: Complete admin panel for managing bookings, customers, and portfolio
- **Payment Integration**: Stripe payment processing
- **Photo Storage**: Cloudflare R2 (S3-compatible) storage
- **Notifications**: Email and WhatsApp notifications via edge functions

## Technologies

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Auth)
- Stripe (Payments)
- Cloudflare R2 (Storage)

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

Build for production:

```sh
npm run build
```

Preview production build:

```sh
npm run preview
```
