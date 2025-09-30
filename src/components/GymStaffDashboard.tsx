import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  DollarSign, 
  QrCode,
  UserPlus,
  Settings,
  Dumbbell,
  LogOut
} from 'lucide-react';
import { QRScanner } from './gym/QRScanner';
import { MemberRegistration } from './gym/MemberRegistration';
import { SubscribedMembers } from './gym/SubscribedMembers';
import { AttendanceLog } from './gym/AttendanceLog';
import { ConfirmationPage } from './gym/ConfirmationPage';
import type { User } from '../App';

interface GymStaffDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActivePage = 'dashboard' | 'scan' | 'register' | 'members' | 'attendance' | 'settings' | 'confirmation';

export interface ConfirmationData {
  type: 'payment' | 'registration' | 'extension';
  memberName: string;
  amount?: number;
  validUntil?: string;
  membershipType?: string;
}

export function GymStaffDashboard({ user, onLogout }: GymStaffDashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

  // Mock dashboard data
  const dashboardStats = {
    activeMembers: 284,
    dailyCheckIns: 42,
    expiringMemberships: 8,
    totalPayments: 3450
  };

  const recentActivity = [
    { id: 1, member: 'John Doe', action: 'Check-in', time: '10:30 AM' },
    { id: 2, member: 'Jane Smith', action: 'Payment ₱40', time: '10:15 AM' },
    { id: 3, member: 'Mike Johnson', action: 'Extended membership', time: '9:45 AM' },
    { id: 4, member: 'Sarah Wilson', action: 'Check-in', time: '9:30 AM' },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'scan', label: 'Scan QR', icon: QrCode },
    { id: 'register', label: 'Register Member', icon: UserPlus },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'attendance', label: 'Attendance Log', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleConfirmation = (data: ConfirmationData) => {
    setConfirmationData(data);
    setActivePage('confirmation');
  };

  const handleBackToDashboard = () => {
    setActivePage('dashboard');
    setConfirmationData(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'scan':
        return <QRScanner onConfirmation={handleConfirmation} />;
      case 'register':
        return <MemberRegistration onConfirmation={handleConfirmation} />;
      case 'members':
        return <SubscribedMembers onConfirmation={handleConfirmation} />;
      case 'attendance':
        return <AttendanceLog />;
      case 'confirmation':
        return <ConfirmationPage data={confirmationData!} onBack={handleBackToDashboard} />;
      case 'settings':
        return (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage system preferences and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Active Members</p>
                      <p className="text-3xl font-bold text-blue-900">{dashboardStats.activeMembers}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Daily Check-ins</p>
                      <p className="text-3xl font-bold text-green-900">{dashboardStats.dailyCheckIns}</p>
                    </div>
                    <Calendar className="h-10 w-10 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700">Expiring Memberships</p>
                      <p className="text-3xl font-bold text-orange-900">{dashboardStats.expiringMemberships}</p>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Total Payments</p>
                      <p className="text-3xl font-bold text-purple-900">₱{dashboardStats.totalPayments}</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Most common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    size="lg" 
                    className="h-24 flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setActivePage('scan')}
                  >
                    <QrCode className="h-8 w-8" />
                    <span>Scan QR Code</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-24 flex flex-col space-y-2 border-green-200 hover:bg-green-50"
                    onClick={() => setActivePage('register')}
                  >
                    <UserPlus className="h-8 w-8 text-green-600" />
                    <span>Register Member</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-24 flex flex-col space-y-2 border-purple-200 hover:bg-purple-50"
                    onClick={() => setActivePage('members')}
                  >
                    <Users className="h-8 w-8 text-purple-600" />
                    <span>Manage Members</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest member activities and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{activity.member}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{activity.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FitPro Gym</h1>
                <p className="text-sm text-gray-500">Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as ActivePage)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activePage === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Gym Staff</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {renderPage()}
      </main>
    </div>
  );
}