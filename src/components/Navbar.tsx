'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Smartphone, Zap, ChevronDown, MapPin } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { name: 'Medicine', sub: ['Prescription Drugs', 'Over The Counter', 'Vitamins', 'First Aid'] },
    { name: 'Baby & Mother Care', sub: ['Diapers & Wipes', 'Baby Food', 'Mother Care Products'] },
    { name: 'Nutritions & Supplements', sub: ['Protein Powders', 'Weight Management', 'Mineral Supplements'] },
    { name: 'Foods & Beverages', sub: ['Healthy Drinks', 'Organic Snacks', 'Teas & Coffee'] },
    { name: 'Devices & Support', sub: ['Blood Pressure Monitors', 'Thermometers', 'Braces & Supports'] },
    { name: 'Personal Care', sub: ['Skincare', 'Haircare', 'Oral Care', 'Fragrances'] },
    { name: 'OTC And Health Need', sub: ['Cough & Cold', 'Pain Relief', 'Allergy Management'] }
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localSearch.trim() !== '') {
      router.push(`/shop?search=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-[9999] overflow-visible">
      
      {/* 1. TOP ANNOUNCEMENT MARQUEE BANNER */}
      <div className="bg-[#70B33C] text-white text-[11px] font-bold py-2 relative overflow-hidden hidden md:block z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-8 w-max">
          <span>BEWARE OF FRAUD! FOR OUR WEBSITE USE ONLY WWW.DVAGO.PK. FOR CALLING & WHATSAPP PLEASE USE 021-11-11-38246. DO NOT TRUST UNAUTHORIZED WEBSITES/APPS CLAIMING TO BE DVAGO. STAY VIGILANT!</span>
        </div>
      </div>

      {/* 2. MAIN HEADER CONNECTIONS PANEL */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 relative z-20">
        <Link href="/" className="flex flex-col items-start min-w-[120px]">
          <span className="text-3xl font-black text-[#70B33C] tracking-tight leading-none">DVAGO</span>
          <span className="text-[9px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">Pharmacy & Wellness Experts</span>
        </Link>

        {/* Search Bar Input Panel */}
        <div className="flex-1 max-w-2xl flex items-center gap-3">
          <div className="w-full relative">
            <input
              type="text"
              placeholder='Search for "Medicine", Pampers, Panadol...'
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 font-medium text-sm focus:outline-none focus:border-[#70B33C] focus:bg-white transition-all shadow-inner"
            />
            <span 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#70B33C]"
              onClick={() => localSearch.trim() && router.push(`/shop?search=${encodeURIComponent(localSearch.trim())}`)}
            >
              <Search size={18} />
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl bg-gray-50 text-gray-500 cursor-pointer hover:bg-white transition min-w-[170px]">
            <MapPin size={16} className="text-[#70B33C]" />
            <span className="text-[11px] font-bold truncate">No Address Selected</span>
            <ChevronDown size={14} className="ml-auto" />
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-3">
          <Link href="/download" className="hidden lg:flex items-center gap-2 bg-[#445b23] text-white text-[11px] font-black px-4 py-2.5 rounded-lg hover:opacity-90 transition">
            <Smartphone size={14} /> DOWNLOAD APP
          </Link>
          <Link href="/instant-order" className="hidden sm:flex items-center gap-2 bg-[#70B33C] text-white text-[11px] font-black px-4 py-2.5 rounded-lg hover:bg-[#5f9932] transition shadow-sm">
            <Zap size={14} className="fill-white" /> INSTANT ORDER
          </Link>

          <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-xl gap-0.5">
            <Link href="/login" className="p-2 text-gray-500 hover:text-[#70B33C] hover:bg-white rounded-lg transition-all"><User size={18} /></Link>
            <Link href="/wishlist" className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-lg transition-all"><Heart size={18} /></Link>
            <Link href="/cart" className="p-2 text-gray-500 hover:text-[#70B33C] hover:bg-white rounded-lg transition-all"><ShoppingCart size={18} /></Link>
          </div>
        </div>
      </div>

      {/* 3. FIXED: Added full container metrics to prevent item wrapping or hiding */}
      <nav className="hidden lg:block bg-white relative z-[500] overflow-visible border-t border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center gap-2 text-[10px] xl:text-[11px] font-black text-gray-600 tracking-tight xl:tracking-wide uppercase overflow-visible whitespace-nowrap">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative py-4 cursor-pointer group overflow-visible flex-shrink-0"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span className="flex items-center gap-1 group-hover:text-[#70B33C] transition duration-200">
                {item.name} <ChevronDown size={12} className="text-gray-400 group-hover:text-[#70B33C] transition" />
              </span>

              {activeDropdown === item.name && (
                <div className="absolute top-[100%] left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-[99999] text-left normal-case tracking-normal block">
                  {item.sub.map((subItem) => (
                    <Link
                      key={subItem}
                      href={`/shop?category=${encodeURIComponent(subItem)}`}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-[#70B33C] font-bold transition-all"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}