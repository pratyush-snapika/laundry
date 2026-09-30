import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Customers
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        whatsapp TEXT,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Addresses
    await sql`
      CREATE TABLE IF NOT EXISTS addresses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        address_line TEXT NOT NULL,
        area TEXT NOT NULL,
        pincode TEXT NOT NULL,
        landmark TEXT,
        latitude DECIMAL,
        longitude DECIMAL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Vendors
    await sql`
      CREATE TABLE IF NOT EXISTS vendors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        business_name TEXT,
        status TEXT DEFAULT 'ACTIVE',
        service_area TEXT,
        payout_rule JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 4. Services
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        pricing_unit TEXT NOT NULL,
        price DECIMAL NOT NULL,
        minimum_order_value DECIMAL DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 5. Offers
    await sql`
      CREATE TABLE IF NOT EXISTS offers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        discount_type TEXT NOT NULL,
        discount_value DECIMAL NOT NULL,
        min_order_value DECIMAL DEFAULT 0,
        max_discount DECIMAL,
        start_at TIMESTAMPTZ,
        end_at TIMESTAMPTZ,
        usage_limit INTEGER,
        usage_count INTEGER DEFAULT 0,
        active BOOLEAN DEFAULT TRUE
      );
    `;

    // 6. Orders
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number TEXT UNIQUE NOT NULL,
        customer_id UUID REFERENCES customers(id),
        address_id UUID REFERENCES addresses(id),
        vendor_id UUID REFERENCES vendors(id),
        service_id UUID REFERENCES services(id),
        estimated_weight TEXT,
        actual_weight DECIMAL,
        price_per_unit DECIMAL,
        subtotal DECIMAL,
        offer_id UUID REFERENCES offers(id),
        discount_amount DECIMAL DEFAULT 0,
        final_price DECIMAL,
        pickup_date DATE,
        pickup_slot TEXT,
        status TEXT DEFAULT 'NEW',
        payment_status TEXT DEFAULT 'PENDING',
        payment_method TEXT,
        amount_collected DECIMAL,
        picked_up_at TIMESTAMPTZ,
        delivered_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Seed Data for Services
    await sql`
      INSERT INTO services (name, pricing_unit, price, minimum_order_value) 
      VALUES 
      ('Wash & Fold', 'per kg', 79, 399),
      ('Wash & Iron', 'per kg', 99, 399),
      ('Premium Laundry', 'per kg', 149, 399),
      ('Dry Cleaning', 'per piece', 250, 0)
      ON CONFLICT DO NOTHING;
    `;

    return NextResponse.json({ message: 'Database initialized successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
