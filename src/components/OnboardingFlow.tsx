import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Activity, ArrowRight, ArrowLeft } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { onboardingApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { checkAuth } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    medicalConditions: [] as string[],
    dietaryRestrictions: [] as string[],
    sleepHours: '',
    stressLevel: '',
    waterIntake: '',
    notes: '',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Load existing onboarding data if available
  useEffect(() => {
    const loadOnboardingData = async () => {
      try {
        const response = await onboardingApi.getOnboardingData();
        if (response.success && response.data?.onboardingData) {
          const data = response.data.onboardingData;
          setFormData({
            age: data.age?.toString() || '',
            gender: data.gender || '',
            height: data.height?.toString() || '',
            weight: data.weight?.toString() || '',
            activityLevel: data.activityLevel || '',
            goal: data.goal || '',
            medicalConditions: data.medicalConditions || [],
            dietaryRestrictions: data.dietaryRestrictions || [],
            sleepHours: data.sleepHours?.toString() || '',
            stressLevel: data.stressLevel || '',
            waterIntake: data.waterIntake?.toString() || '',
            notes: data.notes || '',
          });
        }
      } catch (error) {
        // Silently fail - user can fill in fresh data
        console.error('Failed to load onboarding data:', error);
      }
    };

    loadOnboardingData();
  }, []);

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Last step - save onboarding data
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await onboardingApi.saveOnboardingData({
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender || undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        activityLevel: formData.activityLevel || undefined,
        goal: formData.goal || undefined,
        medicalConditions: formData.medicalConditions,
        dietaryRestrictions: formData.dietaryRestrictions,
        sleepHours: formData.sleepHours ? parseFloat(formData.sleepHours) : undefined,
        stressLevel: formData.stressLevel || undefined,
        waterIntake: formData.waterIntake ? parseFloat(formData.waterIntake) : undefined,
        notes: formData.notes || undefined,
      });

      if (response.success) {
        // Refresh auth context to get updated user data
        await checkAuth();
        toast.success('Onboarding completed successfully!');
        onComplete();
      } else {
        throw new Error(response.message || 'Failed to save onboarding data');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save onboarding data. Please try again.';
      toast.error(errorMessage);
      console.error('Onboarding save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'medicalConditions' | 'dietaryRestrictions', item: string) => {
    setFormData(prev => {
      const array = prev[field];
      const newArray = array.includes(item)
        ? array.filter(i => i !== item)
        : [...array, item];
      return { ...prev, [field]: newArray };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-10 h-10 text-blue-600" />
            <span className="text-3xl text-gray-900 dark:text-white">Medifit AI</span>
          </div>
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Complete Your Health Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Help us personalize your fitness journey</p>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Health & Activity'}
              {step === 3 && 'Goals & Preferences'}
              {step === 4 && 'Medical History'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us about yourself'}
              {step === 2 && 'Your current health status'}
              {step === 3 && 'What do you want to achieve?'}
              {step === 4 && 'Important health information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => updateFormData('age', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                    />
                  </div>
                </div>

                {formData.height && formData.weight && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm">
                      <span className="text-gray-600">Your BMI: </span>
                      <span className="text-blue-600">
                        {(parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <RadioGroup value={formData.activityLevel} onValueChange={(value) => updateFormData('activityLevel', value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="sedentary" id="sedentary" />
                      <Label htmlFor="sedentary" className="cursor-pointer flex-1">
                        <div>Sedentary</div>
                        <div className="text-sm text-gray-500">Little or no exercise</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="cursor-pointer flex-1">
                        <div>Lightly Active</div>
                        <div className="text-sm text-gray-500">Exercise 1-3 times/week</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="cursor-pointer flex-1">
                        <div>Moderately Active</div>
                        <div className="text-sm text-gray-500">Exercise 3-5 times/week</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="very" id="very" />
                      <Label htmlFor="very" className="cursor-pointer flex-1">
                        <div>Very Active</div>
                        <div className="text-sm text-gray-500">Exercise 6-7 times/week</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sleep">Average Sleep (hours)</Label>
                    <Input
                      id="sleep"
                      type="number"
                      placeholder="7-8"
                      value={formData.sleepHours}
                      onChange={(e) => updateFormData('sleepHours', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="water">Daily Water (glasses)</Label>
                    <Input
                      id="water"
                      type="number"
                      placeholder="8"
                      value={formData.waterIntake}
                      onChange={(e) => updateFormData('waterIntake', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Goal</Label>
                  <RadioGroup value={formData.goal} onValueChange={(value) => updateFormData('goal', value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="lose-weight" id="lose-weight" />
                      <Label htmlFor="lose-weight" className="cursor-pointer flex-1">Lose Weight</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="gain-muscle" id="gain-muscle" />
                      <Label htmlFor="gain-muscle" className="cursor-pointer flex-1">Gain Muscle</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="maintain" id="maintain" />
                      <Label htmlFor="maintain" className="cursor-pointer flex-1">Maintain Weight</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="improve-health" id="improve-health" />
                      <Label htmlFor="improve-health" className="cursor-pointer flex-1">Improve Overall Health</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="athletic" id="athletic" />
                      <Label htmlFor="athletic" className="cursor-pointer flex-1">Athletic Performance</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Dietary Restrictions</Label>
                  <div className="space-y-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher', 'None'].map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox
                          id={diet}
                          checked={formData.dietaryRestrictions.includes(diet)}
                          onCheckedChange={() => toggleArrayItem('dietaryRestrictions', diet)}
                        />
                        <Label htmlFor={diet} className="cursor-pointer">{diet}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Medical Conditions (select all that apply)</Label>
                  <div className="space-y-2">
                    {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'Back Problems', 'None'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.medicalConditions.includes(condition)}
                          onCheckedChange={() => toggleArrayItem('medicalConditions', condition)}
                        />
                        <Label htmlFor={condition} className="cursor-pointer">{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stress Level</Label>
                  <Select value={formData.stressLevel} onValueChange={(value) => updateFormData('stressLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional health information, injuries, or concerns we should know about..."
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (step === totalSteps ? 'Complete' : 'Next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}