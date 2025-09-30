import { useState } from 'react';
import { 
  Users, 
  Dumbbell, 
  LogOut,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { WorkerMemberManagement } from './worker/WorkerMemberManagement';
import { AttendanceLogging } from './worker/AttendanceLogging';
import type { User } from '../App';

interface WorkerDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'members' | 'attendance';

export function WorkerDashboard({ user, onLogout }: WorkerDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('members');

  const sidebarItems = [
    { id: 'members', label: 'Members', icon: Users },
    { id: 'attendance', label: 'Attendance & Payments', icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <AttendanceLogging currentUser={user} />;
      default:
        return <WorkerMemberManagement currentUser={user} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'attendance':
        return 'Attendance & Payments';
      default:
        return 'Member Management';
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
              <p className="text-sm text-muted-foreground">Worker Panel</p>
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
                <p className="text-xs text-muted-foreground">Worker</p>
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
              <h1 className="text-xl font-semibold">{getTabTitle()}</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}