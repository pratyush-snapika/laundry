"use client";

import { useState } from "react";
import Link from "next/link";
import BookingModal from "./components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const steps = [
    { num: "01", title: "Book", desc: "Schedule a pickup online. No upfront payment required.", bgClass: "bg-gradient-to-br from-white to-zinc-50" },
    { num: "02", title: "Weigh", desc: "Our vendor arrives, weighs your clothes, and confirms the price.", bgClass: "bg-gradient-to-br from-zinc-50 to-blue-50/50" },
    { num: "03", title: "Process", desc: "Expertly washed, ironed, and treated with premium detergents.", bgClass: "bg-gradient-to-br from-blue-50/50 to-blue-100/50" },
    { num: "04", title: "Deliver", desc: "Fresh clothes delivered to your door. Pay easily on delivery.", bgClass: "bg-gradient-to-br from-blue-100/50 to-blue-200/60" },
  ];

  const services = [
    { name: "Wash & Fold", price: "₹79", unit: "per kg", desc: "Everyday clothes washed and neatly folded.", color: "blue", iconColor: "text-blue-500", bgClass: "bg-gradient-to-br from-white to-blue-50", features: ["Color-safe washing", "Premium detergents", "Crisp folding", "48hr delivery"] },
    { name: "Wash & Iron", price: "₹99", unit: "per kg", desc: "Washed, pressed, and ready to wear immediately.", color: "purple", iconColor: "text-purple-500", bgClass: "bg-gradient-to-br from-white to-purple-50", features: ["Steam ironing", "Stain inspection", "Hanger packing", "Next day delivery"] },
    { name: "Premium Care", price: "₹149", unit: "per kg", desc: "Special care for delicate fabrics and expensive wear.", color: "teal", iconColor: "text-teal-500", bgClass: "bg-gradient-to-br from-white to-teal-50", features: ["Individual washing", "Fabric softening", "Zero shrinkage", "Hand-finished"] },
    { name: "Dry Cleaning", price: "Custom", unit: "per piece", desc: "Professional dry cleaning for suits, dresses & heavy items.", color: "rose", iconColor: "text-rose-500", bgClass: "bg-gradient-to-br from-white to-rose-50", features: ["Deep stain removal", "Eco-friendly solvents", "Suit & gown care", "Protective covers"] },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between py-3 px-6 lg:px-12 bg-zinc-950 border-b border-zinc-900">
        <div className="text-2xl font-extrabold text-white tracking-tighter drop-shadow-md">
          Lucknow<span className="text-blue-400">Laundry</span>
        </div>
        <div className="hidden md:flex gap-10 text-white font-medium drop-shadow-md">
          <a href="#services" className="hover:text-blue-300 transition text-sm cursor-pointer">Services</a>
          <a href="#how-it-works" className="hover:text-blue-300 transition text-sm cursor-pointer">How it Works</a>
          <a href="#services" className="hover:text-blue-300 transition text-sm cursor-pointer">Pricing</a>
        </div>
        <div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-white/10 hover:bg-white text-white hover:text-blue-600 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/20 text-sm"
          >
            Book Pickup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center py-12 overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        >
          <source src="/laundry-hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Modern Gradient Overlay */}
        <div className="absolute z-10 inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/90"></div>

        {/* Hero Content (Right Aligned Container, Left Aligned Text) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-end">
          <div className="max-w-xl text-left pl-0 lg:pl-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-xs md:text-sm mb-4 backdrop-blur-md shadow-lg shadow-blue-500/10">
              ✨ Premium Fabric Care in Lucknow
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight leading-[1.1] drop-shadow-2xl">
              Immaculate<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Laundry.</span><br/>Delivered.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-8 font-light leading-relaxed drop-shadow-md max-w-lg">
              We collect, professionally clean, and return your garments perfectly pressed. Experience the luxury of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/30"
              >
                Schedule a Pickup
              </button>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current text-green-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-cyan-700">The Process.</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">Four effortless steps to a wardrobe that feels brand new again.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className={`group ${step.bgClass} p-8 rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/60 group-hover:bg-blue-600 flex items-center justify-center text-2xl font-black text-blue-600 group-hover:text-white transition-all duration-300 mb-6 shadow-sm relative z-10 backdrop-blur-sm">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3 relative z-10">{step.title}</h3>
                <p className="text-zinc-700 font-medium leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="py-32 bg-gradient-to-tl from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-cyan-700">Premium Services.</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">Transparent pricing. Uncompromising quality.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className={`relative overflow-hidden ${service.bgClass} rounded-[2rem] p-8 border border-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}>
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${service.color}-500/10 rounded-bl-[3rem] -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 relative z-10">{service.name}</h3>
                <div className="flex items-baseline gap-1 mb-4 relative z-10">
                  <span className="text-3xl font-black text-zinc-900">{service.price}</span>
                  <span className="text-zinc-500 font-medium text-sm">{service.unit}</span>
                </div>
                <p className="text-zinc-600 font-medium leading-relaxed relative z-10 text-sm mb-6">{service.desc}</p>
                
                <ul className="space-y-3 relative z-10 border-t border-zinc-100 pt-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                      <div className={`w-5 h-5 rounded-full bg-zinc-50 flex items-center justify-center shrink-0`}>
                        <svg className={`w-3 h-3 ${service.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Book Your First Pickup
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 text-center border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-2xl font-black text-white tracking-tighter mb-8">
            Lucknow<span className="text-blue-500">Laundry</span>
          </div>
          <p className="mb-4 font-medium">Lucknow Doorstep Laundry © {new Date().getFullYear()}. All rights reserved.</p>
          <p className="text-zinc-600">Elevating fabric care in Lucknow, Uttar Pradesh.</p>
        </div>
      </footer>

      {/* Booking Modal Overlay */}
      {isBookingOpen && (
        <BookingModal onClose={() => setIsBookingOpen(false)} />
      )}
    </div>
  );
}
