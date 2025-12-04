import { supabase, Booking, Customer, PortfolioItem } from './supabase';

// Customer API
export async function createCustomer(data: {
  name: string;
  email: string;
  phone: string;
}): Promise<Customer> {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return customer;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// Booking API
export async function createBooking(data: {
  customer_id: string;
  service_type: string;
  package_id: string;
  booking_date: string;
  booking_time: string;
  location?: string;
  notes?: string;
  total_amount: number;
}): Promise<Booking> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert([data])
    .select(`
      *,
      customer:customers(*)
    `)
    .single();

  if (error) throw error;
  return booking;
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      customer:customers(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status']
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBookingPayment(
  id: string,
  paymentData: {
    advance_paid?: number;
    payment_status?: Booking['payment_status'];
    stripe_payment_intent_id?: string;
  }
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(paymentData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Portfolio API
export async function getPortfolioItems(category?: string): Promise<PortfolioItem[]> {
  let query = supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data || [];
}

export async function createPortfolioItem(data: {
  title: string;
  description?: string;
  category: string;
  image_urls: string[];
  featured?: boolean;
}): Promise<PortfolioItem> {
  const { data: item, error } = await supabase
    .from('portfolio')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return item;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

