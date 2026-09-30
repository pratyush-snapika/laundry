"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function TrackOrder({ params }: { params: Promise<{ orderNumber: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        const foundOrder = data.find((o: any) => o.id === resolvedParams.orderNumber);
        setOrder(foundOrder || { status: 'NEW' }); // Fallback to NEW if not found for demo
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [resolvedParams.orderNumber]);

  const getStepState = (stepIndex: number) => {
    if (!order) return false;
    const statuses = ['NEW', 'ASSIGNED', 'PICKUP SCHEDULED', 'PROCESSING', 'READY FOR DELIVERY', 'DELIVERED'];
    const currentIdx = statuses.indexOf(order.status) !== -1 ? statuses.indexOf(order.status) : 0;
    
    const stepThresholds = [0, 2, 3, 4]; // Indexes in the statuses array for Step 1, 2, 3, 4
    return currentIdx >= stepThresholds[stepIndex];
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Simple Header */}
      <nav className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold text-zinc-900 tracking-tighter">
          Lucknow<span className="text-blue-600">Laundry</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
          Back to Home
        </Link>
      </nav>

      <main className="flex-1 flex justify-center py-12 px-4 sm:px-6">
        <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="p-8 border-b border-zinc-100 bg-blue-50">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">
              {order?.status === 'DELIVERED' ? 'Order Delivered!' : 'Booking Confirmed!'}
            </h1>
            <p className="text-zinc-600">Your order <span className="font-bold text-zinc-900">#{resolvedParams.orderNumber}</span> {order?.status === 'DELIVERED' ? 'is complete.' : 'has been received.'}</p>
          </div>
          
          <div className="p-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex justify-between items-center">
              Order Status 
              {loading && <span className="text-sm font-normal text-zinc-400">Loading updates...</span>}
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
              
              {/* Step 1: Order Placed */}
              <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${getStepState(0) ? 'is-active' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${getStepState(0) ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border transition-colors shadow-sm ${getStepState(0) ? 'border-blue-200 bg-blue-50' : 'border-zinc-100 bg-white'}`}>
                  <h3 className={`font-bold text-lg ${getStepState(0) ? 'text-zinc-900' : 'text-zinc-400'}`}>Order Placed</h3>
                  <p className={`text-sm mt-1 ${getStepState(0) ? 'text-zinc-600' : 'text-zinc-400'}`}>We're assigning a vendor for your pickup.</p>
                </div>
              </div>

              {/* Step 2: Pickup Scheduled */}
              <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${getStepState(1) ? 'is-active' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${getStepState(1) ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border transition-colors shadow-sm ${getStepState(1) ? 'border-blue-200 bg-blue-50' : 'border-zinc-100 bg-white'}`}>
                  <h3 className={`font-bold text-lg ${getStepState(1) ? 'text-zinc-900' : 'text-zinc-400'}`}>Pickup Scheduled</h3>
                  <p className={`text-sm mt-1 ${getStepState(1) ? 'text-zinc-600' : 'text-zinc-400'}`}>Vendor will arrive at your address.</p>
                </div>
              </div>

              {/* Step 3: Picked Up / Processing */}
              <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${getStepState(2) ? 'is-active' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${getStepState(2) ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border transition-colors shadow-sm ${getStepState(2) ? 'border-blue-200 bg-blue-50' : 'border-zinc-100 bg-white'}`}>
                  <h3 className={`font-bold text-lg ${getStepState(2) ? 'text-zinc-900' : 'text-zinc-400'}`}>In Processing</h3>
                  <p className={`text-sm mt-1 ${getStepState(2) ? 'text-zinc-600' : 'text-zinc-400'}`}>Clothes weighed and cleaning in progress.</p>
                </div>
              </div>
              
              {/* Step 4: Ready/Delivered */}
              <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${getStepState(3) ? 'is-active' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${getStepState(3) ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border transition-colors shadow-sm ${getStepState(3) ? 'border-blue-200 bg-blue-50' : 'border-zinc-100 bg-white'}`}>
                  <h3 className={`font-bold text-lg ${getStepState(3) ? 'text-zinc-900' : 'text-zinc-400'}`}>Ready for Delivery</h3>
                  <p className={`text-sm mt-1 ${getStepState(3) ? 'text-zinc-600' : 'text-zinc-400'}`}>Your clothes are fresh and ready!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
