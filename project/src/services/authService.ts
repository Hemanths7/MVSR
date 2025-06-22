import { supabase } from '../lib/supabase';
import { User } from '../types';
import type { Student, Faculty, Administrator } from '../lib/supabase';

export class AuthService {
  static async validateCredentials(email: string, password: string, role: string): Promise<User | null> {
    try {
      let query;
      let tableName: string;

      switch (role) {
        case 'student':
          tableName = 'students';
          break;
        case 'faculty':
          tableName = 'faculty';
          break;
        case 'admin':
          tableName = 'administrators';
          break;
        default:
          return null;
      }

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('password', password)
        .single();

      if (error || !data) {
        console.error('Authentication error:', error);
        return null;
      }

      // Transform database user to application user format
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: role as 'student' | 'faculty' | 'admin',
        department: data.department,
        rollNumber: data.roll_number,
        employeeId: data.employee_id
      };

      return user;
    } catch (error) {
      console.error('Database connection error:', error);
      return null;
    }
  }

  static async createUser(userData: Partial<User>): Promise<boolean> {
    try {
      let tableName: string;
      let insertData: any;

      switch (userData.role) {
        case 'student':
          tableName = 'students';
          insertData = {
            name: userData.name,
            email: userData.email?.toLowerCase(),
            password: userData.password,
            roll_number: userData.rollNumber,
            department: userData.department || ''
          };
          break;
        case 'faculty':
          tableName = 'faculty';
          insertData = {
            name: userData.name,
            email: userData.email?.toLowerCase(),
            password: userData.password,
            employee_id: userData.employeeId,
            department: userData.department || ''
          };
          break;
        case 'admin':
          tableName = 'administrators';
          insertData = {
            name: userData.name,
            email: userData.email?.toLowerCase(),
            password: userData.password,
            employee_id: userData.employeeId,
            department: userData.department || ''
          };
          break;
        default:
          return false;
      }

      const { error } = await supabase
        .from(tableName)
        .insert([insertData]);

      if (error) {
        console.error('User creation error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }

  static async getAllUsers(role?: string): Promise<User[]> {
    try {
      const users: User[] = [];

      if (!role || role === 'student') {
        const { data: students } = await supabase
          .from('students')
          .select('*');
        
        if (students) {
          users.push(...students.map((s: Student) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            password: s.password,
            role: 'student' as const,
            department: s.department,
            rollNumber: s.roll_number
          })));
        }
      }

      if (!role || role === 'faculty') {
        const { data: faculty } = await supabase
          .from('faculty')
          .select('*');
        
        if (faculty) {
          users.push(...faculty.map((f: Faculty) => ({
            id: f.id,
            name: f.name,
            email: f.email,
            password: f.password,
            role: 'faculty' as const,
            department: f.department,
            employeeId: f.employee_id
          })));
        }
      }

      if (!role || role === 'admin') {
        const { data: administrators } = await supabase
          .from('administrators')
          .select('*');
        
        if (administrators) {
          users.push(...administrators.map((a: Administrator) => ({
            id: a.id,
            name: a.name,
            email: a.email,
            password: a.password,
            role: 'admin' as const,
            department: a.department,
            employeeId: a.employee_id
          })));
        }
      }

      return users;
    } catch (error) {
      console.error('Database connection error:', error);
      return [];
    }
  }
}