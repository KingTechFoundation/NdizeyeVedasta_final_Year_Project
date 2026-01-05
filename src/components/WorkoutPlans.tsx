import { useState, useEffect } from 'react';
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
  Target,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { workoutApi, type WorkoutPlan, type WorkoutProgress, type WorkoutSession, type WeekScheduleItem } from '../services/api';
import { toast } from 'sonner';
import { useNavigation } from '../contexts/NavigationContext';
import WorkoutPlansSkeleton from './WorkoutPlansSkeleton';

export default function WorkoutPlans() {
  const { navigateTo } = useNavigation();
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan | null>(null);
  const [progress, setProgress] = useState<WorkoutProgress | null>(null);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutSession | null>(null);
  const [weekSchedule, setWeekSchedule] = useState<WeekScheduleItem[]>([]);
  const [recommendedPlans, setRecommendedPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  const fetchWorkoutData = async () => {
    setIsLoading(true);
    try {
      // Fetch all data in parallel
      const [currentPlanRes, todayWorkoutRes, weekScheduleRes, plansRes] = await Promise.all([
        workoutApi.getCurrentPlan(),
        workoutApi.getTodayWorkout(),
        workoutApi.getWeekSchedule(),
        workoutApi.getWorkoutPlans(),
      ]);

      if (currentPlanRes.success && currentPlanRes.data) {
        setCurrentPlan(currentPlanRes.data.plan);
        setProgress(currentPlanRes.data.progress);
      }

      if (todayWorkoutRes.success && todayWorkoutRes.data) {
        setTodayWorkout(todayWorkoutRes.data.workout);
      }

      if (weekScheduleRes.success && weekScheduleRes.data) {
        setWeekSchedule(weekScheduleRes.data.schedule);
        setCurrentWeek(weekScheduleRes.data.currentWeek);
      }

      if (plansRes.success && plansRes.data) {
        // Get all available plans to show in Explore tab
        // Show: 
        // 1. Public system plans (isPublic: true, no userId)
        // 2. User's own plans that aren't active (userId matches, isActive: false)
        const activePlanId = currentPlanRes.data?.plan?._id;
        const availablePlans = plansRes.data.plans.filter(plan => {
          // Show public system plans (no userId means it's a system/public plan)
          if (plan.isPublic && !plan.userId) return true;
          // Show user's own plans that aren't active (excluding the currently active one)
          if (plan.userId && !plan.isActive && plan._id !== activePlanId) return true;
          return false;
        });
        setRecommendedPlans(availablePlans);
      }
    } catch (error) {
      console.error('Failed to fetch workout data:', error);
      toast.error('Failed to load workout data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivatePlan = async (planId: string) => {
    try {
      const response = await workoutApi.activatePlan(planId);
      if (response.success) {
        toast.success('Workout plan activated successfully');
        fetchWorkoutData(); // Refresh data
      }
    } catch (error) {
      toast.error('Failed to activate workout plan');
    }
  };

  if (isLoading) {
    return <WorkoutPlansSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Workout Plans</h1>
        <p className="text-gray-600">Your personalized fitness journey</p>
      </div>

      {/* Current Plan Overview */}
      {currentPlan && progress ? (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
                <CardDescription>
                  Week {progress.currentWeek} of {progress.totalWeeks}
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
                  <span className="text-gray-900">{progress.progressPercentage}%</span>
                </div>
                <Progress value={progress.progressPercentage} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="text-xl text-gray-900">{currentPlan.duration} weeks</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <p className="text-xl text-gray-900">
                    {progress.workoutsCompleted}/{progress.totalWorkouts}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Consistency</span>
                  </div>
                  <p className="text-xl text-gray-900">{progress.consistency}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Dumbbell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl text-gray-900 mb-2">No Active Plan</h3>
            <p className="text-gray-600 mb-4">
              You don't have an active workout plan. Browse plans below to get started!
            </p>
            <Button
              onClick={() => setActiveTab('explore')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Plans
            </Button>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>

        {/* Today's Workout */}
        <TabsContent value="today" className="space-y-6">
          {todayWorkout ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{todayWorkout.workoutName}</CardTitle>
                    <CardDescription>
                      {new Date(todayWorkout.date || new Date()).toLocaleDateString('en-US', { weekday: 'long' })}'s workout session
                    </CardDescription>
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
                      <p className="text-gray-900">{todayWorkout.duration} min</p>
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
                      <p className="text-gray-900">
                        {todayWorkout.exercises?.filter(ex => ex.completed).length || 0}/
                        {todayWorkout.exercises?.length || 0} done
                      </p>
                    </div>
                  </div>
                </div>

                {todayWorkout.exercises && todayWorkout.exercises.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-600">Exercises</p>
                    {todayWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 border rounded-lg ${exercise.completed ? 'bg-gray-50' : 'bg-white'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${exercise.completed
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
                              {exercise.sets || exercise.reps || exercise.duration || 'No details'}
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
                )}

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={async () => {
                    if (!todayWorkout._id) return;
                    try {
                      if (todayWorkout.status === 'scheduled') {
                        await workoutApi.startWorkout(todayWorkout._id);
                        toast.success('Workout started!');
                        fetchWorkoutData(); // Refresh data
                      }
                      // Could navigate to a dedicated workout player page
                    } catch (error) {
                      toast.error('Failed to start workout');
                    }
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {todayWorkout.status === 'completed' ? 'Review Workout' :
                    todayWorkout.status === 'in-progress' ? 'Continue Workout' : 'Start Workout'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Dumbbell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl text-gray-900 mb-2">No Workout Scheduled</h3>
                <p className="text-gray-600 mb-4">
                  You don't have a workout scheduled for today. Activate a plan to get started!
                </p>
                <Button
                  onClick={() => {
                    const exploreTab = document.querySelector('[value="explore"]');
                    if (exploreTab) (exploreTab as HTMLElement).click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Browse Plans
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Week Schedule */}
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Week {currentWeek} Schedule</CardTitle>
              <CardDescription>Your workout plan for this week</CardDescription>
            </CardHeader>
            <CardContent>
              {weekSchedule.length > 0 ? (
                <div className="space-y-3">
                  {weekSchedule.map((day, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 border rounded-lg ${day.active
                        ? 'border-blue-500 bg-blue-50'
                        : day.completed
                          ? 'bg-gray-50'
                          : 'bg-white'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${day.completed
                          ? 'bg-green-100'
                          : day.active
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                          }`}>
                          {day.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <Dumbbell className={`w-6 h-6 ${day.active ? 'text-blue-600' : 'text-gray-400'
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
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No schedule available. Activate a workout plan to see your weekly schedule.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Explore Plans */}
        <TabsContent value="explore" className="space-y-6">
          {recommendedPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedPlans.map((plan) => (
                <Card key={plan._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <ImageWithFallback
                      src={plan.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white text-gray-900">{plan.difficulty}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.goal.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {plan.duration} weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        {plan.totalWorkouts} workouts
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleActivatePlan(plan._id)}
                    >
                      {currentPlan?._id === plan._id ? 'Active' : 'Activate Plan'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12 text-gray-500">
                <p>No workout plans available. Plans will be added soon!</p>
              </CardContent>
            </Card>
          )}

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
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigateTo('coach')}
                >
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
