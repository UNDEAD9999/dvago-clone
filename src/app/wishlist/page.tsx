'use client';

import Navbar from '@/components/Navbar';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 text-left">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase mb-8 flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" size={24} />
          Your Bookmarked Wishlist Items
        </h1>

        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
          <div className="w-14 h-14 bg-pink-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-lg">♥</div>
          <p className="text-sm font-bold text-gray-400">No therapeutic profile sets saved in your bookmarks folder yet.</p>
          <p className="text-xs text-gray-300 font-semibold mt-1">Tap the heart badge icons overlaying medicine visual elements inside active feeds to save items here.</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-xs font-black bg-gray-50 text-gray-600 border border-gray-100 px-5 py-2.5 rounded-xl uppercase tracking-wider hover:bg-[#70B33C] hover:text-white transition-all">
            <ArrowLeft size={14} />
            Return to Sourcing Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}