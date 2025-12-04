import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: string;
}

export async function signInAdmin(email: string, password: string) {
  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Check if user is admin
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    throw new Error('Unauthorized: Admin access required');
  }

  return { user: data.user, profile };
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile || null;
}

export function onAuthStateChange(callback: (user: AdminUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const admin = await getCurrentAdmin();
      callback(admin);
    } else {
      callback(null);
    }
  });
}

