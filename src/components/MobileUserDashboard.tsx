import { useState } from 'react';
import { 
  User, 
  Activity, 
  Calendar, 
  CreditCard, 
  Target,
  LogOut,
  Dumbbell,
  Menu,
  X,
  QrCode,
  Users,
  TrendingUp,
  Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { WorkoutTracker } from './user/WorkoutTracker';
import { ClassSchedule } from './user/ClassSchedule';
import { PaymentHistory } from './user/PaymentHistory';
import { GymCapacity } from './user/GymCapacity';
import { SubscriptionStatus } from './user/SubscriptionStatus';
import type { User as UserType } from '../App';

interface MobileUserDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'workouts' | 'schedule' | 'payments' | 'profile';

export function MobileUserDashboard({ user, onLogout }: MobileUserDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const membershipInfo = {
    type: 'Monthly' as 'Daily' | 'Monthly',
    status: 'Active',
    expiryDate: '2024-12-31',
    daysLeft: 67
  };

  const todayStats = {
    workoutsCompleted: 1,
    caloriesBurned: 420,
    timeSpent: 75,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const menuItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'schedule', label: 'Classes', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User }
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
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <Activity className="h-6 w-6 text-blue-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.workoutsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Today's Workouts</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <Target className="h-6 w-6 text-red-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.caloriesBurned}</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <Calendar className="h-6 w-6 text-green-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.timeSpent}m</p>
                  <p className="text-xs text-muted-foreground">Time Spent</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center space-y-1">
                  <Dumbbell className="h-6 w-6 text-purple-600 mx-auto" />
                  <p className="text-2xl font-bold">{todayStats.weeklyProgress}/{todayStats.weeklyGoal}</p>
                  <p className="text-xs text-muted-foreground">Weekly Goal</p>
                </div>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Weekly Progress</h3>
                  <Badge variant="outline">{todayStats.weeklyProgress}/{todayStats.weeklyGoal}</Badge>
                </div>
                <Progress 
                  value={(todayStats.weeklyProgress / todayStats.weeklyGoal) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-muted-foreground">
                  {todayStats.weeklyGoal - todayStats.weeklyProgress} workouts remaining this week
                </p>
              </div>
            </Card>

            {/* Gym Capacity - Mobile Optimized */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Gym Status</span>
                  </h3>
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    <Activity className="w-3 h-3 mr-1" />
                    67% Full
                  </Badge>
                </div>
                <Progress value={67} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Moderately busy - Most equipment available
                </p>
              </div>
            </Card>

            {/* Membership Status - Simplified */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Membership</h3>
                  <Badge className="bg-blue-600 text-white">Monthly</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expires</span>
                    <span className="font-medium">Dec 31, 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Days Left</span>
                    <span className="font-medium text-green-600">67 days</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-16 flex-col space-y-1 bg-gradient-to-r from-blue-600 to-green-600">
                  <QrCode className="h-5 w-5" />
                  <span className="text-xs">Show QR</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <Activity className="h-5 w-5" />
                  <span className="text-xs">Start Workout</span>
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'workouts':
        return <WorkoutTracker />;
      case 'schedule':
        return <ClassSchedule />;
      case 'payments':
        return <PaymentHistory />;
      case 'profile':
        return (
          <div className="space-y-4">
            <SubscriptionStatus membershipType={membershipInfo.type} />
            <Card className="p-4">
              <h3 className="font-medium mb-3">Account Settings</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
        );
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
              <h1 className="font-semibold text-gray-900">Katcha Chill</h1>
              <p className="text-xs text-gray-600">{menuItems.find(item => item.id === activeTab)?.label}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
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
                    <SheetTitle>Menu</SheetTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue-900">{user.name}</p>
                      <p className="text-sm text-blue-700">{membershipInfo.type} Member</p>
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
                activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
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