import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  User, 
  Heart,
  Bell,
  Shield,
  Smartphone,
  Activity,
  Target,
  Edit,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { userApi, type User as UserType } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function ProfileManagement() {
  const { setUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUserData] = useState<UserType | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    height: '',
    weight: '',
    goal: 'lose-weight',
    activityLevel: 'moderate',
  });

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    progressUpdates: true,
    weeklyReports: true,
    motivationalMessages: true,
    communityUpdates: false,
  });

  const healthData = {
    bloodType: 'A+',
    allergies: ['Peanuts'],
    conditions: ['None'],
    medications: ['None'],
  };

  const connectedDevices = [
    { name: 'Apple Watch Series 8', status: 'Connected', lastSync: '2 hours ago' },
    { name: 'Fitbit Charge 5', status: 'Not Connected', lastSync: 'Never' },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.getProfile();
      if (response.success && response.data) {
        const userData = response.data.user;
        setUserData(userData);
        setProfileData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          age: userData.onboardingData?.age?.toString() || '',
          gender: (userData.onboardingData?.gender as 'male' | 'female' | 'other') || 'male',
          height: userData.onboardingData?.height?.toString() || '',
          weight: userData.onboardingData?.weight?.toString() || '',
          goal: userData.onboardingData?.goal || 'lose-weight',
          activityLevel: userData.onboardingData?.activityLevel || 'moderate',
        });
        // Load notification preferences
        if (userData.notificationPreferences) {
          setNotifications(userData.notificationPreferences);
        }
        // Update auth context user
        if (setUser) {
          setUser(userData);
        }
      } else {
        toast.error(response.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updateData: any = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        onboardingData: {
          age: profileData.age ? parseInt(profileData.age) : undefined,
          gender: profileData.gender,
          height: profileData.height ? parseFloat(profileData.height) : undefined,
          weight: profileData.weight ? parseFloat(profileData.weight) : undefined,
          goal: profileData.goal,
          activityLevel: profileData.activityLevel,
        },
      };

      const response = await userApi.updateProfile(updateData);
      if (response.success && response.data) {
        toast.success('Profile updated successfully');
        setUserData(response.data.user);
        if (setUser) {
          setUser(response.data.user);
        }
        setEditingProfile(false);
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original values
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.onboardingData?.age?.toString() || '',
        gender: (user.onboardingData?.gender as 'male' | 'female' | 'other') || 'male',
        height: user.onboardingData?.height?.toString() || '',
        weight: user.onboardingData?.weight?.toString() || '',
        goal: user.onboardingData?.goal || 'lose-weight',
        activityLevel: user.onboardingData?.activityLevel || 'moderate',
      });
    }
    setEditingProfile(false);
  };

  // Calculate BMI
  const calculateBMI = () => {
    const height = parseFloat(profileData.height);
    const weight = parseFloat(profileData.weight);
    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const bmi = calculateBMI();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Failed to load profile data</p>
        <Button onClick={fetchProfile}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600">
              <AvatarFallback className="text-3xl text-white">
                {profileData.fullName
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl text-gray-900">{profileData.fullName || 'User'}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
                {user.isEmailVerified && (
                  <Badge className="bg-green-600">Verified</Badge>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-lg text-gray-900">
                    {profileData.age ? `${profileData.age} years` : 'Not set'}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-lg text-gray-900">
                    {profileData.height ? `${profileData.height} cm` : 'Not set'}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-lg text-gray-900">
                    {profileData.weight ? `${profileData.weight} kg` : 'Not set'}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">BMI</p>
                  <p className="text-lg text-gray-900">
                    {bmi || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="health">
            <Heart className="w-4 h-4 mr-2" />
            Health
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="w-4 h-4 mr-2" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="w-4 h-4 mr-2" />
            Devices
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your basic information</CardDescription>
                </div>
                {!editingProfile && (
                  <Button variant="outline" onClick={() => setEditingProfile(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      disabled={!editingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={true}
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                      disabled={!editingProfile}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select 
                    value={profileData.gender}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, gender: value as 'male' | 'female' | 'other' }))}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {editingProfile && (
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleSaveProfile} 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-gray-900 mb-1">Password</p>
                  <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-gray-900 mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Profile</CardTitle>
              <CardDescription>Manage your medical information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={profileData.height}
                      onChange={(e) => setProfileData(prev => ({ ...prev, height: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Current Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => setProfileData(prev => ({ ...prev, weight: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Blood Type</Label>
                  <Select defaultValue={healthData.bloodType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Known Allergies</Label>
                  <div className="flex flex-wrap gap-2">
                    {healthData.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary">
                        {allergy}
                        <X className="w-3 h-3 ml-2 cursor-pointer" />
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">+ Add Allergy</Button>
                  </div>
                </div>

                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Health Profile'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">Data Privacy</p>
                  <p className="text-sm text-gray-600">
                    Your health information is encrypted and stored securely. We never share your personal data without your explicit consent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Goals</CardTitle>
              <CardDescription>Set and track your health objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Goal</Label>
                  <Select 
                    value={profileData.goal}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, goal: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose-weight">Lose Weight</SelectItem>
                      <SelectItem value="gain-weight">Gain Weight</SelectItem>
                      <SelectItem value="build-muscle">Build Muscle</SelectItem>
                      <SelectItem value="maintain-weight">Maintain Weight</SelectItem>
                      <SelectItem value="improve-health">Improve Overall Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Weight (kg)</Label>
                    <Input type="number" placeholder="68" />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Daily Calorie Target</Label>
                  <Input type="number" placeholder="2200" />
                </div>

                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select 
                    value={profileData.activityLevel}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, activityLevel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Update Goals'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'workoutReminders' && 'Get notified about scheduled workouts'}
                        {key === 'mealReminders' && 'Reminders for meal times and logging'}
                        {key === 'progressUpdates' && 'Weekly progress summaries'}
                        {key === 'weeklyReports' && 'Detailed weekly performance reports'}
                        {key === 'motivationalMessages' && 'Daily motivation and tips'}
                        {key === 'communityUpdates' && 'News from the Medifit community'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={async (checked) => {
                        const updated = { ...notifications, [key]: checked };
                        setNotifications(updated);
                        // Save to database
                        try {
                          const response = await userApi.updateProfile({
                            notificationPreferences: updated,
                          });
                          if (response.success) {
                            toast.success('Notification preferences updated');
                          } else {
                            toast.error(response.message || 'Failed to update preferences');
                            // Revert on error
                            setNotifications(notifications);
                          }
                        } catch (error: any) {
                          console.error('Failed to update notification preferences:', error);
                          toast.error(error.message || 'Failed to update preferences');
                          // Revert on error
                          setNotifications(notifications);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>Manage your wearables and fitness trackers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{device.name}</p>
                        <p className="text-sm text-gray-500">Last synced: {device.lastSync}</p>
                      </div>
                    </div>
                    <Badge variant={device.status === 'Connected' ? 'default' : 'secondary'}>
                      {device.status}
                    </Badge>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  + Add New Device
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">Sync Your Data</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Connect your wearable devices to automatically track your activity, heart rate, and sleep patterns.
                  </p>
                  <Button size="sm" variant="outline" className="bg-white">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
