import { User } from '../types';

export const mockUsers: User[] = [
  // Students
  {
    id: '1',
    name: 'Hemanth Kumar',
    email: 'hemanth@student.edu',
    password: 'student123',
    role: 'student',
    rollNumber: 'CS21B1001',
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@student.edu',
    password: 'student123',
    role: 'student',
    rollNumber: 'EC21B1015',
    department: 'Electronics'
  },
  {
    id: '3',
    name: 'Raj Patel',
    email: 'raj@student.edu',
    password: 'student123',
    role: 'student',
    rollNumber: 'ME21B1030',
    department: 'Mechanical Engineering'
  },
  
  // Faculty
  {
    id: '4',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@faculty.edu',
    password: 'faculty123',
    role: 'faculty',
    employeeId: 'FAC001',
    department: 'Computer Science'
  },
  {
    id: '5',
    name: 'Prof. Michael Chen',
    email: 'michael@faculty.edu',
    password: 'faculty123',
    role: 'faculty',
    employeeId: 'FAC002',
    department: 'Mathematics'
  },
  {
    id: '6',
    name: 'Dr. Anita Verma',
    email: 'anita@faculty.edu',
    password: 'faculty123',
    role: 'faculty',
    employeeId: 'FAC003',
    department: 'Physics'
  },
  
  // Administrators
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@admin.edu',
    password: 'admin123',
    role: 'admin',
    employeeId: 'ADM001',
    department: 'Administration'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa@admin.edu',
    password: 'admin123',
    role: 'admin',
    employeeId: 'ADM002',
    department: 'Student Affairs'
  }
];

export const validateCredentials = (email: string, password: string, role: string): User | null => {
  const user = mockUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && 
         u.password === password && 
         u.role === role
  );
  return user || null;
};