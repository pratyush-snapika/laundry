"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  const handleAssignVendor = async (orderId: string, vendorName: string) => {
    if (!vendorName) return;

    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: orderId, 
          vendor: vendorName,
          status: 'ASSIGNED'
        })
      });
      // Refresh list
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'customers', label: 'Customers' },
    { id: 'pricing', label: 'Pricing & Services' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-400 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-white tracking-tighter">
            Lucknow<span className="text-blue-500">Admin</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-500' 
                  : 'hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 h-16 flex items-center px-8 justify-between">
          <h2 className="text-xl font-bold text-zinc-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-600">Admin User</span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">A</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-medium text-zinc-500 mb-1">Today's Orders</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900">{orders.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-medium text-zinc-500 mb-1">Pending Pickups</p>
                  <h3 className="text-4xl font-extrabold text-amber-600">{orders.filter(o => o.status === 'NEW' || o.status === 'ASSIGNED').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-medium text-zinc-500 mb-1">Processing</p>
                  <h3 className="text-4xl font-extrabold text-blue-600">0</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-medium text-zinc-500 mb-1">Today's Revenue</p>
                  <h3 className="text-4xl font-extrabold text-green-600">₹0</h3>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 mb-6">Recent Orders</h3>
              <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-zinc-900">Order ID</th>
                      <th className="px-6 py-4 font-semibold text-zinc-900">Customer</th>
                      <th className="px-6 py-4 font-semibold text-zinc-900">Service</th>
                      <th className="px-6 py-4 font-semibold text-zinc-900">Status</th>
                      <th className="px-6 py-4 font-semibold text-zinc-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {orders.map((order, i) => (
                      <tr key={i} className="hover:bg-zinc-50 transition">
                        <td className="px-6 py-4 text-zinc-900 font-bold">{order.id}</td>
                        <td className="px-6 py-4 text-zinc-700 font-medium">{order.customerName}</td>
                        <td className="px-6 py-4 text-zinc-600">{order.service}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            order.status === 'NEW' ? 'bg-blue-100 text-blue-700' : 
                            order.status === 'ASSIGNED' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status}
                          </span>
                          {order.vendor && <div className="text-xs text-zinc-500 mt-2 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> {order.vendor}
                          </div>}
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'NEW' ? (
                            <select 
                              onChange={(e) => handleAssignVendor(order.id, e.target.value)}
                              className="border border-zinc-300 rounded-lg px-3 py-2 text-sm font-medium text-zinc-900 bg-white outline-none hover:border-zinc-400 focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                              defaultValue=""
                            >
                              <option value="" disabled>Assign Vendor</option>
                              <option value="Ramesh">Ramesh</option>
                              <option value="Suresh">Suresh</option>
                            </select>
                          ) : (
                            <button className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition">View Details</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Coming Soon</h3>
              <p className="text-zinc-500 max-w-sm mx-auto">The {activeTab} module will be connected to Vercel Postgres once the database is fully initialized.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
