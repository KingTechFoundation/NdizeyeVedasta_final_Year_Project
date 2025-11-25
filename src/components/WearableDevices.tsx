import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Watch,

  Activity,
  Heart,
  Footprints,
  Flame,
  Moon,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
  ChevronRight,

  AlertCircle,
  Battery,
  Zap
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';

interface Device {
  id: string;
  name: string;
  type: 'watch' | 'band' | 'phone';
  brand: string;
  model: string;
  connected: boolean;
  battery: number;
  lastSync: string;
  features: string[];
  icon: typeof Watch;
}

export default function WearableDevices() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'watch',
      brand: 'Apple',
      model: 'Series 9',
      connected: true,
      battery: 78,
      lastSync: '2 minutes ago',
      features: ['Heart Rate', 'Steps', 'Sleep', 'Calories', 'ECG'],
      icon: Watch,
    },
    {
      id: '2',
      name: 'Fitbit Charge 6',
      type: 'band',
      brand: 'Fitbit',
      model: 'Charge 6',
      connected: false,
      battery: 45,
      lastSync: '2 days ago',
      features: ['Heart Rate', 'Steps', 'Sleep', 'Calories'],
      icon: Activity,
    },
  ]);

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncHeartRate: true,
    syncSteps: true,
    syncSleep: true,
    syncCalories: true,
    syncWorkouts: true,
    backgroundSync: true,
  });

  const [syncing, setSyncing] = useState(false);

  const supportedDevices = [
    { name: 'Apple Watch', brand: 'Apple', icon: Watch },
    { name: 'Fitbit', brand: 'Fitbit', icon: Activity },
    { name: 'Garmin', brand: 'Garmin', icon: Watch },
    { name: 'Samsung Galaxy Watch', brand: 'Samsung', icon: Watch },
    { name: 'Xiaomi Mi Band', brand: 'Xiaomi', icon: Activity },
    { name: 'Polar', brand: 'Polar', icon: Heart },
  ];

  const recentSyncData = [
    { metric: 'Heart Rate', value: '72 bpm', time: '2 min ago', icon: Heart, color: 'text-red-600' },
    { metric: 'Steps', value: '8,234', time: '2 min ago', icon: Footprints, color: 'text-blue-600' },
    { metric: 'Calories', value: '1,850 kcal', time: '2 min ago', icon: Flame, color: 'text-orange-600' },
    { metric: 'Sleep', value: '7.5 hours', time: '8 hours ago', icon: Moon, color: 'text-purple-600' },
  ];

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncing(false);

    // Update last sync time
    setDevices(devices.map(device =>
      device.connected
        ? { ...device, lastSync: 'Just now' }
        : device
    ));
  };

  const toggleConnection = (deviceId: string) => {
    setDevices(devices.map(device =>
      device.id === deviceId
        ? { ...device, connected: !device.connected }
        : device
    ));
  };

  const handleSyncToggle = (key: keyof typeof syncSettings) => {
    setSyncSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Wearable Devices</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect and manage your health devices</p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing || !devices.some(d => d.connected)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </Button>
      </div>

      {/* Connected Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <Card key={device.id} className={device.connected ? 'border-2 border-green-200 dark:border-green-800' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full ${device.connected ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                      } flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${device.connected ? 'text-green-600' : 'text-gray-400'
                        }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <CardDescription>{device.brand} • {device.model}</CardDescription>
                    </div>
                  </div>
                  <Badge className={device.connected ? 'bg-green-600' : 'bg-gray-400'}>
                    {device.connected ? (
                      <>
                        <Wifi className="w-3 h-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Battery */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 dark:text-white">{device.battery}%</span>
                      <div className="w-24">
                        <Progress value={device.battery} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Last Sync */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last synced</span>
                    <span className="text-gray-900 dark:text-white">{device.lastSync}</span>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Synced Data</p>
                    <div className="flex flex-wrap gap-2">
                      {device.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant={device.connected ? 'outline' : 'default'}
                      className={`flex-1 ${device.connected
                          ? 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'
                          : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      onClick={() => toggleConnection(device.id)}
                    >
                      {device.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Sync Data */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Data</CardTitle>
          <CardDescription>Latest health metrics from your devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentSyncData.map((data, index) => {
              const Icon = data.icon;
              return (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${data.color}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{data.metric}</span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white mb-1">{data.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{data.time}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
          <CardDescription>Control what data is synced from your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-white">Automatic Sync</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sync data automatically when app is open</p>
              </div>
            </div>
            <Switch
              checked={syncSettings.autoSync}
              onCheckedChange={() => handleSyncToggle('autoSync')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-white">Background Sync</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Keep syncing even when app is in background</p>
              </div>
            </div>
            <Switch
              checked={syncSettings.backgroundSync}
              onCheckedChange={() => handleSyncToggle('backgroundSync')}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">Data Types</p>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Heart Rate</span>
              </div>
              <Switch
                checked={syncSettings.syncHeartRate}
                onCheckedChange={() => handleSyncToggle('syncHeartRate')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Steps & Activity</span>
              </div>
              <Switch
                checked={syncSettings.syncSteps}
                onCheckedChange={() => handleSyncToggle('syncSteps')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Sleep Data</span>
              </div>
              <Switch
                checked={syncSettings.syncSleep}
                onCheckedChange={() => handleSyncToggle('syncSleep')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Calories Burned</span>
              </div>
              <Switch
                checked={syncSettings.syncCalories}
                onCheckedChange={() => handleSyncToggle('syncCalories')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Workouts</span>
              </div>
              <Switch
                checked={syncSettings.syncWorkouts}
                onCheckedChange={() => handleSyncToggle('syncWorkouts')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Device */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Device</CardTitle>
          <CardDescription>Connect a new wearable or fitness tracker</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {supportedDevices.map((device, index) => {
              const Icon = device.icon;
              return (
                <button
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Icon className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-900 dark:text-white text-center">{device.name}</p>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 dark:text-white mb-1">Connection Tips</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Make sure Bluetooth is enabled on your device</li>
                  <li>• Keep your wearable within 10 meters of your phone</li>
                  <li>• Check that your device has sufficient battery</li>
                  <li>• Grant necessary permissions when prompted</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-gray-900 dark:text-white">Device won't connect</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-gray-900 dark:text-white">Data not syncing</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-gray-900 dark:text-white">Reset device connection</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
