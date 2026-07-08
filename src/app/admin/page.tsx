'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PlusCircle, Trash2, Edit3, Database, ShieldAlert, CheckCircle, X, Box, DollarSign, FileText, ShoppingBag } from 'lucide-react';

interface Product {
    id: string | number;
    name: string;
    price: number;
    image_url?: string;
    category?: string;
    stock?: number;
    description?: string;
}

interface Order {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
    items: any[];
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | number | null>(null);

    // Form fields matching sir's criteria lists
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('100');
    const [category, setCategory] = useState('Medicine');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');

    async function fetchDashboardData() {
        try {
            setLoading(true);

            // 1. Pull active catalog inventory listings rows
            const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
            if (prodData) setProducts(prodData);

            // 2. Pull user-submitted checkout order traces
            const { data: orderData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
            if (orderData) setOrders(orderData);

        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Open modal form ready to modify field parameters values
    const handleEditInit = (product: Product) => {
        setEditingProductId(product.id);
        setName(product.name);
        setPrice(String(product.price));
        setStock(String(product.stock || 100));
        setCategory(product.category || 'Medicine');
        setImageUrl(product.image_url || '');
        setDescription(product.description || '');
        setIsModalOpen(true);
    };

    const handleFormUpsertSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setStatus(null);
            const productPayload = {
                name,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                category,
                image_url: imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
                description
            };

            if (editingProductId) {
                // SYSTEM CRITERIA LINK: Edit Product row update operation
                const { error } = await supabase.from('products').update(productPayload).eq('id', editingProductId);
                if (error) throw error;
                setStatus({ type: 'success', msg: 'Product metrics updated successfully!' });
            } else {
                // SYSTEM CRITERIA LINK: Add Product row insertion operation
                const { error } = await supabase.from('products').insert([productPayload]);
                if (error) throw error;
                setStatus({ type: 'success', msg: 'New item committed to catalog successfully!' });
            }

            // Reset application views state contexts
            setName(''); setPrice(''); setStock('100'); setImageUrl(''); setDescription('');
            setEditingProductId(null); setIsModalOpen(false);
            fetchDashboardData();
        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message || 'Database pipeline transaction error.' });
        }
    };

    const handleDeleteClick = async (id: string | number, title: string) => {
        if (!window.confirm(`Purge "${title}" out of global schema collections?`)) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setStatus({ type: 'success', msg: `Successfully dropped item database records tracking row for "${title}".` });
            fetchDashboardData();
        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message });
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-10 text-left">
            <div className="container mx-auto px-4 max-w-6xl space-y-12">

                {/* Upper Title Header Panel Row layout */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">DVAGO Control Station</h1>
                        <p className="text-xs text-gray-400 font-semibold mt-1">Live administration pipeline panel monitor interface</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setEditingProductId(null); setName(''); setPrice(''); setImageUrl(''); setDescription(''); setIsModalOpen(true); }}
                        className="bg-[#70B33C] hover:bg-[#5f9932] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md cursor-pointer border-none"
                    >
                        Open Add Form Modal
                    </button>
                </div>

                {status && (
                    <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 max-w-xl ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {status.type === 'success' ? <CheckCircle size={16} /> : <ShieldAlert size={16} />}
                        <span>{status.msg}</span>
                    </div>
                )}

                {/* SECTION A: PRODUCT MANAGEMENT INVENTORY TABLE ROWS */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 font-black text-xs text-gray-500 uppercase tracking-wider">Product Inventory Management logs</div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">Image</th>
                                    <th className="px-6 py-3.5">Title Label</th>
                                    <th className="px-6 py-3.5">Category</th>
                                    <th className="px-6 py-3.5">Price</th>
                                    <th className="px-6 py-3.5">Stock</th>
                                    <th className="px-6 py-3.5 text-center">Controls</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs font-bold text-gray-600">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-3"><img src={p.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop'} className="w-10 h-10 object-contain rounded-lg border border-gray-100 p-1 bg-white" alt="" /></td>
                                        <td className="px-6 py-3 font-black text-gray-800">{p.name}</td>
                                        <td className="px-6 py-3 text-gray-400">{p.category}</td>
                                        <td className="px-6 py-3 text-[#70B33C]">Rs. {p.price}</td>
                                        <td className="px-6 py-3">{p.stock ?? 100} Units</td>
                                        <td className="px-6 py-3 text-center flex items-center justify-center gap-2">
                                            <button onClick={() => handleEditInit(p)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition border-none bg-transparent cursor-pointer" title="Edit row parameters configuration"><Edit3 size={15} /></button>
                                            <button onClick={() => handleDeleteClick(p.id, p.name)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition border-none bg-transparent cursor-pointer" title="Purge row schema tracking record"><Trash2 size={15} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SECTION B: SHOW ALL USER ORDERS IN ADMIN PANEL PANEL */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 font-black text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2 text-gray-700">
                        <ShoppingBag size={14} className="text-[#70B33C]" />
                        <span>Incoming Sourcing Manifest Orders Queue ({orders.length} Traces logged)</span>
                    </div>
                    {orders.length === 0 ? (
                        <p className="p-6 text-xs text-gray-400 font-bold text-center">No transaction payloads found in your Supabase orders table structure registry container streams yet.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {orders.map(order => (
                                <div key={order.id} className="p-6 hover:bg-gray-50/40 transition text-xs font-bold text-gray-600 space-y-3">
                                    <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2 gap-2">
                                        <div>
                                            <span className="text-gray-800 font-black block text-sm">Order Log Reference Token: #{order.id}</span>
                                            <span className="text-[10px] text-gray-400">{new Date(order.created_at).toLocaleString()}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs bg-orange-50 border border-orange-100 text-orange-700 px-3 py-1 rounded-full">{order.status}</span>
                                            <span className="text-sm font-black text-[#70B33C] block mt-1">Total: Rs. {order.total_price}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-black text-gray-400 block mb-1">Purchased Medicine Items array dump:</span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                                            {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex items-center gap-2">
                                                    <span className="text-[#70B33C] font-black">[{item.quantity}x]</span>
                                                    <span className="truncate text-gray-700">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MODAL WINDOW POPUP OVERLAY */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 flex flex-col max-h-[85vh]">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-black text-xs uppercase tracking-wider text-gray-700">{editingProductId ? 'Modify Product Entry Fields' : 'Append New Product Entry Form Modal'}</span>
                                <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close modal" title="Close modal" className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"><X size={18} /></button>
                            </div>
                            <form onSubmit={handleFormUpsertSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                                <div>
                                    <label htmlFor="product-name" className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Product Title</label>
                                    <input id="product-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} title="Product Title" placeholder="e.g. Paracetamol 500mg" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="price" className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Price (Rs.)</label>
                                        <input id="price" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} title="Price in rupees" placeholder="e.g. 199" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Stock Units</label>
                                        <input
                                            type="number"
                                            required
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            title="Stock Units"
                                            placeholder="e.g. 100"
                                            aria-label="Stock Units"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Department Category Segment</label>
                                    <select id="category" title="Department Category Segment" aria-label="Department Category Segment" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-black text-gray-700 focus:outline-none focus:border-[#70B33C] focus:bg-white">
                                        <option value="Medicine">Medicine</option>
                                        <option value="Baby & Mother Care">Baby & Mother Care</option>
                                        <option value="Nutritions & Supplements">Nutritions & Supplements</option>
                                        <option value="Foods & Beverages">Foods & Beverages</option>
                                        <option value="Personal Care">Personal Care</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Image Link URL</label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        title="Image Link URL for the product"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="text-[10px] font-black text-gray-400 uppercase tracking-wide block mb-1">Therapeutic Description Guideline</label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Short description of the product"
                                        title="Therapeutic Description Guideline"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#70B33C] text-gray-800 focus:bg-white resize-none"
                                    />
                                </div>
                                <div className="pt-2 flex justify-end gap-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 bg-gray-100 rounded-xl uppercase font-black text-[10px] text-gray-500 border-none cursor-pointer">Close</button>
                                    <button type="submit" className="px-5 py-2.5 bg-[#70B33C] text-white rounded-xl uppercase font-black text-[10px] border-none cursor-pointer shadow-sm">Save Record Profile Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}