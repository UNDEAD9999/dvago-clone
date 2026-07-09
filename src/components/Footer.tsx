import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t-4 border-green-600 mt-auto">
      {/* Top Value Proposition Banner - Fills up the empty room vibe */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-green-500 font-bold text-xl">100% Authentic</span>
            <span className="text-xs text-gray-400">Medicines sourced directly</span>
          </div>
          <div className="flex flex-col items-center justify-center border-y sm:border-y-0 sm:border-x border-slate-700 py-4 sm:py-0">
            <span className="text-green-500 font-bold text-xl">Fast Delivery</span>
            <span className="text-xs text-gray-400">Tracked riders to your doorstep</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-green-500 font-bold text-xl">24/7 Support</span>
            <span className="text-xs text-gray-400">Call us anytime: 021-11-11-38246</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Column 1: Brand Info (Takes 2 spans for width balance) */}
        <div className="md:col-span-2">
          <h3 className="font-extrabold text-2xl text-white tracking-wide mb-4">
            DVAGO<span className="text-green-500">.</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Your trusted digital pharmacy network. Bringing authentic healthcare solutions, wellness essentials, and professional support directly to the local community with complete reliability.
          </p>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-green-400 transition-colors">Home Dashboard</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Medicines Catalog</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Wellness Products</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Track Active Order</a></li>
          </ul>
        </div>

        {/* Column 3: Top Categories */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">Categories</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-green-400 transition-colors">Baby & Mother Care</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Nutrition & Supplements</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Devices & Support</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Personal Care Line</a></li>
          </ul>
        </div>

        {/* Column 4: Secure Platform details */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">Reliability</h4>
          <p className="text-xs text-gray-400 mb-3">
            Secure login provided via Google OAuth systems.
          </p>
          <div className="inline-block bg-slate-800 text-green-400 text-xs font-semibold px-2.5 py-1 rounded border border-slate-700">
            System Online
          </div>
        </div>

      </div>

      {/* Bottom Section: Copyright Banner */}
      <div className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-gray-500">
        <p>© 2026 Dvago Clone Assignment Project. Built with Next.js & Supabase integration.</p>
      </div>
    </footer>
  );
}