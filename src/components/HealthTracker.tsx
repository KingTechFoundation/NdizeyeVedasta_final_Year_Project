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
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function HealthTracker() {
  const vitalStats = {
    heartRate: { current: 72, status: 'Normal', trend: 'stable' },
    bloodPressure: { systolic: 120, diastolic: 80, status: 'Normal' },
    weight: { current: 70.5, change: -0.8, unit: 'kg' },
    bmi: { value: 23.2, status: 'Healthy' },
  };

  const weeklyData = [
    { day: 'Mon', steps: 8234, calories: 2100, water: 8, sleep: 7.5, heartRate: 71 },
    { day: 'Tue', steps: 10567, calories: 1950, water: 7, sleep: 8, heartRate: 69 },
    { day: 'Wed', steps: 7890, calories: 2200, water: 6, sleep: 7, heartRate: 73 },
    { day: 'Thu', steps: 12345, calories: 1850, water: 8, sleep: 7.5, heartRate: 70 },
    { day: 'Fri', steps: 9876, calories: 2000, water: 7, sleep: 6.5, heartRate: 74 },
    { day: 'Sat', steps: 11234, calories: 2300, water: 9, sleep: 8.5, heartRate: 68 },
    { day: 'Sun', steps: 6543, calories: 1900, water: 6, sleep: 8, heartRate: 72 },
  ];

  const monthlyWeight = [
    { week: 'Week 1', weight: 72.3 },
    { week: 'Week 2', weight: 71.8 },
    { week: 'Week 3', weight: 71.2 },
    { week: 'Week 4', weight: 70.5 },
  ];

  const sleepData = [
    { day: 'Mon', deep: 2.5, light: 3.5, rem: 1.5 },
    { day: 'Tue', deep: 2.8, light: 3.8, rem: 1.4 },
    { day: 'Wed', deep: 2.2, light: 3.3, rem: 1.5 },
    { day: 'Thu', deep: 2.6, light: 3.4, rem: 1.5 },
    { day: 'Fri', deep: 2.0, light: 3.0, rem: 1.5 },
    { day: 'Sat', deep: 3.0, light: 4.0, rem: 1.5 },
    { day: 'Sun', deep: 2.8, light: 3.7, rem: 1.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Health Tracker</h1>
          <p className="text-gray-600">Monitor your vital health metrics</p>
        </div>
        <Button variant="outline">
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
                <p className="text-sm text-gray-600 mb-1">Heart Rate</p>
                <p className="text-3xl text-gray-900">{vitalStats.heartRate.current}</p>
                <p className="text-sm text-gray-500">bpm</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {vitalStats.heartRate.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Blood Pressure</p>
                <p className="text-3xl text-gray-900">
                  {vitalStats.bloodPressure.systolic}/{vitalStats.bloodPressure.diastolic}
                </p>
                <p className="text-sm text-gray-500">mmHg</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {vitalStats.bloodPressure.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Weight</p>
                <p className="text-3xl text-gray-900">{vitalStats.weight.current}</p>
                <p className="text-sm text-gray-500">{vitalStats.weight.unit}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingDown className="w-4 h-4" />
              {Math.abs(vitalStats.weight.change)} {vitalStats.weight.unit} this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">BMI</p>
                <p className="text-3xl text-gray-900">{vitalStats.bmi.value}</p>
                <p className="text-sm text-gray-500">Body Mass Index</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
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

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Steps</CardTitle>
                  <CardDescription>Your activity over the past week</CardDescription>
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
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Footprints className="w-4 h-4" />
                    <span className="text-sm">Avg Daily Steps</span>
                  </div>
                  <p className="text-2xl text-gray-900">9,527</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Active Days</span>
                  </div>
                  <p className="text-2xl text-gray-900">7/7</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">Calories Burned</span>
                  </div>
                  <p className="text-2xl text-gray-900">2,845</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Calorie Intake</CardTitle>
                  <CardDescription>Your nutrition tracking over the week</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Month
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#f97316" 
                    fill="#fed7aa" 
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">Avg Calories</span>
                  </div>
                  <p className="text-2xl text-gray-900">2,043</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">On Track Days</span>
                  </div>
                  <p className="text-2xl text-gray-900">5/7</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">Avg Water</span>
                  </div>
                  <p className="text-2xl text-gray-900">7.3 cups</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
              <CardDescription>Monthly weight tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyWeight}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[69, 73]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sleep Tab */}
        <TabsContent value="sleep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Analysis</CardTitle>
              <CardDescription>Track your sleep quality and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deep" stackId="a" fill="#6366f1" name="Deep Sleep" />
                  <Bar dataKey="light" stackId="a" fill="#a78bfa" name="Light Sleep" />
                  <Bar dataKey="rem" stackId="a" fill="#c4b5fd" name="REM Sleep" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Avg Sleep</span>
                  </div>
                  <p className="text-2xl text-gray-900">7.6 hrs</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Sleep Quality</span>
                  </div>
                  <p className="text-2xl text-gray-900">85%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Deep Sleep</span>
                  </div>
                  <p className="text-2xl text-gray-900">2.6 hrs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Trends</CardTitle>
              <CardDescription>Monitor your cardiovascular health</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[65, 80]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Avg Heart Rate</span>
                  </div>
                  <p className="text-2xl text-gray-900">71 bpm</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Resting HR</span>
                  </div>
                  <p className="text-2xl text-gray-900">68 bpm</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Max HR</span>
                  </div>
                  <p className="text-2xl text-gray-900">145 bpm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: 'Today', systolic: 120, diastolic: 80, status: 'Normal' },
                    { date: 'Yesterday', systolic: 118, diastolic: 78, status: 'Normal' },
                    { date: '2 days ago', systolic: 122, diastolic: 82, status: 'Normal' },
                    { date: '3 days ago', systolic: 119, diastolic: 79, status: 'Normal' },
                  ].map((reading, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">{reading.systolic}/{reading.diastolic} mmHg</p>
                        <p className="text-sm text-gray-500">{reading.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {reading.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-gray-900 mb-1">Excellent Progress</p>
                    <p className="text-sm text-gray-600">
                      Your heart rate variability has improved by 12% this month.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-900 mb-1">Stay Consistent</p>
                    <p className="text-sm text-gray-600">
                      Keep monitoring your vitals regularly for accurate health insights.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-gray-900 mb-1">Recommendation</p>
                    <p className="text-sm text-gray-600">
                      Consider tracking your blood glucose levels for comprehensive health data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
