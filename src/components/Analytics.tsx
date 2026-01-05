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
import { useState, useEffect } from 'react';
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
import { analyticsApi, type AnalyticsData } from '../services/api';
import { toast } from 'sonner';
import AnalyticsSkeleton from './AnalyticsSkeleton';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'1week' | '2weeks' | '4weeks' | '3months' | '6months'>('4weeks');

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const response = await analyticsApi.getAnalytics(selectedPeriod);
      if (response.success && response.data) {
        setAnalyticsData(response.data);
      } else {
        toast.error(response.message || 'Failed to load analytics data');
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  // Format data for charts
  const progressData = analyticsData?.bodyCompositionTrends.map((trend, index) => ({
    week: `Week ${index + 1}`,
    weight: trend.weight,
    steps: trend.steps,
    calories: trend.calories,
  })) || [];

  const calorieBalance = analyticsData?.calorieBalance.map((balance, index) => ({
    week: `Week ${index + 1}`,
    consumed: balance.intake,
    burned: balance.expenditure,
    net: balance.balance,
  })) || [];

  // Simplified workout distribution (can be enhanced with actual workout type data)
  const workoutDistribution = [
    { name: 'Completed', value: analyticsData?.workoutPerformance.totalWorkouts || 0, color: '#3b82f6' },
    { name: 'Rest Days', value: Math.max(0, 20 - (analyticsData?.workoutPerformance.totalWorkouts || 0)), color: '#10b981' },
  ];

  // Fitness score based on performance (simplified)
  const fitnessScore = [
    { subject: 'Consistency', A: analyticsData?.goalsAchieved.percentage || 0, fullMark: 100 },
    { subject: 'Activity', A: Math.min(100, (analyticsData?.workoutPerformance.totalWorkouts || 0) * 10), fullMark: 100 },
    { subject: 'Nutrition', A: analyticsData?.overallHealthScore || 50, fullMark: 100 },
    { subject: 'Recovery', A: 75, fullMark: 100 },
  ];

  const achievements = analyticsData?.goalsAchieved.goals.map((goal, index) => ({
    id: index + 1,
    title: goal.name,
    description: goal.achieved ? 'Goal achieved!' : `Continue working towards this goal`,
    earned: goal.achieved,
    progress: goal.achieved ? 100 : 50,
  })) || [];

  const healthMetrics = analyticsData ? {
    overallScore: analyticsData.overallHealthScore,
    improvement: '+0%', // Can be calculated by comparing with previous period
    riskFactors: analyticsData.riskFactors.level,
    recommendations: 3, // Can be calculated based on risk factors
  } : {
    overallScore: 0,
    improvement: '+0%',
    riskFactors: 'Low',
    recommendations: 0,
  };

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No analytics data available</p>
        <Button onClick={fetchAnalyticsData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Comprehensive health and fitness analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1week">Last Week</SelectItem>
              <SelectItem value="2weeks">Last 2 Weeks</SelectItem>
              <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
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
              <Badge
                variant="secondary"
                className={
                  analyticsData.riskFactors.level === 'Low'
                    ? 'bg-green-100 text-green-700'
                    : analyticsData.riskFactors.level === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }
              >
                {analyticsData.riskFactors.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Goals Achieved</p>
              <p className="text-3xl text-gray-900">{analyticsData.goalsAchieved.achieved}/{analyticsData.goalsAchieved.total}</p>
              <p className="text-sm text-gray-500 mt-1">This period</p>
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
                {progressData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {progressData[0]?.weight !== null && (
                        <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} name="Weight (kg)" />
                      )}
                      <Line type="monotone" dataKey="steps" stroke="#ef4444" strokeWidth={2} name="Steps" />
                      <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} name="Calories Burned" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500">
                    No data available for this period
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calorie Balance</CardTitle>
                <CardDescription>Weekly calorie intake vs expenditure</CardDescription>
              </CardHeader>
              <CardContent>
                {calorieBalance.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calorieBalance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consumed" fill="#f97316" name="Intake" />
                      <Bar dataKey="burned" fill="#10b981" name="Expenditure" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500">
                    No data available for this period
                  </div>
                )}
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
                <p className="text-2xl text-gray-900">{analyticsData.workoutPerformance.totalCaloriesBurned.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Last {selectedPeriod === '1week' ? '7' : selectedPeriod === '4weeks' ? '28' : '30'} days</p>
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
                <p className="text-2xl text-gray-900">{analyticsData.workoutPerformance.avgDuration} min</p>
                <p className="text-sm text-gray-500 mt-1">{analyticsData.workoutPerformance.totalWorkouts} workouts completed</p>
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
                <p className="text-2xl text-gray-900">{analyticsData.goalsAchieved.percentage}%</p>
                <p className="text-sm text-gray-500 mt-1">{analyticsData.goalsAchieved.achieved}/{analyticsData.goalsAchieved.total} goals achieved</p>
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
                      Earned
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
