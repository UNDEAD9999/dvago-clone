'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      setLoading(true);
      setErrorMsg('');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid authentication credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Auth redirect failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-16 flex items-center justify-center text-left">
      <div className="w-full max-w-md px-4">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#70B33C] uppercase tracking-wider mb-6 transition">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center">
            <span className="text-3xl font-black text-[#70B33C] tracking-tight block">DVAGO</span>
            <h2 className="text-lg font-black text-gray-800 tracking-tight uppercase mt-2">Account Login</h2>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button 
            type="button" onClick={handleGoogleLogin} disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.99 1 12 1 7.35 1 3.37 3.68 1.41 7.59l3.77 2.93c.9-2.69 3.43-4.48 6.82-4.48z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.97 3.7-8.62z"/>
              <path fill="#FBBC05" d="M5.18 14.68c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.41 7.17C.51 8.97 0 10.97 0 13s.51 4.03 1.41 5.83l3.77-3.15z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.52 1.18-4.23 1.18-3.39 0-5.92-1.79-6.82-4.48L1.41 17c1.96 3.91 5.94 6.59 10.59 6.59z"/>
            </svg>
            Continue with Google Account
          </button>

          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-100 after:flex-1 after:border-t after:border-gray-100 text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest px-2 gap-3">
            Or Use Credentials
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                <input 
                  type="email" required placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={16} /></span>
                <input 
                  type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#70B33C] hover:bg-[#5f9932] disabled:bg-gray-300 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition border-none outline-none cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-gray-50 pt-4 text-center">
            <p className="text-xs font-bold text-gray-400">
              New here? <Link href="/signup" className="text-[#70B33C] font-black hover:underline">Create an Account</Link>
            </p>
          </div>

          <div className="flex items-center gap-2 justify-center text-gray-400 text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-gray-50">
            <ShieldCheck size={14} className="text-[#70B33C]" />
            <span>Secure Verification Gate</span>
          </div>
        </div>

      </div>
    </div>
  );
}