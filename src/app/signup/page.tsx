'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignupRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setErrorMsg('');
      setSuccess(false);

      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      setSuccess(true);
      setEmail('');
      setPassword('');
      alert('Registration successful! Please check your email inbox to verify your account.');
      router.push('/login');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-16 flex items-center justify-center text-left">
      <div className="w-full max-w-md px-4">
        
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#70B33C] uppercase tracking-wider mb-6 transition">
          <ArrowLeft size={14} /> Back to Login Panel
        </Link>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center">
            <span className="text-3xl font-black text-[#70B33C] tracking-tight block">DVAGO</span>
            <h2 className="text-lg font-black text-gray-800 tracking-tight uppercase mt-2">Create New Account</h2>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-bold">
              Verification link dispatched to your inbox!
            </div>
          )}

          <form onSubmit={handleSignupRegistration} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                <input 
                  type="email" required placeholder="name@domain.com" value={email} onChange={(e)=>setEmail(e.target.value)} 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Access Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={16} /></span>
                <input 
                  type="password" required placeholder="Minimum 6 characters" value={password} onChange={(e)=>setPassword(e.target.value)} 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition" 
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#70B33C] hover:bg-[#5f9932] disabled:bg-gray-300 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition border-none outline-none cursor-pointer"
            >
              {loading ? 'Processing Registration...' : 'Register Securely'}
            </button>
          </form>

          <div className="flex items-center gap-2 justify-center text-gray-400 text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-gray-50">
            <ShieldCheck size={14} className="text-[#70B33C]" />
            <span>Encrypted Identity Hashing Gate</span>
          </div>
        </div>

      </div>
    </div>
  );
}