'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Building2, ChevronLeft } from 'lucide-react';
import { klima_logo_short } from '@/public';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [screen, setScreen] = useState<'initial' | 'email' | 'otp'>('initial');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const SERVICE_ID = 'service_dbq6s6g';
  const TEMPLATE_ID = 'template_67y2qxr';
  const PUBLIC_KEY = '5c2zkYqEglp1_6mPp';

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

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

      console.log('Sending email with:', { to_email: email, reply_to: email, code });

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          reply_to: email,
          user_email: email,
          email: email,
          code: code,
        },
        PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setScreen('otp');
      setMessage('Code sent! Check your inbox');
    } catch (error: any) {
      console.error('EmailJS failed:', error);
      setMessage('Failed: ' + (error?.text || 'Try again'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (otp === generatedCode) {
      const userData = {
        email,
        name: email.split('@')[0],
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      // Save to localStorage (for your app to use on the client)
      localStorage.setItem('klimaUser', JSON.stringify(userData));

      // Save to cookie (so middleware can protect all routes)
      document.cookie = `klimaUser=${JSON.stringify(userData)}; path=/; max-age=31536000; SameSite=Lax`;

      setMessage('Welcome! Redirecting...');

      setTimeout(() => {
        router.push('/platform');
      }, 800);
    } else {
      setMessage('Wrong code. Try again.');
      setOtp('');
    }
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
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
        )}

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src={klima_logo_short} alt="Klima" width={40} height={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Klima Harvest</h1>
          <p className="text-gray-600 mt-2">
            {screen === 'initial' && 'Log in or Sign up in seconds'}
            {screen === 'email' && 'Enter your email to continue'}
            {screen === 'otp' && 'Check your email'}
          </p>
        </div>

        {screen === 'initial' && (
          <>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-gray-50 mb-3">
              <div className="w-5 h-5 bg-[url('https://www.google.com/favicon.ico')] bg-cover" />
              Continue with Google
            </button>

            <button
              onClick={() => setScreen('email')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-gray-50 mb-6"
            >
              <Mail className="w-5 h-5" /> Continue with email
            </button>

            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-gray-50">
              <Building2 className="w-5 h-5" /> Sign up with work email
            </button>
          </>
        )}

        {screen === 'email' && (
          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-teal-500"
              autoFocus
            />

            <button
              onClick={handleSendCode}
              disabled={isLoading || !email.includes('@')}
              className="w-full py-3 bg-[#E3FCEF] text-gray-800 font-medium rounded-xl hover:bg-[#d0fce8] disabled:opacity-50 disabled:cursor-not-allowed transition"
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

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full text-center text-3xl font-bold tracking-widest border rounded-xl py-4 focus:outline-none focus:border-teal-500"
              autoFocus
            />

            <button
              onClick={handleVerifyCode}
              disabled={otp.length !== 6}
              className="w-full py-3 bg-[#E3FCEF] text-gray-800 font-medium rounded-xl hover:bg-[#d0fce8] disabled:opacity-50 transition"
            >
              Confirm & Log in
            </button>

            <button
              onClick={handleSendCode}
              className="text-teal-600 text-sm hover:underline block mx-auto"
            >
              Resend code
            </button>
          </div>
        )}

        {message && (
          <p
            className={`text-center text-sm mt-4 font-medium ${
              message.includes('sent') || message.includes('Welcome')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {screen === 'initial' && (
          <p className="text-xs text-center text-gray-500 mt-8">
            By continuing, you agree to Klima’s{' '}
            <a href="#" className="text-teal-600 hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}