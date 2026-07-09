'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { 
      name: 'Baby & Mother Care', 
      color: 'bg-red-50 text-red-700', 
      img: 'https://cdn.shopify.com/s/files/1/0839/1226/1948/articles/Formula-milk.png?v=1709121408' 
    },
    { 
      name: 'Cough & Cold', 
      color: 'bg-purple-50 text-purple-700', 
      img: 'https://www.chandigarhayurvedcentre.com/wp-content/uploads/2021/02/COUGH-COLD-GO-KIT.png' 
    },
    { 
      name: 'A to Z Medicine', 
      color: 'bg-blue-50 text-blue-700', 
      img: 'https://alkhaleejsupermarket.pk/cdn/shop/files/A_to_Z_Medicine_570x.webp?v=1769705412' 
    },
    { 
      name: 'Fish Oil & Omega 3', 
      color: 'bg-orange-50 text-orange-700', 
      img: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FCategory%2520Banner%2FCategory-image-icon%2FFish%2520Oil%2520Omega%25203.jpg&w=1920&q=50' 
    },
    { 
      name: 'Personal Care', 
      color: 'bg-yellow-50 text-yellow-700', 
      img: 'https://conaturalintl.com/cdn/shop/collections/skin_care.jpg?v=1614668308' 
    },
    { 
      name: 'Nutritional Supplements', 
      color: 'bg-pink-50 text-pink-700', 
      img: 'https://nutritionalworld.com.pk/wp-content/uploads/2026/01/Food-Supplements-2.webp' 
    },
    { 
      name: 'Baby Care Food', 
      color: 'bg-teal-50 text-teal-700', 
      img: 'https://esajee.com/public/uploads/media/WPV5T02JYEoaGLh6KoL1SMAgZJM1aSaF4CE6cBYC.webp' 
    },
    { 
      name: 'Diabetes Support', 
      color: 'bg-emerald-50 text-emerald-700', 
      img: 'https://www.thehimalayanorganics.in/products/himalayan-organics-diabetes-support-supplement-helps-control-blood-sugar-levels-100-vegetarian-60-capsules?srsltid=AfmBOooLfZJ9m9vFp_iWUCjj1TF7bSmp57skZKXD8ZqD1EUxA7pDflEH' 
    },
    { 
      name: 'Devices & Gadgets', 
      color: 'bg-indigo-50 text-indigo-700', 
      img: 'https://shahalami.pk/cdn/shop/products/OnCallEzIIBloodGlucoseMonitoringSystem_510x@2x.progressive.jpg?v=1619786195' 
    },
    { 
      name: 'Multivitamins', 
      color: 'bg-rose-50 text-rose-700', 
      img: 'https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/bp-wellness-centrum/en_US/pages/COSMOS-updates/Centrum_Silver_Portfolio_Transparent.png?auto=format' 
    },
    { 
      name: 'Dental Hygiene', 
      color: 'bg-cyan-50 text-cyan-700', 
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdj315KJsLAkCyFwZB4gLGYtIMhJYFK6-E-YWer9D4qjCKZjgsr_OTyLs&s=10' 
    },
    { 
      name: 'Skincare Experts', 
      color: 'bg-lime-50 text-lime-700', 
      img: 'https://fashionmagazine.mblycdn.com/fm/resized/2025/12/w1200/FEATURE_Horizontal-55-1.png' 
    },
    { 
      name: 'First Aid Kits', 
      color: 'bg-amber-50 text-amber-700', 
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0lfzKjo1PHif_09tiMB2oHRvF0_0j5iCTiErrY4EfY_VJMvjuOpetTO4&s=10' 
    }
  ];

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-6 bg-white mt-4 rounded-2xl border border-gray-200/80 shadow-sm select-none">
      {/* Header Panel */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-xl font-black text-gray-800 tracking-tight">
          Categories
        </h2>
        
        {/* Navigation Arrow Controls */}
        <div className="flex gap-2 relative z-30">
          <button 
            type="button"
            onClick={() => handleArrowClick('left')}
            className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-[#70B33C] hover:border-[#70B33C] hover:text-white rounded-full transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
            title="Scroll Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button"
            onClick={() => handleArrowClick('right')}
            className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-[#70B33C] hover:border-[#70B33C] hover:text-white rounded-full transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
            title="Scroll Right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scrolling Carousel Viewport Row */}
      <div className="w-full overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group shrink-0 w-[140px] border border-gray-200/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#70B33C] hover:shadow-md transition-all bg-white scroll-snap-align-start"
            >
              {/* FIXED: Scaled up to w-20 h-20 with custom padding and subtle border styling */}
              <div className={`w-20 h-20 rounded-2xl mb-3 flex items-center justify-center overflow-hidden p-1.5 ${cat.color} shadow-sm border border-gray-100/50 group-hover:scale-105 transition-transform duration-300`}>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="max-w-full max-h-full object-contain rounded-xl mix-blend-multiply" 
                />
              </div>
              
              <span className="text-[11px] font-black text-gray-700 group-hover:text-[#70B33C] transition-colors line-clamp-2 h-8 flex items-center justify-center uppercase tracking-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}