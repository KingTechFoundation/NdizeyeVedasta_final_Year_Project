import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle2,
  Activity,
  Users,
  Smartphone,
  Bot,
  BarChart3,
  Book,
  Shield
} from 'lucide-react';

export default function PrototypeGuide() {
  const modules = [
    {
      name: 'User Profile Module',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      features: [
        'User registration and authentication',
        'Personal information management',
        'Health profile (BMI, medical history)',
        'Goals and preferences tracking'
      ]
    },
    {
      name: 'AI Recommendation Engine',
      icon: Bot,
      color: 'bg-purple-100 text-purple-600',
      features: [
        'Personalized workout plans',
        'Custom meal recommendations',
        'AI-powered health insights',
        'Adaptive learning from user behavior'
      ]
    },
    {
      name: 'Health Tracker Integration',
      icon: Activity,
      color: 'bg-green-100 text-green-600',
      features: [
        'Real-time vital monitoring',
        'Wearable device sync',
        'Step counting and calorie tracking',
        'Sleep pattern analysis'
      ]
    },
    {
      name: 'Chatbot Coaching Assistant',
      icon: Bot,
      color: 'bg-pink-100 text-pink-600',
      features: [
        '24/7 AI-powered coaching',
        'Real-time fitness guidance',
        'Meal planning assistance',
        'Motivational support'
      ]
    },
    {
      name: 'Analytics Dashboard',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
      features: [
        'Progress visualization',
        'Calorie balance tracking',
        'Fitness score radar',
        'Predictive health models'
      ]
    },
    {
      name: 'Educational Resources',
      icon: Book,
      color: 'bg-cyan-100 text-cyan-600',
      features: [
        'Health and fitness articles',
        'Video tutorials',
        'NCD prevention guides',
        'Wellness tips library'
      ]
    },
    {
      name: 'Data Privacy & Security',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      features: [
        'End-to-end encryption',
        'Secure authentication',
        'GDPR compliance',
        'User data control'
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl text-gray-900 dark:text-white">Medifit AI</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Personalized Fitness and Diet Coaching System
          </p>
          <Badge className="bg-blue-600 text-lg px-4 py-1">Prototype Screens</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>
              AI-powered health and fitness platform for preventive healthcare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Medifit AI is designed to provide personalized fitness and diet recommendations based on user health profiles, 
              goals, and lifestyle data. The system aims to make health coaching accessible, affordable, and scalable, 
              particularly for populations without access to personal trainers or dietitians.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">General Objective</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Design and implement an AI-driven fitness and diet management system that promotes 
                  preventive healthcare through personalized, data-based coaching and nutritional guidance.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">Target Impact</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contribution to Rwanda's Smart Health and Digital Transformation agendas by demonstrating 
                  how AI can enhance healthcare accessibility and personalization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl text-gray-900 dark:text-white mb-4">Key Features & Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-lg ${module.color} dark:opacity-80 flex items-center justify-center`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle>Expected Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Promotion of preventive healthcare through accessible fitness and diet guidance',
                'Increased awareness and reduction in lifestyle-related diseases (NCDs)',
                'Improved fitness and nutrition among youth and underserved communities',
                'Real-time health monitoring and progress tracking',
                'Enhanced access to digital health solutions in both urban and rural Rwanda',
                'Demonstration of AI-enhanced healthcare accessibility'
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prototype Navigation</CardTitle>
            <CardDescription>Complete user flow demonstration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">1</div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">Signup Page</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">User registration with validation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">2</div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">Onboarding Flow</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">4-step health profile setup (Basic Info, Health & Activity, Goals, Medical History)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">3</div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">Main Dashboard</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Daily stats, workouts, meals, AI insights</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">4</div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">Feature Screens</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Workouts, Meals, Tracker, Analytics, AI Coach, Resources, Profile</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 pb-8">
          <p>Medifit AI - Making Health Coaching Accessible for Everyone</p>
          <p className="mt-1">Prototype for Software Engineering Project</p>
        </div>
      </div>
    </div>
  );
}