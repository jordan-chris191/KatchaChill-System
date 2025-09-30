import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Calendar, Clock, Users, MapPin, BookOpen } from 'lucide-react';

interface GymClass {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: number; // in minutes
  capacity: number;
  enrolled: number;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Cardio' | 'Strength' | 'Yoga' | 'Dance' | 'HIIT';
  description: string;
  isBooked: boolean;
}

export function ClassSchedule() {
  const [selectedDate, setSelectedDate] = useState('2024-09-24');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [classes] = useState<GymClass[]>([
    {
      id: '1',
      name: 'Morning Yoga Flow',
      instructor: 'Sarah Johnson',
      date: '2024-09-24',
      time: '07:00',
      duration: 60,
      capacity: 20,
      enrolled: 15,
      location: 'Studio A',
      difficulty: 'Beginner',
      category: 'Yoga',
      description: 'Start your day with a gentle yoga flow focusing on flexibility and mindfulness.',
      isBooked: true
    },
    {
      id: '2',
      name: 'HIIT Bootcamp',
      instructor: 'Mike Rodriguez',
      date: '2024-09-24',
      time: '09:00',
      duration: 45,
      capacity: 15,
      enrolled: 12,
      location: 'Functional Area',
      difficulty: 'Advanced',
      category: 'HIIT',
      description: 'High-intensity interval training to boost your metabolism and build strength.',
      isBooked: false
    },
    {
      id: '3',
      name: 'Strength & Conditioning',
      instructor: 'Lisa Chen',
      date: '2024-09-24',
      time: '10:30',
      duration: 50,
      capacity: 12,
      enrolled: 8,
      location: 'Weight Room',
      difficulty: 'Intermediate',
      category: 'Strength',
      description: 'Build functional strength with compound movements and progressive overload.',
      isBooked: false
    },
    {
      id: '4',
      name: 'Lunch Break Cardio',
      instructor: 'Tom Wilson',
      date: '2024-09-24',
      time: '12:00',
      duration: 30,
      capacity: 25,
      enrolled: 18,
      location: 'Cardio Zone',
      difficulty: 'Intermediate',
      category: 'Cardio',
      description: 'Quick and effective cardio session perfect for your lunch break.',
      isBooked: false
    },
    {
      id: '5',
      name: 'Zumba Dance Fitness',
      instructor: 'Maria Garcia',
      date: '2024-09-24',
      time: '18:00',
      duration: 45,
      capacity: 30,
      enrolled: 22,
      location: 'Studio B',
      difficulty: 'Beginner',
      category: 'Dance',
      description: 'Fun and energetic dance workout that feels more like a party than exercise.',
      isBooked: true
    },
    {
      id: '6',
      name: 'Evening Yoga & Meditation',
      instructor: 'David Park',
      date: '2024-09-24',
      time: '19:30',
      duration: 75,
      capacity: 20,
      enrolled: 14,
      location: 'Studio A',
      difficulty: 'Beginner',
      category: 'Yoga',
      description: 'Wind down with restorative yoga poses and guided meditation.',
      isBooked: false
    }
  ]);

  const [bookedClasses] = useState([
    {
      id: '1',
      name: 'Morning Yoga Flow',
      date: '2024-09-24',
      time: '07:00',
      instructor: 'Sarah Johnson'
    },
    {
      id: '5',
      name: 'Zumba Dance Fitness',
      date: '2024-09-24',
      time: '18:00',
      instructor: 'Maria Garcia'
    }
  ]);

  const filteredClasses = classes.filter(cls => {
    const matchesDate = cls.date === selectedDate;
    const matchesCategory = selectedCategory === 'all' || cls.category === selectedCategory;
    return matchesDate && matchesCategory;
  });

  const getDifficultyColor = (difficulty: GymClass['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: GymClass['category']) => {
    switch (category) {
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Yoga': return 'bg-purple-100 text-purple-800';
      case 'Dance': return 'bg-pink-100 text-pink-800';
      case 'HIIT': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookClass = (classId: string) => {
    // Mock booking functionality
    console.log('Booking class:', classId);
  };

  const handleCancelBooking = (classId: string) => {
    // Mock cancel booking functionality
    console.log('Canceling booking for class:', classId);
  };

  const categories = ['all', 'Cardio', 'Strength', 'Yoga', 'Dance', 'HIIT'];

  return (
    <div className="space-y-6">
      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>My Bookings</span>
          </CardTitle>
          <CardDescription>Your upcoming class reservations</CardDescription>
        </CardHeader>
        <CardContent>
          {bookedClasses.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No upcoming bookings</p>
          ) : (
            <div className="space-y-3">
              {bookedClasses.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">{booking.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} at {booking.time} • {booking.instructor}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                    Cancel
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Class Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Browse and book fitness classes</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              {/* Date Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <select 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  <option value="2024-09-24">Today (Sep 24)</option>
                  <option value="2024-09-25">Tomorrow (Sep 25)</option>
                  <option value="2024-09-26">Thu (Sep 26)</option>
                  <option value="2024-09-27">Fri (Sep 27)</option>
                </select>
              </div>
              
              {/* Category Filter */}
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClasses.map((gymClass) => (
              <Card key={gymClass.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{gymClass.name}</h3>
                        <Badge className={getCategoryColor(gymClass.category)}>
                          {gymClass.category}
                        </Badge>
                        <Badge className={getDifficultyColor(gymClass.difficulty)}>
                          {gymClass.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{gymClass.time} ({gymClass.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{gymClass.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{gymClass.enrolled}/{gymClass.capacity} spots</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {gymClass.description}
                      </p>

                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {gymClass.instructor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{gymClass.instructor}</p>
                          <p className="text-xs text-muted-foreground">Instructor</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      {gymClass.isBooked ? (
                        <div className="text-center">
                          <Badge className="mb-2 bg-green-100 text-green-800">Booked</Badge>
                          <br />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelBooking(gymClass.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : gymClass.enrolled >= gymClass.capacity ? (
                        <Badge variant="destructive">Full</Badge>
                      ) : (
                        <Button onClick={() => handleBookClass(gymClass.id)}>
                          Book Class
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No classes found for the selected date and category.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}