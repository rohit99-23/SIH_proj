import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, type User, type UserRole } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock initial user - in production, this would check Supabase session
    const mockUser: User = {
      id: '1',
      email: 'student@university.edu',
      full_name: 'John Smith',
      role: 'student',
      department: 'Computer Science',
      created_at: new Date().toISOString()
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in - in production, use Supabase auth
    const mockUser: User = {
      id: '1',
      email,
      full_name: email.includes('faculty') ? 'Dr. Jane Doe' : email.includes('admin') ? 'Admin User' : 'John Smith',
      role: email.includes('faculty') ? 'faculty' : email.includes('admin') ? 'admin' : 'student',
      department: 'Computer Science',
      created_at: new Date().toISOString()
    };
    setUser(mockUser);
  };

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    // Mock sign up - in production, use Supabase auth
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      role,
      department: 'Computer Science',
      created_at: new Date().toISOString()
    };
    setUser(mockUser);
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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