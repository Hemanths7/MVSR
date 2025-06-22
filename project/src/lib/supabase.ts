import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  roll_number?: string;
  employee_id?: string;
  department: string;
  created_at: string;
}

export interface Student extends DatabaseUser {
  roll_number: string;
}

export interface Faculty extends DatabaseUser {
  employee_id: string;
}

export interface Administrator extends DatabaseUser {
  employee_id: string;
}