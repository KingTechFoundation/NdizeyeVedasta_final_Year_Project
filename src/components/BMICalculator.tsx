import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Calculator
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function BMICalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w && h) {
      let bmiValue: number;
      if (unit === 'metric') {
        // kg and cm
        bmiValue = w / Math.pow(h / 100, 2);
      } else {
        // lbs and inches
        bmiValue = (w / Math.pow(h, 2)) * 703;
      }
      setBMI(parseFloat(bmiValue.toFixed(1)));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { 
      category: 'Underweight', 
      color: 'text-blue-600 dark:text-blue-400', 
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      icon: TrendingDown,
      description: 'You may need to gain weight. Consult with a healthcare provider.'
    };
    if (bmi < 25) return { 
      category: 'Healthy Weight', 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      icon: CheckCircle2,
      description: 'Great! You are in a healthy weight range.'
    };
    if (bmi < 30) return { 
      category: 'Overweight', 
      color: 'text-yellow-600 dark:text-yellow-400', 
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      icon: AlertCircle,
      description: 'Consider working on weight management through diet and exercise.'
    };
    return { 
      category: 'Obese', 
      color: 'text-red-600 dark:text-red-400', 
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      icon: TrendingUp,
      description: 'It\'s important to consult with a healthcare provider for guidance.'
    };
  };

  const bmiRanges = [
    { label: 'Underweight', min: 0, max: 18.5, color: 'bg-blue-500' },
    { label: 'Healthy', min: 18.5, max: 25, color: 'bg-green-500' },
    { label: 'Overweight', min: 25, max: 30, color: 'bg-yellow-500' },
    { label: 'Obese', min: 30, max: 40, color: 'bg-red-500' },
  ];

  const getBMIPosition = (bmi: number) => {
    const minBMI = 15;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">BMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400">Calculate your Body Mass Index and understand your weight status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Calculate Your BMI
            </CardTitle>
            <CardDescription>Enter your measurements below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">
                  Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? '70' : '154'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">
                  Height {unit === 'metric' ? '(cm)' : '(inches)'}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? '170' : '67'}
                />
              </div>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={calculateBMI}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate BMI
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {bmi && (
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Your BMI Result</CardTitle>
              <CardDescription>Based on your current measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* BMI Value */}
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getBMICategory(bmi).bgColor} mb-4`}>
                  <div>
                    <p className="text-5xl text-gray-900 dark:text-white">{bmi}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">BMI</p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-center gap-3">
                {(() => {
                  const { category, color, icon: Icon } = getBMICategory(bmi);
                  return (
                    <>
                      <Icon className={`w-6 h-6 ${color}`} />
                      <Badge className={`text-lg px-4 py-2 ${getBMICategory(bmi).bgColor} ${color} border-0`}>
                        {category}
                      </Badge>
                    </>
                  );
                })()}
              </div>

              {/* Description */}
              <div className={`p-4 rounded-lg border ${getBMICategory(bmi).bgColor} ${getBMICategory(bmi).color} border-current`}>
                <p className="text-sm text-center">
                  {getBMICategory(bmi).description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Weight</p>
                  <p className="text-xl text-gray-900 dark:text-white">
                    {weight} {unit === 'metric' ? 'kg' : 'lbs'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Height</p>
                  <p className="text-xl text-gray-900 dark:text-white">
                    {height} {unit === 'metric' ? 'cm' : 'in'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* BMI Scale Visual */}
      {bmi && (
        <Card>
          <CardHeader>
            <CardTitle>BMI Scale</CardTitle>
            <CardDescription>See where you fall on the BMI spectrum</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Scale Bar */}
            <div className="relative h-16 mb-8">
              <div className="absolute inset-0 flex rounded-lg overflow-hidden">
                {bmiRanges.map((range, index) => (
                  <div
                    key={index}
                    className={`${range.color} flex-1`}
                    style={{ 
                      flexGrow: range.max - range.min 
                    }}
                  />
                ))}
              </div>
              
              {/* Indicator */}
              <div
                className="absolute top-0 h-full flex flex-col items-center"
                style={{ left: `${getBMIPosition(bmi)}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-1 h-full bg-gray-900 dark:bg-white"></div>
                <div className="absolute -top-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <span className="text-sm">{bmi}</span>
                </div>
              </div>
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bmiRanges.map((range, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${range.color}`}></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{range.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {range.min} - {range.max}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Understanding BMI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-gray-900 dark:text-white mb-2">What is BMI?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a useful screening tool but doesn't directly measure body fat percentage.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white mb-2">Limitations</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>BMI doesn't account for muscle mass, bone density, or overall body composition</li>
              <li>Athletes may have a high BMI due to muscle, not excess fat</li>
              <li>Age, sex, and ethnicity can affect the relationship between BMI and body fat</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 dark:text-white mb-1">Important Note</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  BMI is just one indicator of health. For personalized health advice, consult with a healthcare professional who can assess your overall health, body composition, and individual circumstances.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Set Weight Goal
            </Button>
            <Button variant="outline" className="flex-1">
              Track Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
