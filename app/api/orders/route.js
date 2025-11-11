import { NextResponse } from "next/server";

let orders = [
  { id: 1, item: "Pizza" },
  { id: 2, item: "Burger" },
];

// 🧠 GET → Fetch all orders
export async function GET() {
  return NextResponse.json(orders);
}

// 🧾 POST → Add a new order
export async function POST(request) {
  try {
    const newOrder = await request.json();

    // Simple validation
    if (!newOrder.item) {
      return NextResponse.json(
        { error: "Item name is required" },
        { status: 400 }
      );
    }

    // Auto-increment ID
    const id = orders.length ? orders[orders.length - 1].id + 1 : 1;
    const order = { id, ...newOrder };

    orders.push(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
