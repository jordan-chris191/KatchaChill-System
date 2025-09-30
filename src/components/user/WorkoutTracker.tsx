import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Play, Pause, Square, Plus, Clock, Target, Zap, TrendingUp } from 'lucide-react';

interface Workout {
  id: string;
  name: string;
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'HIIT';
  duration: number; // in minutes
  calories: number;
  exercises: Exercise[];
  date: string;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // for cardio exercises
  completed: boolean;
}

export function WorkoutTracker() {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [workouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      category: 'Strength',
      duration: 45,
      calories: 320,
      date: '2024-09-22',
      completed: true,
      exercises: [
        { id: '1', name: 'Bench Press', sets: 3, reps: 10, weight: 135, completed: true },
        { id: '2', name: 'Pull-ups', sets: 3, reps: 8, completed: true },
        { id: '3', name: 'Shoulder Press', sets: 3, reps: 12, weight: 60, completed: true },
        { id: '4', name: 'Bicep Curls', sets: 3, reps: 15, weight: 25, completed: true },
      ]
    },
    {
      id: '2',
      name: 'Cardio Blast',
      category: 'Cardio',
      duration: 30,
      calories: 280,
      date: '2024-09-21',
      completed: true,
      exercises: [
        { id: '5', name: 'Treadmill Run', duration: 20, completed: true },
        { id: '6', name: 'Cycling', duration: 10, completed: true },
      ]
    },
    {
      id: '3',
      name: 'Leg Day',
      category: 'Strength',
      duration: 50,
      calories: 380,
      date: '2024-09-20',
      completed: false,
      exercises: [
        { id: '7', name: 'Squats', sets: 4, reps: 12, weight: 185, completed: false },
        { id: '8', name: 'Deadlifts', sets: 3, reps: 8, weight: 225, completed: false },
        { id: '9', name: 'Leg Press', sets: 3, reps: 15, weight: 300, completed: false },
        { id: '10', name: 'Calf Raises', sets: 4, reps: 20, weight: 45, completed: false },
      ]
    }
  ]);

  const todayWorkouts = workouts.filter(w => w.date === '2024-09-24');
  const recentWorkouts = workouts.slice(0, 5);

  const weeklyStats = {
    workoutsCompleted: 3,
    totalCalories: 980,
    totalTime: 125,
    goal: 5
  };

  const getCategoryColor = (category: Workout['category']) => {
    switch (category) {
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Flexibility': return 'bg-green-100 text-green-800';
      case 'HIIT': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleStartWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
    setWorkoutTimer(0);
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleStopWorkout = () => {
    setActiveWorkout(null);
    setWorkoutTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Active Workout Banner */}
      {activeWorkout && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{activeWorkout.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatTime(workoutTimer)} • {activeWorkout.exercises.length} exercises
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handlePauseTimer}>
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={handleStopWorkout}>
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{weeklyStats.workoutsCompleted}/{weeklyStats.goal}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calories</p>
                <p className="text-2xl font-bold">{weeklyStats.totalCalories}</p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">{formatTime(weeklyStats.totalTime)}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">{Math.round((weeklyStats.workoutsCompleted / weeklyStats.goal) * 100)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Workouts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Workouts</CardTitle>
                <CardDescription>Scheduled workouts for today</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Workout</DialogTitle>
                    <DialogDescription>
                      Design a custom workout routine
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="workout-name" className="text-right">Name</Label>
                      <Input id="workout-name" className="col-span-3" placeholder="Workout name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                      <Input id="category" className="col-span-3" placeholder="Strength, Cardio, etc." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="exercises" className="text-right">Exercises</Label>
                      <Textarea id="exercises" className="col-span-3" placeholder="List exercises..." rows={4} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Create Workout</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {todayWorkouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No workouts scheduled for today</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Plan a Workout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {todayWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(workout.duration)} • {workout.calories} cal
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(workout.category)}>
                        {workout.category}
                      </Badge>
                      <Button size="sm" onClick={() => handleStartWorkout(workout)}>
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
            <CardDescription>Your workout history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${workout.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {workout.date} • {formatTime(workout.duration)} • {workout.calories} cal
                      </p>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(workout.category)}>
                    {workout.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Track your workout consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Weekly Goal Progress</span>
              <span>{weeklyStats.workoutsCompleted}/{weeklyStats.goal} workouts</span>
            </div>
            <Progress value={(weeklyStats.workoutsCompleted / weeklyStats.goal) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {weeklyStats.goal - weeklyStats.workoutsCompleted} workouts remaining this week
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}