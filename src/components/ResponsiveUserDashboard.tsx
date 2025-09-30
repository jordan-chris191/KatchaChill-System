import { useEffect, useState } from 'react';
import { UserDashboard } from './UserDashboard';
import { MobileUserDashboard } from './MobileUserDashboard';
import type { User as UserType } from '../App';

interface ResponsiveUserDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export function ResponsiveUserDashboard({ user, onLogout }: ResponsiveUserDashboardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? (
    <MobileUserDashboard user={user} onLogout={onLogout} />
  ) : (
    <UserDashboard user={user} onLogout={onLogout} />
  );
}