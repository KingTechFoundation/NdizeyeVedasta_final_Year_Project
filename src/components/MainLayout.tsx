import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import { NavigationProvider } from '../contexts/NavigationContext';
import {
  Activity,
  LayoutDashboard,
  Dumbbell,
  Apple,
  LineChart,
  Bot,
  BookOpen,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import Dashboard from './Dashboard';
import WorkoutPlans from './WorkoutPlans';
import MealPlans from './MealPlans';
import HealthTracker from './HealthTracker';
import AIChatbot from './AIChatbot';
import Analytics from './Analytics';
import EducationalResources from './EducationalResources';
import ProfileManagement from './ProfileManagement';
import { Badge } from './ui/badge';

interface MainLayoutProps {
  onLogout: () => void;
}

export default function MainLayout({ onLogout }: MainLayoutProps) {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardKey, setDashboardKey] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const prevActiveViewRef = useRef('dashboard');

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'meals', label: 'Meals', icon: Apple },
    { id: 'tracker', label: 'Health Tracker', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'coach', label: 'AI Coach', icon: Bot },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Refresh dashboard when user navigates to it
  useEffect(() => {
    if (activeView === 'dashboard' && prevActiveViewRef.current !== 'dashboard') {
      setDashboardKey((prev: number) => prev + 1);
    }
    prevActiveViewRef.current = activeView;
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard key={`dashboard-${dashboardKey}`} />;
      case 'workouts':
        return <WorkoutPlans />;
      case 'meals':
        return <MealPlans />;
      case 'tracker':
        return <HealthTracker />;
      case 'analytics':
        return <Analytics />;
      case 'coach':
        return <AIChatbot />;
      case 'resources':
        return <EducationalResources />;
      case 'profile':
        return <ProfileManagement />;
      default:
        return <Dashboard key={`dashboard-${dashboardKey}`} />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex'>
      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        <div className='h-full flex flex-col'>
          {/* Logo */}
          <div className='h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-2'>
              <Activity className='w-8 h-8 text-blue-600' />
              <span className='text-xl text-gray-900 dark:text-white'>
                Medifit AI
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className='lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
            >
              <X className='w-5 h-5 text-gray-600 dark:text-gray-300' />
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 overflow-y-auto'>
            <div className='space-y-1'>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors text-left
                      ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon className='w-5 h-5' />
                    <span>{item.label}</span>
                    {item.id === 'coach' && (
                      <Badge className='ml-auto bg-purple-600'>AI</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile Section */}
          <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer'>
              <Avatar className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600'>
                <AvatarFallback className='text-white'>
                  {user?.fullName
                    ?.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-gray-900 dark:text-white truncate'>
                  {user?.fullName || 'User'}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <Button
              variant='outline'
              className='w-full mt-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-gray-700'
              onClick={onLogout}
            >
              <LogOut className='w-4 h-4 mr-2' />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Header */}
        <header className='h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          >
            <Menu className='w-6 h-6 text-gray-600 dark:text-gray-300' />
          </button>

          <div className='flex items-center gap-4 ml-auto'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='relative'
              title={
                theme === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
            >
              {theme === 'light' ? (
                <Moon className='w-5 h-5 text-gray-600' />
              ) : (
                <Sun className='w-5 h-5 text-gray-300' />
              )}
            </Button>

            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='w-5 h-5 text-gray-600 dark:text-gray-300' />
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            </Button>

            <Avatar className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 lg:hidden'>
              <AvatarFallback className='text-white text-sm'>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 overflow-y-auto p-4 lg:p-8'>
          <NavigationProvider navigateTo={setActiveView}>
            {renderView()}
          </NavigationProvider>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
