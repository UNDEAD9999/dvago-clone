'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider'; // Renders your real promotional images
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string | number;
  name: string;
  price: string | number;
  image_url?: string;
  img?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function streamCatalogData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data) setProducts(data);
      } catch (err) {
        console.error('Exception streaming rows:', err);
      } finally {
        setLoading(false);
      }
    }
    streamCatalogData();
  }, []);

  return (
    <main className="bg-[#f4f6f8] min-h-screen pb-20 w-full text-left">
      {/* 1. Main Navigation Header Controls */}
      <Navbar />
      
      {/* 2. Real Blocker-Proof Image Slider Panels */}
      <HeroSlider />
      
      {/* 3. High-Contrast Slider Carousel Category Section */}
      <CategorySection />

      {/* 4. Main Responsive Product Catalog Grid */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-black text-gray-800 tracking-tight mb-6 uppercase">
          Top Selling Items
        </h2>

        {loading ? (
          <div className="text-center py-12 text-sm font-bold text-gray-400">
            Streaming product matrix assets...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((item) => (
              <ProductCard
                key={String(item.id)}
                id={item.id}
                name={item.name}
                price={item.price}
                img={item.image_url || item.img}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}