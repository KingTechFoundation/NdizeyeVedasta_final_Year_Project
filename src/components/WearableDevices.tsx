import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Watch,
  Activity,
  Heart,
  Footprints,
  Moon,
  Wifi,
  WifiOff,
  RefreshCw,
  Battery,
  AlertCircle
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { deviceApi, type Device } from '../services/api';
import { toast } from 'sonner';
import WearableDevicesSkeleton from './WearableDevicesSkeleton';

export default function WearableDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncHeartRate: true,
    syncSteps: true,
    syncSleep: true,
    syncCalories: true,
    syncWorkouts: true,
    backgroundSync: true,
  });

  const supportedDevices = [
    { name: 'Apple Watch', brand: 'Apple', icon: Watch, type: 'apple-watch' },
    { name: 'Fitbit', brand: 'Fitbit', icon: Activity, type: 'fitbit' },
    { name: 'Garmin', brand: 'Garmin', icon: Watch, type: 'garmin' },
    { name: 'Samsung Health', brand: 'Samsung', icon: Watch, type: 'samsung-health' },
    { name: 'Google Fit', brand: 'Google', icon: Activity, type: 'google-fit' },
    { name: 'Other Device', brand: 'Other', icon: Watch, type: 'other' },
  ];

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const response = await deviceApi.getDevices();
      if (response.success && response.data) {
        setDevices(response.data.devices);
      }
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      toast.error('Failed to load devices');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async (deviceId: string) => {
    setIsSyncing(deviceId);
    try {
      // Generate some realistic dummy data to sync
      const steps = Math.floor(Math.random() * 5000) + 5000;
      const sleep = 6 + Math.random() * 3;
      const heartRate = 60 + Math.floor(Math.random() * 40);
      const weight = 65 + Math.random() * 15;

      const response = await deviceApi.syncDevice(deviceId, {
        steps,
        sleep,
        heartRate,
        weight,
      });

      if (response.success) {
        toast.success(`Sync successful! ${steps} steps synced.`);
        fetchDevices();
      }
    } catch (error) {
      toast.error('Sync failed');
    } finally {
      setIsSyncing(null);
    }
  };

  const handleConnect = async (type: string, name: string) => {
    try {
      const deviceId = `dev_${Math.random().toString(36).substr(2, 9)}`;
      const response = await deviceApi.connectDevice({
        name,
        type: type as any,
        deviceId: deviceId,
        accessToken: 'mock_token_' + Date.now(),
      });

      if (response.success) {
        toast.success(`${name} connected!`);
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to connect device');
    }
  };

  const handleDisconnect = async (deviceId: string) => {
    try {
      const response = await deviceApi.disconnectDevice(deviceId);
      if (response.success) {
        toast.success('Device disconnected');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to disconnect');
    }
  };

  const handleSyncToggle = (key: keyof typeof syncSettings) => {
    setSyncSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return <WearableDevicesSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Wearable Devices</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect and manage your health devices</p>
        </div>
        <Button
          onClick={() => devices[0] && handleSync(devices[0]._id)}
          disabled={isSyncing !== null || devices.length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync All'}
        </Button>
      </div>

      {/* Connected Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((device) => {
          const isCurrentSyncing = isSyncing === device._id;
          return (
            <Card key={device._id} className={device.isConnected ? 'border-2 border-blue-200 dark:border-blue-800' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full ${device.isConnected ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'
                      } flex items-center justify-center`}>
                      <Watch className={`w-7 h-7 ${device.isConnected ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <CardDescription className="capitalize">{device.type.replace('-', ' ')}</CardDescription>
                    </div>
                  </div>
                  <Badge className={device.isConnected ? 'bg-green-600' : 'bg-gray-400'}>
                    {device.isConnected ? (
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
                  {/* Battery - Simulated */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 dark:text-white">85%</span>
                      <div className="w-24">
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Last Sync */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last synced</span>
                    <span className="text-gray-900 dark:text-white">
                      {device.lastSynced ? new Date(device.lastSynced).toLocaleString() : 'Never'}
                    </span>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleSync(device._id)}
                      disabled={isSyncing !== null}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isCurrentSyncing ? 'animate-spin' : ''}`} />
                      Sync
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => handleDisconnect(device._id)}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {devices.length === 0 && (
          <Card className="border-dashed border-2 flex items-center justify-center p-12 col-span-full">
            <div className="text-center">
              <Watch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No devices connected</p>
              <Button variant="outline" onClick={() => document.getElementById('add-device-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Connect a Device
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
          <CardDescription>Control what data is synced from your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Types</p>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-900 dark:text-white">Heart Rate</span>
              </div>
              <Switch
                checked={syncSettings.syncHeartRate}
                onCheckedChange={() => handleSyncToggle('syncHeartRate')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-900 dark:text-white">Steps & Activity</span>
              </div>
              <Switch
                checked={syncSettings.syncSteps}
                onCheckedChange={() => handleSyncToggle('syncSteps')}
              />
            </div>

            <div className="flex items-center justify-between pl-4">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-900 dark:text-white">Sleep Data</span>
              </div>
              <Switch
                checked={syncSettings.syncSleep}
                onCheckedChange={() => handleSyncToggle('syncSleep')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Device Section */}
      <Card id="add-device-section">
        <CardHeader>
          <CardTitle>Add New Device</CardTitle>
          <CardDescription>Select your device brand to connect</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {supportedDevices.map((device, index) => {
              const Icon = device.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleConnect(device.type, device.name)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <Icon className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-2 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-gray-900 dark:text-white text-center font-medium">{device.name}</p>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Before you connect</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ensure your device is turned on, has Bluetooth enabled, and is close to your computer.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
