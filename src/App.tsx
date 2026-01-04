import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import OnboardingFlow from './components/OnboardingFlow';
import MainLayout from './components/MainLayout';
import VerifyEmail from './components/VerifyEmail';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { useAuth } from './contexts/AuthContext';

type AppState = 'home' | 'login' | 'signup' | 'verify-email' | 'onboarding' | 'app';

export default function App() {
  const { logout, user, isLoading, isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>('home');
  const [verifyEmail, setVerifyEmail] = useState<string>('');

  // Handle routing based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // User is logged in - check if onboarding is completed
        if (user.onboardingCompleted) {
          setAppState('app');
        } else {
          setAppState('onboarding');
        }
      } else {
        // User is not logged in - stay on home or current page
        if (appState === 'app' || appState === 'onboarding') {
          setAppState('home');
        }
      }
    }
  }, [isAuthenticated, user, isLoading, appState]);

  const handleLoginComplete = () => {
    // After login, check onboarding status
    // The useEffect will handle the redirect based on user state
  };

  const handleSignupComplete = (email: string) => {
    // After signup, redirect to email verification
    setVerifyEmail(email);
    setAppState('verify-email');
  };

  const handleEmailVerified = () => {
    // After email verification, redirect to login
    setAppState('login');
  };

  const handleOnboardingComplete = () => {
    // After onboarding, redirect to app
    setAppState('app');
  };

  const handleLogout = () => {
    logout();
    setAppState('home');
  };

  const handleGoToSignup = () => {
    setAppState('signup');
  };

  const handleGoToLogin = () => {
    setAppState('login');
  };

  const renderContent = () => {
    // Show loading state while checking auth
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    switch (appState) {
      case 'home':
        return (
          <HomePage
            onLoginClick={handleGoToLogin}
            onSignupClick={handleGoToSignup}
          />
        );
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
      case 'verify-email':
        return (
          <VerifyEmail
            email={verifyEmail}
            onVerified={handleEmailVerified}
            onBack={handleGoToLogin}
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
      {renderContent()}
      <Toaster />
    </ThemeProvider>
  );
}
