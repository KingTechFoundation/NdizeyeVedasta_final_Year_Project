import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Heart,
  Activity,
  TrendingUp,
  TrendingDown,
  Flame,
  Footprints,
  Moon,
  Droplets,
  Watch,
  Calendar,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { healthTrackerApi, type HealthTrackerData } from '../services/api';
import { toast } from 'sonner';
import HealthTrackerSkeleton from './HealthTrackerSkeleton';

export default function HealthTracker() {
  const [trackerData, setTrackerData] = useState<HealthTrackerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    setIsLoading(true);
    try {
      const response = await healthTrackerApi.getHealthTracker();
      if (response.success && response.data) {
        setTrackerData(response.data.tracker);
      }
    } catch (error) {
      console.error('Failed to fetch health data:', error);
      toast.error('Failed to load health metrics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <HealthTrackerSkeleton />;
  }

  // Fallback if data is missing
  const data = trackerData || {
    steps: 0,
    stepsGoal: 10000,
    calories: 0,
    caloriesGoal: 2500,
    water: 0,
    waterGoal: 8,
    sleep: 0,
    sleepGoal: 8,
    weight: 0,
    activeMinutes: 0,
    activeMinutesGoal: 30,
    caloriesBurned: 0
  };

  const vitalStats = {
    heartRate: { current: 72, status: 'Normal', trend: 'stable' }, // Mocking non-implemented vitals
    bloodPressure: { systolic: 120, diastolic: 80, status: 'Normal' },
    weight: { current: data.weight || 0, unit: 'kg' },
    bmi: { value: 23.2, status: 'Healthy' },
  };

  // Weekly data (mocked for now as we don't have a weekly endpoint, but could be derived later)
  const weeklyData = [
    { day: 'Mon', steps: 8234, calories: 2100, water: 8, sleep: 7.5, heartRate: 71 },
    { day: 'Tue', steps: 10567, calories: 1950, water: 7, sleep: 8, heartRate: 69 },
    { day: 'Wed', steps: 7890, calories: 2200, water: 6, sleep: 7, heartRate: 73 },
    { day: 'Thu', steps: 12345, calories: 1850, water: 8, sleep: 7.5, heartRate: 70 },
    { day: 'Fri', steps: 9876, calories: 2000, water: 7, sleep: 6.5, heartRate: 74 },
    { day: 'Sat', steps: 11234, calories: 2300, water: 9, sleep: 8.5, heartRate: 68 },
    { day: 'Sun', steps: data.steps, calories: data.calories, water: data.water, sleep: data.sleep, heartRate: 72 },
  ];

  const handleSyncClick = () => {
    toast.info('Redirecting to device sync...');
    window.location.hash = '#/settings?tab=devices';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Health Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your vital health metrics</p>
        </div>
        <Button variant="outline" onClick={handleSyncClick}>
          <Watch className="w-4 h-4 mr-2" />
          Sync Device
        </Button>
      </div>

      {/* Vital Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Heart Rate</p>
                <p className="text-3xl text-gray-900 dark:text-white">{vitalStats.heartRate.current}</p>
                <p className="text-sm text-gray-500">bpm</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {vitalStats.heartRate.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Blood Pressure</p>
                <p className="text-3xl text-gray-900 dark:text-white">
                  {vitalStats.bloodPressure.systolic}/{vitalStats.bloodPressure.diastolic}
                </p>
                <p className="text-sm text-gray-500">mmHg</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {vitalStats.bloodPressure.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Weight</p>
                <p className="text-3xl text-gray-900 dark:text-white">{vitalStats.weight.current}</p>
                <p className="text-sm text-gray-500">{vitalStats.weight.unit}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <TrendingDown className="w-4 h-4" />
              Progress: Stable
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">BMI</p>
                <p className="text-3xl text-gray-900 dark:text-white">{vitalStats.bmi.value}</p>
                <p className="text-sm text-gray-500">Body Mass Index</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {vitalStats.bmi.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Steps</CardTitle>
                  <CardDescription>Your activity tracking</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Footprints className="w-4 h-4" />
                    <span className="text-sm">Today's Steps</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white">{data.steps}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Active Minutes</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white">{data.activeMinutes}</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">Calories Burned</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white">{data.caloriesBurned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Intake</CardTitle>
                  <CardDescription>Your nutritional summary</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">Calories</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white">{data.calories}</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">Water Intake</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white">{data.water} glasses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Tracking</CardTitle>
              <CardDescription>Monitor your rest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg inline-block">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Moon className="w-4 h-4" />
                  <span className="text-sm">Today's Sleep</span>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white">{data.sleep} hours</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
              <CardDescription>Recent heart rate data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{trackerData?.caloriesBurned ? 'Real-time sync available' : 'Waiting for sync...'}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
