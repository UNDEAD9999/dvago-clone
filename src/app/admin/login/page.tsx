'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin') && password.length >= 6) {
      alert('Administrative clearance granted!');
      router.push('/admin');
    } else {
      alert('Access Denied: Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center py-16 text-left">
      <div className="w-full max-w-md px-4">
        
        <button onClick={() => router.push('/')} className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#70B33C] uppercase tracking-wider mb-6 transition cursor-pointer">
          <ArrowLeft size={14} />
          Back to Public Storefront
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 border border-gray-100">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#70B33C]">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-lg font-black text-gray-800 uppercase tracking-tight">Admin Gate</h1>
            <p className="text-xs text-gray-400 font-semibold">Authorized administrative credentials access terminal</p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Admin Email ID</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                <input type="email" required placeholder="admin@dvago.pk" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Security Key Access Code</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={16} /></span>
                <input type="password" required placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white transition" />
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition cursor-pointer border-none">
              Verify administrative Clearance
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}