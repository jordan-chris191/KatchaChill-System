import { useState } from 'react';
import { 
  User, 
  QrCode, 
  UserPlus, 
  Clock, 
  CreditCard,
  LogOut,
  Dumbbell,
  Menu,
  X,
  CheckCircle2,
  Users,
  FileText,
  Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { QRScanner } from './gym/QRScanner';
import { MemberRegistration } from './gym/MemberRegistration';
import { AttendanceLog } from './gym/AttendanceLog';
import { SubscribedMembers } from './gym/SubscribedMembers';
import type { User as UserType } from '../App';

interface MobileGymStaffDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'scanner' | 'register' | 'members' | 'attendance' | 'profile';

export function MobileGymStaffDashboard({ user, onLogout }: MobileGymStaffDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const todayStats = {
    checkins: 127,
    newMembers: 8,
    payments: 15400,
    activeMembers: 89
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Clock }
  ];

  const handleMenuClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.checkins}</p>
                  <p className="text-xs text-muted-foreground">Check-ins Today</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <UserPlus className="h-6 w-6 text-blue-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.newMembers}</p>
                  <p className="text-xs text-muted-foreground">New Members</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <CreditCard className="h-6 w-6 text-purple-600 mx-auto" />
                  <p className="text-2xl font-bold">₱{todayStats.payments.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Payments</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <Users className="h-6 w-6 text-orange-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.activeMembers}</p>
                  <p className="text-xs text-muted-foreground">Active Now</p>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-600 to-green-600"
                  onClick={() => setActiveTab('scanner')}
                >
                  <QrCode className="h-6 w-6" />
                  <span className="text-xs">Scan QR</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveTab('register')}
                >
                  <UserPlus className="h-6 w-6" />
                  <span className="text-xs">New Member</span>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">John Doe checked in</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Monthly</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">New member registered</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Daily</Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-muted-foreground">8 minutes ago</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-600">₱1,200</Badge>
                </div>
              </div>
            </Card>

            {/* Shift Info */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Your Shift</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Started</span>
                  <span className="font-medium">8:00 AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">6h 42m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-green-600">On Duty</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3">
                <Clock className="mr-2 h-4 w-4" />
                Time Out
              </Button>
            </Card>
          </div>
        );

      case 'scanner':
        return <QRScanner />;
      case 'register':
        return <MemberRegistration />;
      case 'members':
        return <SubscribedMembers />;
      case 'attendance':
        return <AttendanceLog />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Staff Portal</h1>
              <p className="text-xs text-gray-600">{menuItems.find(item => item.id === activeTab)?.label}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Staff Menu</SheetTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-600 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-green-900">{user.name}</p>
                      <p className="text-sm text-green-700">Gym Staff</p>
                    </div>
                  </div>
                </SheetHeader>

                <nav className="mt-6 space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="w-full justify-start h-12"
                      onClick={() => handleMenuClick(item.id as ActiveTab)}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-200"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="p-4 pb-20">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-5 py-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex-col space-y-1 h-16 ${
                activeTab === item.id ? 'text-green-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(item.id as ActiveTab)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}