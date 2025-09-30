import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dumbbell, ArrowLeft, Shield, Users, Briefcase } from 'lucide-react';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack?: () => void;
}

export function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock users for demo
  const mockUsers = [
    { id: '1', name: 'Admin User', email: 'admin@gym.com', role: 'admin' as const, password: 'admin123' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user' as const, password: 'user123' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user' as const, password: 'user123' },
    { id: '4', name: 'Gym Staff', email: 'worker@gym.com', role: 'worker' as const, password: 'worker123' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      alert('Invalid credentials. Try admin@gym.com/admin123 or john@example.com/user123');
    }
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    const user = mockUsers.find(u => u.email === userEmail);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        {onBack && (
          <div className="mb-4 md:mb-8">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2" size="sm">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left side - Branding */}
          <div className="space-y-6 md:space-y-8 hidden lg:block">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Katcha Chill</h1>
                  <p className="text-sm md:text-base text-gray-600">Fitness & Wellness Management</p>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-600">
                Access your personalized dashboard and manage your fitness journey
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose Your Portal:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Admin Portal</p>
                    <p className="text-sm text-blue-700">Manage gym operations and analytics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Staff Portal</p>
                    <p className="text-sm text-green-700">Process memberships and attendance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Member Portal</p>
                    <p className="text-sm text-purple-700">Track workouts and membership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="w-full shadow-xl mx-auto max-w-md lg:max-w-none">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Badge className="bg-blue-100 text-blue-800">Secure Login</Badge>
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Sign In to Portal
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-11 border-blue-200 hover:bg-blue-50"
                  onClick={() => quickLogin('admin@gym.com', 'admin123')}
                >
                  <Shield className="mr-2 h-4 w-4 text-blue-600" />
                  Admin Portal - admin@gym.com
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-11 border-green-200 hover:bg-green-50"
                  onClick={() => quickLogin('worker@gym.com', 'worker123')}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-green-600" />
                  Staff Portal - worker@gym.com
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-11 border-purple-200 hover:bg-purple-50"
                  onClick={() => quickLogin('john@example.com', 'user123')}
                >
                  <Users className="mr-2 h-4 w-4 text-purple-600" />
                  Member Portal - john@example.com
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Password for all demo accounts: admin123, worker123, user123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}