'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Trash2, ShoppingBag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useApp();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const totalAmount = subtotal + deliveryFee;

  const handleCheckoutSubmit = async () => {
    if (cart.length === 0) return;
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            items: cart,
            total_price: totalAmount,
            status: 'Pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      setOrderPlaced(true);
      clearCart();
    } catch (err: any) {
      alert(`Order Placement Error: ${err.message || 'Check database connection'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 text-left">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase mb-8 flex items-center gap-2">
          <ShoppingBag className="text-[#70B33C]" size={24} />
          Your Shopping Cart
        </h1>

        {orderPlaced ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-50 text-[#70B33C] rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">✓</div>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Order Placed Successfully!</h2>
            <p className="text-xs text-gray-400 font-semibold mt-2">Your order parameters have been saved into your Supabase database order stream logs matrix.</p>
            <Link href="/" className="mt-6 inline-block bg-[#70B33C] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider">Continue Shopping</Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto">
            <p className="text-sm font-bold text-gray-400">Your shopping cart is currently empty.</p>
            <Link href="/" className="mt-4 inline-block text-xs font-black text-[#70B33C] underline uppercase">Return to Storefront Home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={String(item.id)} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm relative">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-50">
                    <img src={item.img} alt={item.name} className="max-h-full object-contain mix-blend-multiply" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="text-xs font-black text-gray-800 line-clamp-2 pr-6">{item.name}</h3>
                    <p className="text-sm font-black text-[#70B33C]">Rs. {item.price}</p>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg text-sm font-black flex items-center justify-center hover:bg-gray-100 cursor-pointer">-</button>
                      <span className="text-xs font-bold w-6 text-center text-gray-700">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg text-sm font-black flex items-center justify-center hover:bg-gray-100 cursor-pointer">+</button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    title={`Remove ${item.name} from cart`}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-3">Invoice Calculations Summary</h2>
              
              <div className="space-y-3 text-xs font-bold text-gray-500">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal:</span>
                  <span className="text-gray-800">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Logistics Routing Fee:</span>
                  <span className="text-gray-800">{deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-between text-sm font-black text-gray-800">
                  <span>Gross Final Payable Amount:</span>
                  <span className="text-[#70B33C] text-lg">Rs. {totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                disabled={loading}
                className="w-full bg-[#70B33C] hover:bg-[#5f9932] disabled:bg-gray-200 text-white py-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <CreditCard size={14} />
                {loading ? 'Transmitting Data Streams...' : 'Confirm & Place Order'}
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center gap-2 justify-center text-gray-400 text-[10px] font-bold uppercase tracking-wider border-t border-gray-50 pt-4">
                <ShieldCheck size={14} className="text-[#70B33C]" />
                <span>Verified Escrow Sourcing Protocol</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}