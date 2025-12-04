import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AdminUser, getCurrentAdmin, onAuthStateChange, signInAdmin, signOutAdmin } from '@/lib/auth';

interface AuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      setLoading(false);
      return;
    }

    // Check initial auth state
    getCurrentAdmin().then((admin) => {
      setAdmin(admin);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    try {
      const { data: { subscription } } = onAuthStateChange((admin) => {
        setAdmin(admin);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const { profile } = await signInAdmin(email, password);
    setAdmin(profile);
  };

  const signOut = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      // Ignore errors if Supabase not configured
    }
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

