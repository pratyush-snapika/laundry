"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingModalProps {
  onClose: () => void;
}

export default function BookingModal({ onClose }: BookingModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      service: formData.get("service"),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      router.push(`/track/${result.order.id}`);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-2">Book Pickup</h2>
          <p className="text-zinc-600 pr-10">Fill in the details below. We'll pick up, weigh, and share the final price.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-2">1. Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Full Name *</label>
                <input name="fullName" required type="text" className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Mobile Number *</label>
                <input required type="tel" className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" placeholder="9876543210" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">WhatsApp Number (Optional)</label>
                <input type="tel" className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" placeholder="Same as mobile if left blank" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-2">2. Pickup Address</h3>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Full Address *</label>
              <textarea required rows={2} className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" placeholder="House no, Street name, Landmark" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Area *</label>
                <select required className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm">
                  <option value="">Select Area</option>
                  <option value="gomti-nagar">Gomti Nagar</option>
                  <option value="hazratganj">Hazratganj</option>
                  <option value="aliganj">Aliganj</option>
                  <option value="indira-nagar">Indira Nagar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pincode *</label>
                <input required type="text" className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" placeholder="226001" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-2">3. Service & Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Service Required *</label>
                <select name="service" required className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm">
                  <option value="">Select Service</option>
                  <option value="Wash & Fold">Wash & Fold (₹79/kg)</option>
                  <option value="Wash & Iron">Wash & Iron (₹99/kg)</option>
                  <option value="Premium Laundry">Premium Laundry (₹149/kg)</option>
                  <option value="Dry Cleaning">Dry Cleaning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Estimated Weight</label>
                <select className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm">
                  <option value="3kg">~ 3kg</option>
                  <option value="5kg">~ 5kg</option>
                  <option value="8kg">~ 8kg</option>
                  <option value="10kg">10kg+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pickup Date *</label>
                <input required type="date" className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Pickup Time Slot *</label>
                <select required className="w-full border border-zinc-200 text-zinc-900 bg-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm">
                  <option value="">Select Slot</option>
                  <option value="10-12">10 AM - 12 PM</option>
                  <option value="12-14">12 PM - 2 PM</option>
                  <option value="16-18">4 PM - 6 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100">
            <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-sm mb-6 flex gap-3 items-start">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p><strong>Note:</strong> No payment required right now. Our vendor will weigh your clothes at pickup to calculate the exact final price. You can pay by Cash or UPI on delivery.</p>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
