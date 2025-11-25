import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  TrendingUp,
  Play,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Target
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function WorkoutPlans() {
  const currentPlan = {
    name: 'Weight Loss & Toning',
    duration: '12 weeks',
    progress: 65,
    currentWeek: 8,
    totalWeeks: 12,
    workoutsCompleted: 35,
    totalWorkouts: 48,
  };

  const todayWorkout = {
    name: 'Full Body Strength Training',
    duration: '45 min',
    calories: 380,
    difficulty: 'Intermediate',
    exercises: [
      { name: 'Warm-up', duration: '5 min', completed: true },
      { name: 'Squats', sets: '4x12', completed: true },
      { name: 'Push-ups', sets: '3x15', completed: false },
      { name: 'Lunges', sets: '3x10', completed: false },
      { name: 'Plank', duration: '3x60s', completed: false },
      { name: 'Cool down', duration: '5 min', completed: false },
    ],
  };

  const weekSchedule = [
    { day: 'Monday', workout: 'Upper Body Strength', completed: true, duration: '45 min' },
    { day: 'Tuesday', workout: 'Cardio HIIT', completed: true, duration: '30 min' },
    { day: 'Wednesday', workout: 'Rest Day', completed: true, duration: '-' },
    { day: 'Thursday', workout: 'Full Body Strength', completed: false, duration: '45 min', active: true },
    { day: 'Friday', workout: 'Core & Flexibility', completed: false, duration: '30 min' },
    { day: 'Saturday', workout: 'Cardio Endurance', completed: false, duration: '40 min' },
    { day: 'Sunday', workout: 'Active Recovery', completed: false, duration: '20 min' },
  ];

  const recommendedPlans = [
    {
      id: 1,
      name: 'Beginner Full Body',
      duration: '8 weeks',
      workouts: 24,
      level: 'Beginner',
      goal: 'Overall Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    },
    {
      id: 2,
      name: 'Muscle Building Pro',
      duration: '12 weeks',
      workouts: 48,
      level: 'Advanced',
      goal: 'Muscle Gain',
      image: 'https://images.unsplash.com/photo-1584827387179-355517d8a5fb?w=400&q=80',
    },
    {
      id: 3,
      name: 'Cardio Blast',
      duration: '6 weeks',
      workouts: 30,
      level: 'Intermediate',
      goal: 'Fat Loss',
      image: 'https://images.unsplash.com/photo-1729280860113-82372b7afad6?w=400&q=80',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Workout Plans</h1>
        <p className="text-gray-600">Your personalized fitness journey</p>
      </div>

      {/* Current Plan Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
              <CardDescription>
                Week {currentPlan.currentWeek} of {currentPlan.totalWeeks}
              </CardDescription>
            </div>
            <Badge className="bg-blue-600">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-gray-900">{currentPlan.progress}%</span>
              </div>
              <Progress value={currentPlan.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-xl text-gray-900">{currentPlan.duration}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Completed</span>
                </div>
                <p className="text-xl text-gray-900">
                  {currentPlan.workoutsCompleted}/{currentPlan.totalWorkouts}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Consistency</span>
                </div>
                <p className="text-xl text-gray-900">85%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>

        {/* Today's Workout */}
        <TabsContent value="today" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{todayWorkout.name}</CardTitle>
                  <CardDescription>Thursday's workout session</CardDescription>
                </div>
                <Badge variant="outline">{todayWorkout.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-gray-900">{todayWorkout.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="text-gray-900">{todayWorkout.calories} kcal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-gray-900">2/6 done</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600">Exercises</p>
                {todayWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      exercise.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        exercise.completed 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        {exercise.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className={exercise.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                          {exercise.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {exercise.sets || exercise.duration}
                        </p>
                      </div>
                    </div>
                    {!exercise.completed && (
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Continue Workout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Week Schedule */}
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Week 8 Schedule</CardTitle>
              <CardDescription>Your workout plan for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weekSchedule.map((day, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      day.active 
                        ? 'border-blue-500 bg-blue-50' 
                        : day.completed 
                        ? 'bg-gray-50' 
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        day.completed 
                          ? 'bg-green-100' 
                          : day.active 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}>
                        {day.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <Dumbbell className={`w-6 h-6 ${
                            day.active ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900">{day.day}</p>
                        <p className="text-sm text-gray-600">{day.workout}</p>
                        {day.duration !== '-' && (
                          <p className="text-sm text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {day.duration}
                          </p>
                        )}
                      </div>
                    </div>
                    {!day.completed && day.duration !== '-' && (
                      <Button size="sm" variant={day.active ? 'default' : 'outline'}>
                        {day.active ? 'Start' : 'View'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Explore Plans */}
        <TabsContent value="explore" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-900">{plan.level}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.goal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {plan.workouts} workouts
                    </span>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Need a Custom Plan?</h3>
                <p className="text-gray-600 mb-4">
                  Let our AI create a personalized workout plan based on your goals and preferences
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate Custom Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
