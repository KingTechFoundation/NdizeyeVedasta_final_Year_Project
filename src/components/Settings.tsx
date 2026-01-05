import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import {
  Bell,
  Lock,
  User,
  Globe,
  Moon,
  Smartphone,
  Mail,
  Shield,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Database,
  Share2,
  AlertCircle,
  Watch,
  RefreshCw,
  Check,
  Plus,
  Activity,
  Heart
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Badge } from './ui/badge';
import { deviceApi, type Device } from '../services/api';
import { toast } from 'sonner';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    hydrationAlerts: true,
    progressReports: true,
    challengeUpdates: true,
    communityActivity: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: 'friends',
    showProfile: true,
    showWorkouts: true,
    showMeals: false,
    allowMessages: true,
    dataSharing: false,
    researchParticipation: false,
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoadingDevices(true);
    try {
      const response = await deviceApi.getDevices();
      if (response.success && response.data) {
        setDevices(response.data.devices);
      }
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    } finally {
      setIsLoadingDevices(false);
    }
  };

  const handleConnectDevice = async () => {
    const deviceName = window.prompt('Enter device name:');
    if (!deviceName) return;

    const deviceTypes = ['apple-watch', 'fitbit', 'garmin', 'samsung-health', 'google-fit', 'other'];
    const deviceType = window.prompt(
      `Enter device type (${deviceTypes.join(', ')}):`,
      'fitbit'
    );
    if (!deviceType || !deviceTypes.includes(deviceType as any)) {
      toast.error('Invalid device type');
      return;
    }

    const deviceId = `device_${Date.now()}`;
    const accessToken = `token_${Math.random().toString(36).substring(7)}`;

    try {
      const response = await deviceApi.connectDevice({
        name: deviceName,
        type: deviceType as Device['type'],
        deviceId,
        accessToken,
      });

      if (response.success) {
        toast.success('Device connected successfully!');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to connect device');
    }
  };

  const handleSyncDevice = async (deviceId: string) => {
    setIsSyncing(deviceId);
    try {
      const steps = Math.floor(Math.random() * 5000) + 5000; // Random 5000-10000
      const sleep = Math.floor(Math.random() * 3) + 6; // Random 6-9 hours
      const weight = 70 + Math.random() * 10; // Random 70-80 kg

      const response = await deviceApi.syncDevice(deviceId, {
        steps,
        sleep,
        weight,
      });

      if (response.success) {
        toast.success(`Synced! ${steps} steps, ${sleep}h sleep, ${weight.toFixed(1)}kg`);
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to sync device');
    } finally {
      setIsSyncing(null);
    }
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    if (!window.confirm('Are you sure you want to disconnect this device?')) return;

    try {
      const response = await deviceApi.disconnectDevice(deviceId);
      if (response.success) {
        toast.success('Device disconnected');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to disconnect device');
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    if (typeof privacy[key] === 'boolean') {
      setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="w-4 h-4 mr-2" />
            Devices
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Globe className="w-4 h-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Vedaste" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Ndizeye" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="veda@gmail.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+250 788 123 456" />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password regularly for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type={showPassword ? 'text' : 'password'} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">Delete Account</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Devices</CardTitle>
                  <CardDescription>Manage your wearable fitness trackers</CardDescription>
                </div>
                <Button onClick={handleConnectDevice} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Device
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingDevices ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : devices.length > 0 ? (
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div
                      key={device._id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Watch className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {device.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="capitalize">
                              {device.type.replace('-', ' ')}
                            </Badge>
                            {device.lastSynced && (
                              <span className="text-xs text-gray-500">
                                Last synced: {new Date(device.lastSynced).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSyncDevice(device._id)}
                          disabled={isSyncing === device._id}
                        >
                          <RefreshCw
                            className={`w-4 h-4 mr-2 ${isSyncing === device._id ? 'animate-spin' : ''
                              }`}
                          />
                          {isSyncing === device._id ? 'Syncing...' : 'Sync Now'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDisconnectDevice(device._id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/10 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No devices connected yet.
                  </p>
                  <Button variant="outline" onClick={handleConnectDevice}>
                    <Plus className="w-4 h-4 mr-2" />
                    Connect your first device
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Control what data gets synced automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Automatic Sync</p>
                  <p className="text-sm text-gray-500">Sync data in the background</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-4">
                {[
                  { label: 'Steps & Activity', icon: Activity },
                  { label: 'Sleep Data', icon: Moon },
                  { label: 'Weight & Body Composition', icon: Database },
                  { label: 'Heart Rate', icon: Heart },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">{item.label}</span>
                    </div>
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Reminders</CardTitle>
              <CardDescription>Get reminders for your health activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Workout Reminders</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remind me of scheduled workouts</p>
                </div>
                <Switch
                  checked={notifications.workoutReminders}
                  onCheckedChange={() => handleNotificationToggle('workoutReminders')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Meal Reminders</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notify me when it's time to eat</p>
                </div>
                <Switch
                  checked={notifications.mealReminders}
                  onCheckedChange={() => handleNotificationToggle('mealReminders')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Hydration Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remind me to drink water</p>
                </div>
                <Switch
                  checked={notifications.hydrationAlerts}
                  onCheckedChange={() => handleNotificationToggle('hydrationAlerts')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Weekly Progress Reports</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Summary of your weekly achievements</p>
                </div>
                <Switch
                  checked={notifications.progressReports}
                  onCheckedChange={() => handleNotificationToggle('progressReports')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community & Social</CardTitle>
              <CardDescription>Notifications from the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Challenge Updates</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Updates on challenges you've joined</p>
                </div>
                <Switch
                  checked={notifications.challengeUpdates}
                  onCheckedChange={() => handleNotificationToggle('challengeUpdates')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Community Activity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comments, likes, and shares on your posts</p>
                </div>
                <Switch
                  checked={notifications.communityActivity}
                  onCheckedChange={() => handleNotificationToggle('communityActivity')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white mb-1">Important Notice</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Medifit AI is not designed for collecting personally identifiable information (PII) or securing sensitive health data.
                    All data is stored locally and used only to enhance your experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>Control who can see your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Who can see my progress?</Label>
                <Select
                  value={privacy.shareProgress}
                  onValueChange={(value) => setPrivacy(prev => ({ ...prev, shareProgress: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private (Only Me)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Show Profile in Community</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to find and view your profile</p>
                </div>
                <Switch
                  checked={privacy.showProfile}
                  onCheckedChange={() => handlePrivacyToggle('showProfile')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Show Workout History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display your workouts on your profile</p>
                </div>
                <Switch
                  checked={privacy.showWorkouts}
                  onCheckedChange={() => handlePrivacyToggle('showWorkouts')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Show Meal Plans</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display your meals on your profile</p>
                </div>
                <Switch
                  checked={privacy.showMeals}
                  onCheckedChange={() => handlePrivacyToggle('showMeals')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">Allow Direct Messages</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Let community members message you</p>
                </div>
                <Switch
                  checked={privacy.allowMessages}
                  onCheckedChange={() => handlePrivacyToggle('allowMessages')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Control how your data is used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Anonymous Data Sharing</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Help improve the app by sharing anonymized usage data
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.dataSharing}
                  onCheckedChange={() => handlePrivacyToggle('dataSharing')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Research Participation</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Opt-in to health research studies (fully anonymized)
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.researchParticipation}
                  onCheckedChange={() => handlePrivacyToggle('researchParticipation')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Export Your Data</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Download all your health and fitness data
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Clear All Data</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Remove all locally stored data from this device
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Clear Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Units & Measurements</CardTitle>
              <CardDescription>Choose your preferred units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Distance</Label>
                <Select defaultValue="metric">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Kilometers (km)</SelectItem>
                    <SelectItem value="imperial">Miles (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Weight</Label>
                <Select defaultValue="kg">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Temperature</Label>
                <Select defaultValue="celsius">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="rw">Kinyarwanda</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="cat">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="dmy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <Badge variant="secondary">1.0.0</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Build</span>
                <Badge variant="secondary">2025.11.12</Badge>
              </div>
              <Button variant="outline" className="w-full">Check for Updates</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
