/*
  # Add Himaja Student

  1. New Student Record
    - Add Himaja as a student with mvsr.edu.in email format
    - Roll number: CS21B1002 (following the existing pattern)
    - Department: Computer Science
    - Password: student123 (consistent with other demo accounts)

  2. Update
    - Insert new student record into students table
    - Handle conflict in case record already exists
*/

-- Insert Himaja as a student with MVSR email format
INSERT INTO students (name, email, password, roll_number, department) VALUES
  ('Himaja', 'himaja@mvsr.edu.in', 'student123', 'CS21B1002', 'Computer Science')
ON CONFLICT (email) DO NOTHING;

-- Also handle potential roll number conflict
INSERT INTO students (name, email, password, roll_number, department) VALUES
  ('Himaja', 'himaja@mvsr.edu.in', 'student123', 'CS21B1002', 'Computer Science')
ON CONFLICT (roll_number) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  password = EXCLUDED.password,
  department = EXCLUDED.department;