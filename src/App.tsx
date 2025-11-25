import { useState } from 'react';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import OnboardingFlow from './components/OnboardingFlow';
import MainLayout from './components/MainLayout';
import PrototypeGuide from './components/PrototypeGuide';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Activity, ChevronLeft } from 'lucide-react';

type AppState = 'home' | 'guide' | 'login' | 'signup' | 'onboarding' | 'app';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [showScreenSelector, setShowScreenSelector] = useState(true);

  const handleLoginComplete = () => {
    setAppState('app');
  };

  const handleSignupComplete = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppState('app');
  };

  const handleLogout = () => {
    setAppState('home');
  };

  const handleGoToSignup = () => {
    setAppState('signup');
  };

  const handleGoToLogin = () => {
    setAppState('login');
  };

  const renderContent = () => {
    switch (appState) {
      case 'home':
        return (
          <HomePage
            onLoginClick={handleGoToLogin}
            onSignupClick={handleGoToSignup}
          />
        );
      case 'guide':
        return <PrototypeGuide />;
      case 'login':
        return (
          <LoginPage
            onComplete={handleLoginComplete}
            onSignupClick={handleGoToSignup}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onComplete={handleSignupComplete}
            onLoginClick={handleGoToLogin}
          />
        );
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'app':
        return <MainLayout onLogout={handleLogout} />;
      default:
        return (
          <HomePage
            onLoginClick={handleGoToLogin}
            onSignupClick={handleGoToSignup}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      {/* Screen Selector for Prototype Demo */}
      {showScreenSelector && (
        <div className='fixed top-4 right-4 z-[100] flex items-center gap-2'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center gap-3 border border-gray-200 dark:border-gray-700'>
            <Activity className='w-5 h-5 text-blue-600' />
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              Screen:
            </span>
            <Select
              value={appState}
              onValueChange={(value: AppState) => setAppState(value)}
            >
              <SelectTrigger className='w-[200px] h-9'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='home'>Homepage</SelectItem>
                <SelectItem value='guide'>Overview Guide</SelectItem>
                <SelectItem value='login'>1a. Login</SelectItem>
                <SelectItem value='signup'>1b. Signup</SelectItem>
                <SelectItem value='onboarding'>2. Onboarding</SelectItem>
                <SelectItem value='app'>3. Main App</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowScreenSelector(false)}
              className='h-9'
            >
              Hide
            </Button>
          </div>
        </div>
      )}

      {/* Show selector button when hidden */}
      {!showScreenSelector && (
        <button
          onClick={() => setShowScreenSelector(true)}
          className='fixed top-4 right-4 z-[100] bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors'
          title='Show screen selector'
        >
          <Activity className='w-5 h-5' />
        </button>
      )}

      {/* Back to Home Button */}
      {appState !== 'home' && appState !== 'guide' && (
        <button
          onClick={() => setAppState('home')}
          className='fixed bottom-4 right-4 z-[100] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2'
        >
          <ChevronLeft className='w-4 h-4' />
          Back to Home
        </button>
      )}

      {renderContent()}
      <Toaster />
    </ThemeProvider>
  );
}
