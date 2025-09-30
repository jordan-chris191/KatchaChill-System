import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { ResponsiveUserDashboard } from './components/ResponsiveUserDashboard';
import { ResponsiveGymStaffDashboard } from './components/ResponsiveGymStaffDashboard';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'worker';
  avatar?: string;
};

type AppState = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>('landing');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('landing');
  };

  const handleSignIn = () => {
    setAppState('login');
  };

  const handleSignUp = () => {
    setAppState('login');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  if (appState === 'landing') {
    return <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  if (appState === 'login') {
    return <Login onLogin={handleLogin} onBack={handleBackToLanding} />;
  }

  if (currentUser?.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser?.role === 'worker') {
    return <ResponsiveGymStaffDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser?.role === 'user') {
    return <ResponsiveUserDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
}