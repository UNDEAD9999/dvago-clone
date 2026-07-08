'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string | number;
  name: string;
  price: string | number;
  image_url?: string;
  img?: string;
  category?: string;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilteredCatalog() {
      try {
        setLoading(true);
        let query = supabase.from('products').select('*');
        
        // Scenario A: User clicked on a category link directly from the menu
        if (activeCategory) {
          query = query.eq('category', activeCategory);
        }

        const { data, error } = await query;
        
        if (!error && data) {
          // Scenario B: Clean, crash-proof Client-Side Common Sense Filtering
          if (searchQuery) {
            const cleanKeyword = searchQuery.toLowerCase().trim();
            
            const filtered = data.filter((product) => {
              const productName = (product.name || '').toLowerCase();
              const productCategory = (product.category || '').toLowerCase();
              
              // True if keyword matches the item name OR its broader category group
              return productName.includes(cleanKeyword) || productCategory.includes(cleanKeyword);
            });
            
            setProducts(filtered);
          } else {
            // No search text? Just show the category list or full list sorted
            const sortedData = [...data].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            setProducts(sortedData);
          }
        }
      } catch (err) {
        console.error("Database search execution error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredCatalog();
  }, [activeCategory, searchQuery]);

  return (
    <section className="container mx-auto px-4 mt-8">
      {/* Breadcrumb path indicator matching official UI layout */}
      <div className="text-xs text-gray-400 font-bold mb-2 flex gap-1.5 items-center">
        <span>Home</span> &gt; <span className="text-[#70B33C]">Search Product</span>
      </div>

      <h2 className="text-xl font-black text-gray-800 tracking-tight mb-6 uppercase border-l-4 border-[#70B33C] pl-3">
        {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory ? `${activeCategory}` : 'Products'}
      </h2>

      {loading ? (
        <div className="text-center py-12 text-sm font-bold text-gray-400 animate-pulse">
          Searching inventory matrix rows...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-gray-200/70 rounded-3xl p-12 text-center max-w-md mx-auto shadow-xs">
          <p className="text-sm font-black text-gray-700 uppercase tracking-wide">No items found</p>
          <p className="text-xs text-gray-400 mt-1">We couldn't find matches for your search. Try using a broader keyword.</p>
        </div>
      ) : (
        /* The professional responsive product listing card grid layout panel */
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
  );
}

export default function ShopPage() {
  return (
    <main className="bg-[#f4f6f8] min-h-screen pb-20 w-full text-left">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#70B33C] rounded-full animate-spin" />
        </div>
      }>
        <ShopContent />
      </Suspense>
    </main>
  );
}