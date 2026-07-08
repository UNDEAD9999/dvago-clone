'use client';

import { useState, useEffect } from 'react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Blocker-proof, highly reliable medical and pharmacy showcase images
  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1600&auto=format&fit=crop',
      tag: 'DVAGO Delivery',
      title: 'Authentic Medicines Delivered Fast',
      desc: 'Order prescription drugs and daily wellness essentials online with guaranteed temperature-controlled shipping.'
    },
    {
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop',
      tag: 'DVAGO Wellness',
      title: 'Your Trusted Pharmacy & Wellness Experts',
      desc: 'Get authentic medicine and healthcare supplements delivered right to your doorstep.'
    },
    {
      img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1600&auto=format&fit=crop',
      tag: '100% Genuine',
      title: 'Certified Healthcare Products Only',
      desc: 'Shop with complete peace of mind. We source directly from authorized manufacturers and distributors.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Transitions smoothly every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="container mx-auto px-4 mt-4 select-none relative z-10">
      <div className="w-full h-[220px] md:h-[320px] rounded-2xl overflow-hidden relative shadow-xs border border-gray-100 bg-white">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* High-contrast text layout container panel overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center p-8 md:p-12">
              <div className="max-w-md text-white text-left space-y-2">
                <span className="bg-[#70B33C] text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-xs">
                  {slide.tag}
                </span>
                <h2 className="text-xl md:text-3xl font-black tracking-tight leading-tight uppercase drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-xs font-medium text-gray-100 drop-shadow-xs hidden md:block leading-relaxed">
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators navigation dots layer layout */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'bg-[#70B33C] w-5' : 'bg-white/60 hover:bg-white'
                }`}
              title={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}