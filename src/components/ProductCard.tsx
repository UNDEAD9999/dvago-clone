'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: string | number;
  img?: string;
}

export default function ProductCard({ id, name, price, img }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useApp();

  const safeIdString = String(id);
  const cleanImageSrc = img || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop';

  return (
    <Link 
      href={`/products/${safeIdString}`}
      /* FIXED: Added a solid border-gray-200/70 and hover:shadow-lg for maximum UI element contrast */
      className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-[#70B33C]/40 transition-all duration-300 group flex flex-col justify-between h-[350px] w-full text-left cursor-pointer"
    >
      {/* Upper image container box frame */}
      <div className="relative bg-gray-50/50 rounded-xl p-4 flex items-center justify-center h-44 w-full overflow-hidden border border-gray-100">
        <img 
          src={cleanImageSrc} 
          alt={name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
        
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className="absolute top-2 right-2 p-2 bg-white rounded-full border border-gray-200/60 text-gray-300 hover:text-red-500 transition-colors z-10 shadow-xs cursor-pointer"
        >
          <Heart size={14} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} aria-hidden={true} />
        </button>
      </div>

      {/* Product content descriptors layout metrics */}
      <div className="space-y-2 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-black text-gray-700 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-[#70B33C] transition-colors">
            {name}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold mt-0.5">Reference ID: #{safeIdString}</p>
        </div>

        {/* Pricing Actions Row Layout */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider leading-none mb-1">Price</span>
            <span className="text-sm font-black text-[#70B33C]">Rs. {price}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart({ id: safeIdString, name, price, img: cleanImageSrc });
            }}
            aria-label="Add to cart"
            title="Add to cart"
            className="p-2.5 bg-[#70B33C] hover:bg-[#5f9932] text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-md shadow-green-100/50 z-10 border-none"
          >
            <ShoppingCart size={14} />
            <span className="sr-only">Add to cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}