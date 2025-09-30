import { useEffect, useState } from 'react';
import { GymStaffDashboard } from './GymStaffDashboard';
import { MobileGymStaffDashboard } from './MobileGymStaffDashboard';
import type { User as UserType } from '../App';

interface ResponsiveGymStaffDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export function ResponsiveGymStaffDashboard({ user, onLogout }: ResponsiveGymStaffDashboardProps) {
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
    <MobileGymStaffDashboard user={user} onLogout={onLogout} />
  ) : (
    <GymStaffDashboard user={user} onLogout={onLogout} />
  );
}