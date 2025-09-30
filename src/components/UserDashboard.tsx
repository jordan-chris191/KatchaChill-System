import { useState } from 'react';
import { 
  User, 
  Activity, 
  Calendar, 
  CreditCard, 
  Target,
  LogOut,
  Dumbbell
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { WorkoutTracker } from './user/WorkoutTracker';
import { ClassSchedule } from './user/ClassSchedule';
import { PaymentHistory } from './user/PaymentHistory';
import { GymCapacity } from './user/GymCapacity';
import { SubscriptionStatus } from './user/SubscriptionStatus';
import type { User as UserType } from '../App';

interface UserDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'workouts' | 'schedule' | 'payments' | 'profile';

export function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const membershipInfo = {
    type: 'Monthly' as 'Daily' | 'Monthly', // Change this to 'Daily' to test daily member view
    status: 'Active',
    expiryDate: '2024-12-31',
    daysLeft: 67
  };

  const todayStats = {
    workoutsCompleted: 1,
    caloriesBurned: 420,
    timeSpent: 75, // minutes
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'schedule', label: 'Classes', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'workouts':
        return <WorkoutTracker />;
      case 'schedule':
        return <ClassSchedule />;
      case 'payments':
        return <PaymentHistory />;
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Profile management coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Membership Status */}
            <SubscriptionStatus membershipType={membershipInfo.type} />

            {/* Today's Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Workouts Today</p>
                      <p className="text-2xl font-bold">{todayStats.workoutsCompleted}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Calories Burned</p>
                      <p className="text-2xl font-bold">{todayStats.caloriesBurned}</p>
                    </div>
                    <Target className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Time (minutes)</p>
                      <p className="text-2xl font-bold">{todayStats.timeSpent}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Goal</p>
                      <p className="text-2xl font-bold">{todayStats.weeklyProgress}/{todayStats.weeklyGoal}</p>
                    </div>
                    <Dumbbell className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress and Gym Capacity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>
                    {todayStats.weeklyProgress} of {todayStats.weeklyGoal} workouts completed this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={(todayStats.weeklyProgress / todayStats.weeklyGoal) * 100} 
                    className="w-full h-3"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {todayStats.weeklyGoal - todayStats.weeklyProgress} workouts remaining
                  </p>
                </CardContent>
              </Card>

              <GymCapacity />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col space-y-2">
                    <Activity className="h-6 w-6" />
                    <span>Start Workout</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Book Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <User className="h-6 w-6" />
                    <span>Update Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-full p-2">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">FitPro Gym</h2>
              <p className="text-sm text-muted-foreground">Member Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold capitalize">
                {activeTab === 'overview' ? 'Dashboard' : activeTab}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
            <Button>
              <Activity className="h-4 w-4 mr-2" />
              Start Workout
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}