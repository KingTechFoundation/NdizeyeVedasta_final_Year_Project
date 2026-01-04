import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, RefreshCw } from 'lucide-react';
import { otpApi } from '../services/api';
import { toast } from 'sonner';

interface VerifyEmailProps {
  email: string;
  onVerified: () => void;
  onBack?: () => void;
}

export default function VerifyEmail({ email, onVerified, onBack }: VerifyEmailProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input
  useEffect(() => {
    const firstInput = document.getElementById('otp-0');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{1,6}$/.test(pastedData)) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedData[i] || '';
      }
      setCode(newCode);
      // Focus last filled input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      const lastInput = document.getElementById(`otp-${lastIndex}`);
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = code.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await otpApi.verifyOTP(email, otpCode);
      if (response.success) {
        toast.success('Email verified successfully!');
        onVerified();
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed. Please try again.';
      toast.error(errorMessage);
      // Clear code on error
      setCode(['', '', '', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      if (firstInput) {
        firstInput.focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await otpApi.resendOTP(email);
      if (response.success) {
        toast.success('Verification code resent to your email');
        setCountdown(60); // 60 second countdown
        setCode(['', '', '', '', '', '']);
        const firstInput = document.getElementById('otp-0');
        if (firstInput) {
          firstInput.focus();
        }
      } else {
        throw new Error(response.message || 'Failed to resend code');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend code. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to
              <br />
              <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <Label>Enter Verification Code</Label>
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-semibold"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || code.join('').length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>

            {/* Resend Code */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending || countdown > 0}
                className="text-blue-600 hover:text-blue-700"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  `Resend in ${countdown}s`
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>

            {/* Back Button */}
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="w-full"
                disabled={isLoading}
              >
                Back to Login
              </Button>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Check your spam folder if you don't see the email.
          <br />
          The code will expire in 10 minutes.
        </p>
      </div>
    </div>
  );
}

