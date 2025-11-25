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

  ArrowDown
} from 'lucide-react';


export default function Dashboard() {
  const dailyStats = {
    steps: 8234,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8,
    activeMinutes: 45,
    activeGoal: 60,
  };

  const todayWorkouts = [
    {
      id: 1,
      name: 'Morning Cardio',
      time: '7:00 AM',
      duration: '30 min',
      type: 'Running',
      completed: true,
    },
    {
      id: 2,
      name: 'Upper Body Strength',
      time: '6:00 PM',
      duration: '45 min',
      type: 'Strength',
      completed: false,
    },
  ];

  const todayMeals = [
    {
      id: 1,
      name: 'Breakfast',
      time: '8:00 AM',
      items: 'Oatmeal with berries, Green tea',
      calories: 350,
      completed: true,
    },
    {
      id: 2,
      name: 'Lunch',
      time: '1:00 PM',
      items: 'Grilled chicken salad, Quinoa',
      calories: 500,
      completed: true,
    },
    {
      id: 3,
      name: 'Dinner',
      time: '7:00 PM',
      items: 'Salmon with vegetables, Brown rice',
      calories: 600,
      completed: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Welcome back, Veda!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your health summary for today</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Steps</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{dailyStats.steps.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {dailyStats.stepsGoal.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={(dailyStats.steps / dailyStats.stepsGoal) * 100} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{dailyStats.calories}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {dailyStats.caloriesGoal} kcal</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <Progress value={(dailyStats.calories / dailyStats.caloriesGoal) * 100} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Water</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{dailyStats.water} glasses</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {dailyStats.waterGoal} glasses</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <Progress value={(dailyStats.water / dailyStats.waterGoal) * 100} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sleep</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{dailyStats.sleep}h</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {dailyStats.sleepGoal}h</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Moon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={(dailyStats.sleep / dailyStats.sleepGoal) * 100} className="mt-4" />
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
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${workout.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                      <Dumbbell className={`w-6 h-6 ${workout.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={workout.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                          {workout.name}
                        </p>
                        {workout.completed && <Badge variant="secondary">Completed</Badge>}
                      </div>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {workout.time} • {workout.duration} • {workout.type}
                      </p>
                    </div>
                    {!workout.completed && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Start</Button>
                    )}
                  </div>
                ))}
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
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${meal.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                      <Apple className={`w-6 h-6 ${meal.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={meal.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                          {meal.name}
                        </p>
                        {meal.completed && <Badge variant="secondary">Logged</Badge>}
                      </div>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {meal.time} • {meal.calories} kcal
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{meal.items}</p>
                    </div>
                    {!meal.completed && (
                      <Button variant="outline" size="sm">Log</Button>
                    )}
                  </div>
                ))}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Workouts Completed</p>
                    <p className="text-2xl text-gray-900 dark:text-white">5/7</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Daily Calories</p>
                    <p className="text-2xl text-gray-900 dark:text-white">2,043</p>
                  </div>
                  <Flame className="w-8 h-8 text-blue-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight Change</p>
                    <p className="text-2xl text-gray-900 dark:text-white flex items-center gap-1">
                      -0.5 kg
                      <ArrowDown className="w-4 h-4 text-green-600" />
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
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
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white mb-1">Great Progress!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You're 80% towards your weekly goal. Keep up the momentum!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white mb-1">Stay Hydrated</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You need 2 more glasses to reach your daily water goal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white mb-1">Achievement Unlocked</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        5-day workout streak! You're on fire.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Workout
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Apple className="w-4 h-4 mr-2" />
                Log Meal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Sync Wearable
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}