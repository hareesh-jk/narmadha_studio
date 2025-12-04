import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client with fallback empty strings if not configured
// This allows the app to run without Supabase setup initially
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Database Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  service_type: string;
  package_id: string;
  booking_date: string;
  booking_time: string;
  location: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  advance_paid: number;
  payment_status: 'pending' | 'partial' | 'paid';
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  image_urls: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

