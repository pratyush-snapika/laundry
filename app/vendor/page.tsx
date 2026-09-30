"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function VendorDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const CURRENT_VENDOR = "Ramesh"; // Mock logged in vendor

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        // Filter orders assigned to the current vendor
        const vendorOrders = data.filter((o: any) => o.vendor === CURRENT_VENDOR);
        setOrders(vendorOrders);
      })
      .catch(err => console.error(err));
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: orderId, 
          status: newStatus
        })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const renderOrderCard = (order: any, i: number) => (
    <div key={i} className={`bg-white rounded-2xl shadow-md border border-zinc-100 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col ${order.status === 'DELIVERED' ? 'opacity-60 grayscale' : ''}`}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`font-extrabold text-xs tracking-wide uppercase px-3 py-1.5 rounded-full ${
            order.status === 'ASSIGNED' ? 'bg-purple-100 text-purple-700' :
            order.status === 'PICKUP SCHEDULED' ? 'bg-amber-100 text-amber-700' :
            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
            order.status === 'READY FOR DELIVERY' ? 'bg-teal-100 text-teal-700' :
            'bg-zinc-100 text-zinc-600'
          }`}>
            {order.status}
          </span>
          <span className="text-zinc-400 text-sm font-bold bg-zinc-50 px-2 py-1 rounded">{order.id}</span>
        </div>
        
        <h3 className="font-extrabold text-zinc-900 text-xl mb-1">{order.customerName}</h3>
        <p className="text-zinc-500 text-sm font-medium flex items-center gap-1.5 mb-6">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Lucknow • <span className="text-zinc-800">{order.service}</span>
        </p>
        
        <div className="mt-auto pt-4 border-t border-zinc-100 w-full flex flex-col gap-3">
          {order.status === 'ASSIGNED' && (
            <button 
              onClick={() => handleUpdateStatus(order.id, 'PICKUP SCHEDULED')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm shadow-purple-200"
            >
              Accept Pickup
            </button>
          )}
          {order.status === 'PICKUP SCHEDULED' && (
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => handleUpdateStatus(order.id, 'PROCESSING')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm shadow-blue-200"
              >
                Weigh & Process
              </button>
              <a href="tel:9876543210" className="flex items-center justify-center w-11 h-11 shrink-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition">
                📞
              </a>
            </div>
          )}
          {order.status === 'PROCESSING' && (
            <button 
              onClick={() => handleUpdateStatus(order.id, 'READY FOR DELIVERY')}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold px-6 py-2.5 rounded-xl transition"
            >
              Mark Ready
            </button>
          )}
          {order.status === 'READY FOR DELIVERY' && (
            <button 
              onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm shadow-green-200"
            >
              Deliver & Collect
            </button>
          )}
          {order.status === 'DELIVERED' && (
            <div className="w-full text-center text-green-700 font-bold px-6 py-2.5 bg-green-50 rounded-xl">
              Delivered ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold tracking-tighter">VendorApp</h1>
        <div className="text-sm font-medium bg-blue-700 px-3 py-1 rounded-full">
          {CURRENT_VENDOR} (Active)
        </div>
      </nav>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Today's Tasks</h2>
        
        {orders.length === 0 ? (
          <div className="text-center p-12 text-zinc-500 bg-white rounded-2xl border border-zinc-200 shadow-sm">
            No assigned orders right now. Take a break! ☕
          </div>
        ) : (
          <div className="flex flex-col gap-10 max-w-7xl mx-auto">
            
            {/* New Assignments (To Accept) */}
            {orders.filter(o => o.status === 'ASSIGNED').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span> New Assignments (To Accept)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status === 'ASSIGNED').map(renderOrderCard)}
                </div>
              </div>
            )}

            {/* Today's Pickups */}
            {orders.filter(o => o.status === 'PICKUP SCHEDULED').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Today's Pickups
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status === 'PICKUP SCHEDULED').map(renderOrderCard)}
                </div>
              </div>
            )}
            
            {/* Today's Deliveries */}
            {orders.filter(o => o.status === 'READY FOR DELIVERY').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Today's Deliveries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status === 'READY FOR DELIVERY').map(renderOrderCard)}
                </div>
              </div>
            )}

            {/* In Processing */}
            {orders.filter(o => o.status === 'PROCESSING').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> At Laundry Plant (Processing)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status === 'PROCESSING').map(renderOrderCard)}
                </div>
              </div>
            )}

            {/* Completed Group */}
            {orders.filter(o => o.status === 'DELIVERED').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Completed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.filter(o => o.status === 'DELIVERED').map(renderOrderCard)}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Bottom Nav */}
      <div className="bg-white border-t border-zinc-200 p-3 flex justify-around sticky bottom-0">
        <button className="flex flex-col items-center text-blue-600">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-xs font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center text-zinc-400 hover:text-zinc-600 transition">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          <span className="text-xs font-bold">History</span>
        </button>
      </div>
    </div>
  );
}
