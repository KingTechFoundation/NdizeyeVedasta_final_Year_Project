import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Target,
  Award,
  Flame,
  Activity,
  Heart
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,

  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function Analytics() {
  const progressData = [
    { month: 'Jan', weight: 72.5, bodyFat: 22, muscle: 55 },
    { month: 'Feb', weight: 71.8, bodyFat: 21, muscle: 56 },
    { month: 'Mar', weight: 71.2, bodyFat: 20, muscle: 57 },
    { month: 'Apr', weight: 70.5, bodyFat: 19, muscle: 58 },
  ];

  const calorieBalance = [
    { week: 'Week 1', consumed: 14800, burned: 16200, net: -1400 },
    { week: 'Week 2', consumed: 15200, burned: 16500, net: -1300 },
    { week: 'Week 3', consumed: 14600, burned: 16800, net: -2200 },
    { week: 'Week 4', consumed: 15000, burned: 16400, net: -1400 },
  ];

  const workoutDistribution = [
    { name: 'Strength', value: 35, color: '#3b82f6' },
    { name: 'Cardio', value: 30, color: '#ef4444' },
    { name: 'Flexibility', value: 20, color: '#8b5cf6' },
    { name: 'Rest', value: 15, color: '#10b981' },
  ];

  const fitnessScore = [
    { subject: 'Strength', A: 85, fullMark: 100 },
    { subject: 'Endurance', A: 78, fullMark: 100 },
    { subject: 'Flexibility', A: 72, fullMark: 100 },
    { subject: 'Balance', A: 80, fullMark: 100 },
    { subject: 'Recovery', A: 88, fullMark: 100 },
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', description: 'Completed workouts for 7 consecutive days', earned: true, date: 'Oct 22, 2025' },
    { id: 2, title: 'Early Bird', description: 'Completed 10 morning workouts', earned: true, date: 'Oct 20, 2025' },
    { id: 3, title: 'Calorie Master', description: 'Stayed within calorie goal for 30 days', earned: false, progress: 22 },
    { id: 4, title: 'Step Champion', description: 'Reached 10,000 steps 50 times', earned: false, progress: 38 },
    { id: 5, title: 'Strength Warrior', description: 'Completed 25 strength workouts', earned: true, date: 'Oct 15, 2025' },
    { id: 6, title: 'Hydration Hero', description: 'Met water goal for 21 days', earned: false, progress: 14 },
  ];

  const healthMetrics = {
    overallScore: 82,
    improvement: '+12%',
    riskFactors: 'Low',
    recommendations: 3,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Comprehensive health and fitness analytics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="4weeks">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1week">Last Week</SelectItem>
              <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Health Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-blue-700 mb-1">Overall Health Score</p>
                <p className="text-4xl text-blue-900">{healthMetrics.overallScore}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-700">
              <TrendingUp className="w-4 h-4" />
              {healthMetrics.improvement} from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Risk Factors</p>
                <p className="text-3xl text-gray-900">{healthMetrics.riskFactors}</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Goals Achieved</p>
              <p className="text-3xl text-gray-900">15/20</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">AI Recommendations</p>
              <p className="text-3xl text-gray-900">{healthMetrics.recommendations}</p>
              <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">View details</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Body Composition Trends</CardTitle>
                <CardDescription>Track your physical changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} name="Weight (kg)" />
                    <Line type="monotone" dataKey="bodyFat" stroke="#ef4444" strokeWidth={2} name="Body Fat (%)" />
                    <Line type="monotone" dataKey="muscle" stroke="#10b981" strokeWidth={2} name="Muscle Mass (kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calorie Balance</CardTitle>
                <CardDescription>Weekly calorie intake vs expenditure</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calorieBalance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumed" fill="#f97316" name="Consumed" />
                    <Bar dataKey="burned" fill="#10b981" name="Burned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workout Distribution</CardTitle>
                <CardDescription>How you're spending your training time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workoutDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workoutDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {workoutDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fitness Score Radar</CardTitle>
                <CardDescription>Your fitness profile across key areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={fitnessScore}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Your Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Calories Burned</p>
                <p className="text-2xl text-gray-900">24,850</p>
                <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Avg Workout Duration</p>
                <p className="text-2xl text-gray-900">42 min</p>
                <p className="text-sm text-gray-500 mt-1">+5 min from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Goal Completion Rate</p>
                <p className="text-2xl text-gray-900">85%</p>
                <p className="text-sm text-gray-500 mt-1">Excellent consistency</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>AI-powered analysis of your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Strength Improvement</p>
                      <p className="text-sm text-gray-600">
                        Your average weight lifted has increased by 15% over the last month. Keep pushing!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Cardio Endurance</p>
                      <p className="text-sm text-gray-600">
                        Your resting heart rate has decreased by 3 bpm, indicating improved cardiovascular fitness.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Recovery Optimization</p>
                      <p className="text-sm text-gray-600">
                        Your sleep quality has improved, leading to better recovery and performance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Area for Improvement</p>
                      <p className="text-sm text-gray-600">
                        Consider adding more flexibility work to your routine to prevent injuries and improve mobility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : ''}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.earned
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : 'bg-gray-200'
                      }`}>
                      <Award className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-400'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.earned ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Calendar className="w-3 h-3 mr-1" />
                      Earned {achievement.date}
                    </Badge>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Health Predictions</CardTitle>
              <CardDescription>Based on your current trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg text-gray-900 mb-2">Weight Loss Projection</h3>
                  <p className="text-3xl text-blue-600 mb-2">-2.5 kg</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Expected weight loss in the next 4 weeks based on your current activity and nutrition patterns.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Confidence: 87%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg text-gray-900 mb-2">Fitness Level Improvement</h3>
                  <p className="text-3xl text-green-600 mb-2">+18%</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Predicted improvement in your overall fitness score by continuing your current workout regimen.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Confidence: 92%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                  <h3 className="text-lg text-gray-900 mb-2">Health Risk Assessment</h3>
                  <p className="text-3xl text-green-600 mb-2">Low Risk</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Your current lifestyle habits indicate a low risk for lifestyle-related diseases (NCDs). Continue maintaining healthy patterns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cardiovascular Health</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Excellent</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Metabolic Health</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Good</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mental Wellness</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Fair</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI suggestions to optimize your health journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Increase Protein Intake</p>
                      <p className="text-sm text-gray-600">
                        Add 15g more protein daily to support muscle recovery and growth
                      </p>
                    </div>
                    <Badge>High Priority</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Add Flexibility Training</p>
                      <p className="text-sm text-gray-600">
                        Include 2 yoga or stretching sessions per week for better mobility
                      </p>
                    </div>
                    <Badge variant="secondary">Medium Priority</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Optimize Sleep Schedule</p>
                      <p className="text-sm text-gray-600">
                        Aim for consistent 8-hour sleep windows for better recovery
                      </p>
                    </div>
                    <Badge variant="secondary">Medium Priority</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
