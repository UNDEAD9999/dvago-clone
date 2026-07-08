'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from "@/lib/supabase";
import { notFound, useRouter } from "next/navigation";
import { Heart, ArrowLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import Navbar from '@/components/Navbar';
import { useApp } from '@/context/AppContext';

interface ViewProduct {
  id: string | number;
  name: string;
  price: string;
  img: string;
  brand?: string;
  description?: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;
  
  const router = useRouter();
  const { addToCart } = useApp();
  const [activeTab, setActiveTab] = useState('SPECIFICATION');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const [product, setProduct] = useState<ViewProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductFromDb() {
      if (!productId) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (!error && data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: String(data.price),
            img: data.image_url || data.img || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
            brand: data.category || 'Medicine',
            description: data.description || "Product profile details loaded live from cloud database servers."
          });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProductFromDb();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#70B33C] rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!product) return notFound();

  const tabContent: { [key: string]: React.ReactNode } = {
    'SPECIFICATION': (
      <div className="space-y-4 text-sm text-gray-700">
        <p><strong>Requires Prescription:</strong> No</p>
        <p><strong>Generics:</strong> Verified Generic Formula</p>
        <div>
          <p className="font-bold mb-1">Product Description:</p>
          <p className="leading-relaxed">{product.description}</p>
        </div>
      </div>
    ),
    'USAGE AND SAFETY': <div className="text-sm text-gray-700">Follow professional dosage rules inside package inserts.</div>,
    'PRECAUTIONS': <div className="text-sm text-gray-700">Keep away from children. Store in safe dry locations below 30°C.</div>,
    'WARNINGS': <div className="text-sm text-red-600">Do not exceed standard daily therapeutic limits.</div>
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 text-left">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#70B33C] mb-8 cursor-pointer bg-transparent border-none outline-none"
        >
          <ArrowLeft size={16} /> Back to Catalog Listing
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 bg-white rounded-[2rem] border border-gray-100 p-12 relative shadow-sm flex items-center justify-center min-h-[450px]">
            <button 
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-6 right-6 p-3 bg-white rounded-full border border-gray-100 shadow-md z-20 cursor-pointer text-gray-300"
            >
              <Heart size={24} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-300'} />
            </button>
            <img src={product.img} alt={product.name} className="w-full h-auto max-h-[380px] object-contain mix-blend-multiply" />
          </div>

          <div className="w-full lg:w-1/2 space-y-6 pt-4">
            <h1 className="text-3xl font-extrabold text-[#334155] leading-snug">{product.name}</h1>
            <p className="text-sm font-bold text-gray-400">Brand: <span className="text-[#70B33C] underline">{product.brand}</span></p>
            <div className="flex items-center gap-4"><span className="text-4xl font-black text-[#1e293b]">Rs. {product.price}</span></div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold text-gray-500 w-full">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Truck size={16} className="text-[#70B33C]" /><span>Express Delivery</span></div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><ShieldCheck size={16} className="text-[#70B33C]" /><span>100% Authentic</span></div>
            </div>

            <button 
              type="button"
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}
              className="w-full bg-[#70B33C] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#5f9932] shadow-lg shadow-green-100 uppercase cursor-pointer flex items-center justify-center gap-2 border-none"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex gap-3 border-b border-gray-100 pb-4 mb-8">
            {Object.keys(tabContent).map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`px-8 py-2.5 border-2 rounded-lg font-bold text-[11px] uppercase cursor-pointer ${activeTab === tab ? 'bg-[#70B33C] border-[#70B33C] text-white' : 'border-[#70B33C] text-[#70B33C]'}`}>{tab}</button>
            ))}
          </div>
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-extrabold text-[#334155] mb-8 border-l-8 border-[#70B33C] pl-5 uppercase">{product.name} {activeTab}</h3>
            <div>{tabContent[activeTab]}</div>
          </div>
        </div>

      </div>
    </div>
  );
}