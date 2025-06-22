import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

type AppState = 'home' | 'login' | 'dashboard';

const AppContent: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { isAuthenticated } = useAuth();

  // Auto-redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentState('dashboard');
    }
  }, [isAuthenticated]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentState('login');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedRole('');
  };

  const handleLoginSuccess = () => {
    setCurrentState('dashboard');
  };

  if (currentState === 'dashboard' && isAuthenticated) {
    return <Dashboard />;
  }

  if (currentState === 'login' && selectedRole) {
    return (
      <LoginForm
        role={selectedRole}
        onBack={handleBackToHome}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return <HomePage onRoleSelect={handleRoleSelect} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;