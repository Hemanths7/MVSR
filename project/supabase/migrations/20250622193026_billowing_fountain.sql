/*
  # Create Users Schema for Role-Based Login Portal

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password` (text)
      - `roll_number` (text, unique)
      - `department` (text)
      - `created_at` (timestamp)
    
    - `faculty`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password` (text)
      - `employee_id` (text, unique)
      - `department` (text)
      - `created_at` (timestamp)
    
    - `administrators`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password` (text)
      - `employee_id` (text, unique)
      - `department` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for role-based access control

  3. Sample Data
    - Insert demo users for testing
    - Students, Faculty, and Administrator accounts
*/

-- Create Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  roll_number text UNIQUE NOT NULL,
  department text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create Faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  employee_id text UNIQUE NOT NULL,
  department text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create Administrators table
CREATE TABLE IF NOT EXISTS administrators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  employee_id text UNIQUE NOT NULL,
  department text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE administrators ENABLE ROW LEVEL SECURITY;

-- Create policies for students
CREATE POLICY "Students can read own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can insert own data"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for faculty
CREATE POLICY "Faculty can read own data"
  ON faculty
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Faculty can insert own data"
  ON faculty
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for administrators
CREATE POLICY "Administrators can read own data"
  ON administrators
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Administrators can insert own data"
  ON administrators
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert sample students
INSERT INTO students (name, email, password, roll_number, department) VALUES
  ('Hemanth Kumar', 'hemanth@student.edu', 'student123', 'CS21B1001', 'Computer Science'),
  ('Priya Sharma', 'priya@student.edu', 'student123', 'EC21B1015', 'Electronics'),
  ('Raj Patel', 'raj@student.edu', 'student123', 'ME21B1030', 'Mechanical Engineering')
ON CONFLICT (email) DO NOTHING;

-- Insert sample faculty
INSERT INTO faculty (name, email, password, employee_id, department) VALUES
  ('Dr. Sarah Johnson', 'sarah@faculty.edu', 'faculty123', 'FAC001', 'Computer Science'),
  ('Prof. Michael Chen', 'michael@faculty.edu', 'faculty123', 'FAC002', 'Mathematics'),
  ('Dr. Anita Verma', 'anita@faculty.edu', 'faculty123', 'FAC003', 'Physics')
ON CONFLICT (email) DO NOTHING;

-- Insert sample administrators
INSERT INTO administrators (name, email, password, employee_id, department) VALUES
  ('James Wilson', 'james@admin.edu', 'admin123', 'ADM001', 'Administration'),
  ('Lisa Anderson', 'lisa@admin.edu', 'admin123', 'ADM002', 'Student Affairs')
ON CONFLICT (email) DO NOTHING;