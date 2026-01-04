import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  Activity,
  Flame,
  Droplets,
  Moon,
  TrendingUp,
  Apple,
  Dumbbell,
  Heart,
  Target,
  Clock,
  Calendar,
  Award,
  ArrowDown,
  Loader2,
} from 'lucide-react';
import { dashboardApi, workoutApi, type DashboardData, type WorkoutSession } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Refresh dashboard when component becomes visible (user navigates back to dashboard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDashboardData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', fetchDashboardData);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', fetchDashboardData);
    };
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [dashboardResponse, workoutResponse] = await Promise.all([
        dashboardApi.getDashboard(),
        workoutApi.getTodayWorkout(),
      ]);

      if (dashboardResponse.success && dashboardResponse.data) {
        setDashboardData(dashboardResponse.data);
      } else {
        toast.error(dashboardResponse.message || 'Failed to load dashboard data');
      }

      if (workoutResponse.success && workoutResponse.data) {
        setTodayWorkout(workoutResponse.data.workout);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No dashboard data available</p>
        <Button onClick={fetchDashboardData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const { dailyStats, todayMeals, weeklyProgress } = dashboardData;
  const displayName = dashboardData.user?.fullName || user?.fullName || 'User';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">
          Welcome back, {displayName.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your health summary for today</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Steps</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {dailyStats.steps.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  of {dailyStats.stepsGoal.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress
              value={Math.min((dailyStats.steps / dailyStats.stepsGoal) * 100, 100)}
              className="mt-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {dailyStats.calories}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  of {dailyStats.caloriesGoal} kcal
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <Progress
              value={Math.min((dailyStats.calories / dailyStats.caloriesGoal) * 100, 100)}
              className="mt-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Water</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {dailyStats.water} glasses
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  of {dailyStats.waterGoal} glasses
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <Progress
              value={Math.min((dailyStats.water / dailyStats.waterGoal) * 100, 100)}
              className="mt-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sleep</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {dailyStats.sleep}h
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  of {dailyStats.sleepGoal}h
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Moon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress
              value={Math.min((dailyStats.sleep / dailyStats.sleepGoal) * 100, 100)}
              className="mt-4"
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Workouts and Meals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Workouts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Workouts</CardTitle>
                  <CardDescription>Your scheduled exercises</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('workouts')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayWorkout ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Dumbbell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{todayWorkout.workoutName}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {todayWorkout.duration} min
                            </span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Flame className="w-4 h-4" />
                              {todayWorkout.calories} kcal
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigateTo('workouts')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Dumbbell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No workouts scheduled for today</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => navigateTo('workouts')}
                    >
                      Schedule Workout
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Today's Meals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Meals</CardTitle>
                  <CardDescription>Your nutrition plan</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('meals')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayMeals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Apple className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No meals logged for today</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => navigateTo('meals')}
                    >
                      Log Meal
                    </Button>
                  </div>
                ) : (
                  todayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          meal.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}
                      >
                        <Apple
                          className={`w-6 h-6 ${
                            meal.completed ? 'text-green-600' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={
                              meal.completed
                                ? 'line-through text-gray-500'
                                : 'text-gray-900'
                            }
                          >
                            {meal.name}
                          </p>
                          {meal.completed && (
                            <Badge variant="secondary">Logged</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {meal.time} • {meal.calories} kcal
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{meal.items}</p>
                      </div>
                      {!meal.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateTo('meals')}
                        >
                          Log
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Progress and Insights */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Last 7 days overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Workouts Completed
                    </p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {weeklyProgress.workoutsCompleted}/{weeklyProgress.workoutsGoal}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Daily Calories
                    </p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {weeklyProgress.avgDailyCalories.toLocaleString()}
                    </p>
                  </div>
                  <Flame className="w-8 h-8 text-blue-600" />
                </div>

                {weeklyProgress.weightChange !== null && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Weight Change
                      </p>
                      <p className="text-2xl text-gray-900 dark:text-white flex items-center gap-1">
                        {weeklyProgress.weightChange > 0 ? '+' : ''}
                        {weeklyProgress.weightChange} kg
                        {weeklyProgress.weightChange < 0 && (
                          <ArrowDown className="w-4 h-4 text-green-600" />
                        )}
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dynamic insights based on progress */}
                {dailyStats.calories > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white mb-1">
                          Great Progress!
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You've logged {dailyStats.calories} calories today. Keep tracking
                          your meals!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {dailyStats.water < dailyStats.waterGoal && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white mb-1">
                          Stay Hydrated
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You need {dailyStats.waterGoal - dailyStats.water} more glasses to
                          reach your daily water goal.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {todayMeals.length >= 3 && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white mb-1">
                          Meal Tracking Streak
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You've logged {todayMeals.length} meals today. Great job staying
                          consistent!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigateTo('workouts')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Workout
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigateTo('meals')}
              >
                <Apple className="w-4 h-4 mr-2" />
                Log Meal
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigateTo('coach')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Ask AI Coach
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
