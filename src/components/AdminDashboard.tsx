import { useState } from 'react';
import { 
  Users, 
  Dumbbell, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Settings,
  UserPlus,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { MemberManagement } from './admin/MemberManagement';
import { EquipmentManagement } from './admin/EquipmentManagement';
import { Analytics } from './admin/Analytics';
import type { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'members' | 'equipment' | 'analytics' | 'settings';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Total Members', value: '1,284', icon: Users, color: 'text-blue-600' },
    { label: 'Active Today', value: '342', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Monthly Revenue', value: '₱1,536,800', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Equipment Items', value: '89', icon: Dumbbell, color: 'text-orange-600' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Smith', action: 'Renewed membership', time: '2 hours ago' },
    { id: 2, user: 'Sarah Wilson', action: 'Joined Premium Plan', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Booked PT session', time: '6 hours ago' },
    { id: 4, user: 'Lisa Brown', action: 'Checked in', time: '8 hours ago' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Dumbbell },
    { id: 'analytics', label: 'Analytics', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'members':
        return <MemberManagement />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage gym settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest member activities and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{activity.user}</p>
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 bg-white shadow-sm border-r flex-col">
        <div className="p-4 lg:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Katcha Chill</h2>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
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
                <p className="text-xs text-muted-foreground">Admin</p>
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
        <header className="bg-white border-b px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle>Admin Menu</SheetTitle>
                      <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Dumbbell className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">Katcha Chill</p>
                        <p className="text-sm text-blue-700">Admin Panel</p>
                      </div>
                    </div>
                  </SheetHeader>

                  <nav className="mt-6 space-y-2">
                    {sidebarItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "ghost"}
                        className="w-full justify-start h-12"
                        onClick={() => {
                          setActiveTab(item.id as ActiveTab);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Button>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                      </div>
                    </div>
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

              <div>
                <h1 className="text-lg md:text-xl font-semibold capitalize">
                  {activeTab === 'overview' ? 'Dashboard Overview' : activeTab}
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Welcome back, {user.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="sm" className="hidden sm:inline-flex">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
              <Button size="sm" className="sm:hidden">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}