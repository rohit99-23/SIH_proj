import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department?: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  student_id: string;
  title: string;
  description: string;
  category: 'academic' | 'co-curricular' | 'extra-curricular';
  type: string;
  date: string;
  points: number;
  status: 'pending' | 'verified' | 'rejected';
  verifier_id?: string;
  documents: string[];
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}