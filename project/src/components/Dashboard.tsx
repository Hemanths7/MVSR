import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, BookOpen, Calendar, Users, Settings, FileText, BarChart3, Shield, Database } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const roleConfig = {
    student: {
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      features: [
        { icon: BookOpen, title: 'My Courses', desc: 'View enrolled courses and materials' },
        { icon: Calendar, title: 'Schedule', desc: 'Check class timetables and events' },
        { icon: FileText, title: 'Assignments', desc: 'Submit and track assignments' },
        { icon: BarChart3, title: 'Grades', desc: 'View academic performance' }
      ]
    },
    faculty: {
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-emerald-50',
      features: [
        { icon: Users, title: 'My Classes', desc: 'Manage students and coursework' },
        { icon: FileText, title: 'Gradebook', desc: 'Enter and manage student grades' },
        { icon: Calendar, title: 'Schedule', desc: 'View teaching schedule' },
        { icon: Settings, title: 'Course Settings', desc: 'Configure course preferences' }
      ]
    },
    admin: {
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-violet-50',
      features: [
        { icon: Users, title: 'User Management', desc: 'Manage students and faculty' },
        { icon: Database, title: 'System Data', desc: 'View system analytics' },
        { icon: Shield, title: 'Security', desc: 'Manage system security settings' },
        { icon: Settings, title: 'Configuration', desc: 'System-wide settings' }
      ]
    }
  };

  const config = roleConfig[currentUser.role];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">EduPortal</h1>
              <p className="text-sm text-gray-600 capitalize">{currentUser.role} Dashboard</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {getGreeting()}, {currentUser.name}! 👋
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to your {currentUser.role} dashboard. Here's what you can do today:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {currentUser.rollNumber && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Roll Number</p>
                  <p className="text-blue-600">{currentUser.rollNumber}</p>
                </div>
              )}
              {currentUser.employeeId && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Employee ID</p>
                  <p className="text-green-600">{currentUser.employeeId}</p>
                </div>
              )}
              <div className={`${currentUser.role === 'student' ? 'bg-indigo-50' : currentUser.role === 'faculty' ? 'bg-emerald-50' : 'bg-purple-50'} p-4 rounded-lg`}>
                <p className={`text-sm font-medium ${currentUser.role === 'student' ? 'text-indigo-800' : currentUser.role === 'faculty' ? 'text-emerald-800' : 'text-purple-800'}`}>Department</p>
                <p className={`${currentUser.role === 'student' ? 'text-indigo-600' : currentUser.role === 'faculty' ? 'text-emerald-600' : 'text-purple-600'}`}>{currentUser.department}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-800">Email</p>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {currentUser.role === 'student' && (
              <>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">Assignment submitted</p>
                    <p className="text-sm text-gray-600">Data Structures - Assignment 3</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">Grade received</p>
                    <p className="text-sm text-gray-600">Database Systems - Midterm: A-</p>
                  </div>
                </div>
              </>
            )}
            {currentUser.role === 'faculty' && (
              <>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">Grades updated</p>
                    <p className="text-sm text-gray-600">CS101 - Midterm results published</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">New assignment created</p>
                    <p className="text-sm text-gray-600">Algorithm Analysis - Project 2</p>
                  </div>
                </div>
              </>
            )}
            {currentUser.role === 'admin' && (
              <>
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">System backup completed</p>
                    <p className="text-sm text-gray-600">Weekly automated backup - Success</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-800">New user registrations</p>
                    <p className="text-sm text-gray-600">15 new student accounts pending approval</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;