import { useState } from 'react';
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
  X
} from 'lucide-react';

export default function ProfileManagement() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ndizeye Vedaste',
    email: 'veda@example.com',
    phone: '+250 788 123 456',
    age: '28',
    gender: 'male',
    height: '175',
    weight: '70.5',
    goal: 'lose-weight',
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

  const handleSaveProfile = () => {
    setEditingProfile(false);
    // Save logic here
  };

  const handleCancelEdit = () => {
    setEditingProfile(false);
    // Reset to original values
  };

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
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
                <Badge className="bg-blue-600">Premium Member</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-lg text-gray-900">{profileData.age} years</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-lg text-gray-900">{profileData.height} cm</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-lg text-gray-900">{profileData.weight} kg</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">BMI</p>
                  <p className="text-lg text-gray-900">23.0</p>
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
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
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
                      disabled={!editingProfile}
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
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, gender: value }))}
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
                    <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
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

                <Button className="bg-blue-600 hover:bg-blue-700">Save Health Profile</Button>
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
                      <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="improve-health">Improve Overall Health</SelectItem>
                      <SelectItem value="athletic">Athletic Performance</SelectItem>
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
                  <Label>Weekly Workout Goal</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days per week</SelectItem>
                      <SelectItem value="4">4 days per week</SelectItem>
                      <SelectItem value="5">5 days per week</SelectItem>
                      <SelectItem value="6">6 days per week</SelectItem>
                      <SelectItem value="7">7 days per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Update Goals</Button>
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
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [key]: checked }))
                      }
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
