'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Building2, ChevronLeft } from 'lucide-react';
import { klima_logo_long, klima_logo_short } from '@/public';
import { useRouter } from 'next/navigation';
import { signIn, useSession, getSession } from 'next-auth/react';

export default function Auth() {
  const [screen, setScreen] = useState<'initial' | 'email' | 'otp'>('initial');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const SERVICE_ID = 'service_dbq6s6g';
  const TEMPLATE_ID = 'template_67y2qxr';
  const PUBLIC_KEY = '5c2zkYqEglp1_6mPp';

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const saveUserToStorage = (userData: any) => {
    const data = {
      ...userData,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };
    const json = JSON.stringify(data);
    localStorage.setItem('klimaUser', json);
    document.cookie = `klimaUser=${json}; path=/; max-age=31536000; SameSite=Lax`;
  };

  // Clear all Auth.js related cookies
  const clearAuthCookies = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      // Clear all auth-related cookies
      if (cookieName.includes('authjs') || 
          cookieName.includes('next-auth') || 
          cookieName.includes('session')) {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setMessage('');
      clearAuthCookies();
      
      // Clear localStorage just to be safe
      localStorage.removeItem('klimaUser');
      
      // Sign in with Google - let it redirect normally
      // The callbackUrl will handle the redirect after successful login
      await signIn('google', {
        callbackUrl: '/platform',
        redirect: true, // Changed to true for OAuth providers
      });
      
      // Note: After signIn with redirect: true, the page will redirect to Google
      // and then back to your callback handler
    } catch (error) {
      console.error('Google sign-in error:', error);
      setMessage('Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  // Handle session changes
  useEffect(() => {
    const handleAuth = async () => {
      if (status === 'loading') return;
      
      if (status === 'authenticated' && session?.user) {
        const userEmail = session.user.email;
        if (!userEmail) return;
        
        // Check if already logged in with this provider
        const existing = localStorage.getItem('klimaUser');
        if (existing) {
          try {
            const parsed = JSON.parse(existing);
            if (parsed.email === userEmail && parsed.provider === 'google') {
              router.push('/platform');
              return;
            }
          } catch (e) {
            // If parsing fails, continue with new login
          }
        }
        
        // Save new Google user
        saveUserToStorage({
          email: userEmail,
          name: session.user.name || userEmail.split('@')[0],
          image: session.user.image || null,
          provider: 'google',
        });
        
        // Optional: Force a small delay to ensure storage is written
        setTimeout(() => {
          router.push('/platform');
        }, 100);
      }
    };
    
    handleAuth();
  }, [session, status, router]);

  // Check for existing session on component mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          // If we have a session but no localStorage entry, create one
          const existing = localStorage.getItem('klimaUser');
          if (!existing && session.user.email) {
            saveUserToStorage({
              email: session.user.email,
              name: session.user.name || session.user.email.split('@')[0],
              image: session.user.image || null,
              provider: 'google',
            });
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkExistingSession();
  }, []);

  const handleSendCode = async () => {
    if (!email.trim() || !email.includes('@')) {
      setMessage('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setMessage('');
    const code = generateCode();
    setGeneratedCode(code);

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { to_email: email, code }, PUBLIC_KEY);
      setScreen('otp');
      setMessage('Code sent! Check your inbox');
    } catch (error) {
      console.error('EmailJS failed:', error);
      setMessage('Failed to send code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (otp !== generatedCode) {
      setMessage('Wrong code. Try again.');
      setOtp('');
      return;
    }

    saveUserToStorage({
      email,
      name: email.split('@')[0],
      image: null,
      provider: 'email',
    });

    setMessage('Welcome! Redirecting...');
    setTimeout(() => router.push('/platform'), 800);
  };

  const handleBack = () => {
    setMessage('');
    setOtp('');
    if (screen === 'otp') setScreen('email');
    if (screen === 'email') {
      setScreen('initial');
      setEmail('');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image src="/images/authbg.png" alt="Background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4">
        {screen !== 'initial' && (
          <button onClick={handleBack} className="mb-6 flex items-center justify-center gap-4 text-gray-600 hover:text-gray-900 transition">
            <span className='w-fit h-fit p-1.5 border border-gray-200 rounded-full cursor-pointer'><ChevronLeft size={18} /></span> <p>Back</p>
          </button>
        )}

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src={klima_logo_long} alt="Klima" width={200} />
          </div>
          {/* <h1 className="text-2xl font-bold text-gray-900">Klima Harvest</h1> */}
          <p className="text-gray-600 mt-2">
            {screen === 'initial' && 'Log in or Sign up in seconds'}
            {screen === 'email' && 'Enter your email address and we will send a one-time link'}
            {screen === 'otp' && 'Check your email'}
          </p>
        </div>

        {screen === 'initial' && (
          <>
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#F9F9F9] border border-gray-200 rounded-xl hover:bg-gray-50 mb-3 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                'Connecting to Google...'
              ) : (
                <>
                  <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
                  Continue with Google
                </>
              )}
            </button>

            <button
              onClick={() => setScreen('email')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#F9F9F9] border border-gray-200 rounded-xl hover:bg-gray-50 mb-6 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" /> Continue with email
            </button>

            {/* <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-gray-50 transition-colors font-medium">
              <Building2 className="w-5 h-5" /> Sign up with work email
            </button> */}
          </>
        )}

        {screen === 'email' && (
          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-500"
              autoFocus
            />
            <button
              onClick={handleSendCode}
              disabled={isLoading || !email.includes('@')}
              className="w-full py-3 bg-[#E3FCEF] text-gray-800 font-medium rounded-xl hover:bg-[#d0f8e4] 
              disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {isLoading ? 'Sending...' : 'Send code'}
            </button>
          </div>
        )}

        {screen === 'otp' && (
          <div className="space-y-6">
            <p className="text-sm text-center text-gray-600">
              We sent a code to <strong>{email}</strong>
            </p>
            <div className="flex justify-center gap-3">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ''}
                  autoFocus={index === 0}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');

                    if (!value) return;

                    const newOtp = otp.split('');
                    newOtp[index] = value;
                    setOtp(newOtp.join('').slice(0, 6));

                    // Auto focus next box
                    const next = document.getElementById(`otp-${index + 1}`);
                    next?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      const newOtp = otp.split('');
                      newOtp[index] = '';
                      setOtp(newOtp.join(''));

                      // Focus previous
                      const prev = document.getElementById(`otp-${index - 1}`);
                      prev?.focus();
                    }
                  }}
                  id={`otp-${index}`}
                  className="w-12 h-14 text-center text-2xl text-gray-500 font-medium border border-gray-200 rounded-xl focus:outline-none focus:border-gray-500"
                />
              ))}
          </div>

            <button
              onClick={handleVerifyCode}
              disabled={otp.length !== 6}
              className="w-full py-3 bg-[#E3FCEF] text-gray-800 font-medium rounded-xl hover:bg-[#d0f8e4] disabled:opacity-50 transition cursor-pointer"
            >
              Confirm & Log in
            </button>
            <button
              onClick={handleSendCode}
              disabled={isLoading}
              className="text-gray-600 text-sm hover:underline block mx-auto"
            >
              {isLoading ? 'Resending...' : 'Resend code'}
            </button>
          </div>
        )}

        {message && (
          <p className={`text-center text-sm mt-4 font-medium ${message.includes('sent') || message.includes('Welcome') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {screen === 'initial' && (
          <p className="text-xs text-center text-gray-500 mt-8">
            By continuing, you agree to Klima’s{' '}
            <a href="#" className="text-teal-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
}