import React from 'react';
import { GraduationCap, Users, Shield } from 'lucide-react';

interface HomePageProps {
  onRoleSelect: (role: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Access your courses, assignments, and academic records',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'faculty',
      title: 'Faculty Portal',
      description: 'Manage courses, grades, and connect with students',
      icon: Users,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'admin',
      title: 'Administrator Portal',
      description: 'System administration and institutional management',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            EduPortal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure role-based access to your educational resources. Choose your portal to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className={`bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {role.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {role.description}
                </p>
                
                <button className={`w-full py-3 px-6 bg-gradient-to-r ${role.color} ${role.hoverColor} text-white font-semibold rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-opacity-50`}>
                  Access Portal
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Demo Credentials</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Students</h4>
                <p className="text-blue-600 font-medium">himaja@mvsr.edu.in / student123</p>
                <p className="text-blue-600">hemanth@student.edu / student123</p>
                <p className="text-blue-600">priya@student.edu / student123</p>
                <p className="text-blue-600">raj@student.edu / student123</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Faculty</h4>
                <p className="text-green-600">sarah@faculty.edu / faculty123</p>
                <p className="text-green-600">michael@faculty.edu / faculty123</p>
                <p className="text-green-600">anita@faculty.edu / faculty123</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Administrators</h4>
                <p className="text-purple-600">james@admin.edu / admin123</p>
                <p className="text-purple-600">lisa@admin.edu / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;