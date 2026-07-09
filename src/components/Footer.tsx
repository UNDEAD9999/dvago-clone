import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 mt-16">
      {/* Top Section: Links Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div>
          <h3 className="font-bold text-lg text-green-600 mb-4">DVAGO Clone</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your trusted online pharmacy and wellness partner. Delivering authentic medicines and healthcare essentials right to your doorstep.
          </p>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition">Home</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Medicines</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Wellness Products</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Track Order</a></li>
          </ul>
        </div>

        {/* Column 3: Top Categories */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition">Baby & Mother Care</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Nutrition & Supplements</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Devices & Support</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Personal Care</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Support */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Customer Support</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><span className="font-medium text-gray-800">Helpline:</span> 021-11-11-38246</li>
            <li><span className="font-medium text-gray-800">Email:</span> info@dvago.pk</li>
            <li><span className="font-medium text-gray-800">Timing:</span> 24/7 Available</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright */}
      <div className="bg-gray-200 py-4 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Dvago Clone Assignment Project. Built with Next.js & Supabase.</p>
      </div>
    </footer>
  );
}