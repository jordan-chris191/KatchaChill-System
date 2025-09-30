import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Users, TrendingUp, Clock, Activity } from 'lucide-react';

interface GymCapacityProps {
  className?: string;
  isMobile?: boolean;
}

export function GymCapacity({ className, isMobile = false }: GymCapacityProps) {
  const [currentCapacity, setCurrentCapacity] = useState(67);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time capacity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
      setCurrentCapacity(prev => {
        const newCapacity = Math.max(15, Math.min(95, prev + variation));
        return newCapacity;
      });
    }, 8000); // Update every 8 seconds

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const getCapacityStatus = (capacity: number) => {
    if (capacity >= 80) return { status: 'Very Busy', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' };
    if (capacity >= 60) return { status: 'Busy', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' };
    if (capacity >= 30) return { status: 'Moderate', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' };
    return { status: 'Light', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' };
  };

  const capacityInfo = getCapacityStatus(currentCapacity);

  const peakHours = [
    { time: '6:00 AM - 8:00 AM', level: 85, period: 'Morning Rush' },
    { time: '12:00 PM - 2:00 PM', level: 70, period: 'Lunch Break' },
    { time: '5:00 PM - 8:00 PM', level: 95, period: 'Evening Peak' }
  ];

  const currentHour = new Date().getHours();
  const getCurrentPeriod = () => {
    if (currentHour >= 6 && currentHour < 8) return 'Morning Rush';
    if (currentHour >= 12 && currentHour < 14) return 'Lunch Break';
    if (currentHour >= 17 && currentHour < 20) return 'Evening Peak';
    return 'Regular Hours';
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Gym Capacity</span>
          </CardTitle>
          <CardDescription>Checking current gym occupancy...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Gym Capacity</span>
            </CardTitle>
            <CardDescription>Real-time occupancy status</CardDescription>
          </div>
          <Badge 
            className={`${capacityInfo.bgColor} ${capacityInfo.textColor} border-0`}
          >
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Capacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Occupancy</span>
            <span className="text-2xl font-bold">{currentCapacity}%</span>
          </div>
          
          <Progress 
            value={currentCapacity} 
            className="h-3"
          />
          
          <div className="flex items-center justify-between">
            <Badge className={`${capacityInfo.bgColor} ${capacityInfo.textColor} border-0`}>
              {capacityInfo.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Max Capacity: 150 people
            </span>
          </div>
        </div>

        {/* Current Period */}
        <div className={`p-4 rounded-lg ${capacityInfo.bgColor}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`h-4 w-4 ${capacityInfo.textColor}`} />
            <span className={`text-sm font-medium ${capacityInfo.textColor}`}>
              {getCurrentPeriod()}
            </span>
          </div>
          <p className={`text-sm ${capacityInfo.textColor}`}>
            {currentCapacity >= 80 
              ? "Gym is very busy right now. Consider visiting during off-peak hours."
              : currentCapacity >= 60
              ? "Gym is moderately busy. Most equipment is available."
              : "Great time to visit! Gym is not crowded."
            }
          </p>
        </div>

        {/* Peak Hours Forecast */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Today's Peak Hours</span>
          </div>
          
          <div className="space-y-2">
            {peakHours.map((peak, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div>
                  <p className="text-sm font-medium">{peak.period}</p>
                  <p className="text-xs text-muted-foreground">{peak.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{peak.level}%</p>
                  <p className="text-xs text-muted-foreground">Expected</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Best Times to Visit</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-green-50 rounded text-center">
              <p className="text-xs font-medium text-green-700">9:00 AM - 11:00 AM</p>
              <p className="text-xs text-green-600">Light crowd</p>
            </div>
            <div className="p-2 bg-green-50 rounded text-center">
              <p className="text-xs font-medium text-green-700">2:00 PM - 4:00 PM</p>
              <p className="text-xs text-green-600">Light crowd</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}