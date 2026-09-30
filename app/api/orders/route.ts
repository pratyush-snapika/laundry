import { NextResponse } from 'next/server';

// Temporary in-memory store for demo purposes if DB is not connected
const globalForOrders = global as unknown as { mockOrders: any[] };
if (!globalForOrders.mockOrders) {
  globalForOrders.mockOrders = [
    {
      id: "KD1024",
      customerName: "John Doe",
      service: "Wash & Fold",
      status: "NEW",
      vendor: null,
      date: new Date().toISOString()
    },
    {
      id: "KD1023",
      customerName: "Jane Smith",
      service: "Premium Laundry",
      status: "PICKUP SCHEDULED",
      vendor: "Ramesh",
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ];
}

export async function GET() {
  return NextResponse.json(globalForOrders.mockOrders);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const newOrder = {
    id: `KD${1000 + Math.floor(Math.random() * 9000)}`,
    customerName: data.fullName,
    service: data.service,
    status: "NEW",
    vendor: null,
    date: new Date().toISOString()
  };

  globalForOrders.mockOrders.unshift(newOrder);

  return NextResponse.json({ success: true, order: newOrder });
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { id, status, vendor } = data;

  const orderIndex = globalForOrders.mockOrders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  globalForOrders.mockOrders[orderIndex] = {
    ...globalForOrders.mockOrders[orderIndex],
    status: status || globalForOrders.mockOrders[orderIndex].status,
    vendor: vendor || globalForOrders.mockOrders[orderIndex].vendor
  };

  return NextResponse.json({ success: true, order: globalForOrders.mockOrders[orderIndex] });
}
