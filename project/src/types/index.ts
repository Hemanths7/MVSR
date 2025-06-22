export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  rollNumber?: string;
  department?: string;
  employeeId?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}