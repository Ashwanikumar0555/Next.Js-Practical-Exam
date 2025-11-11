// components/ItemActions.js
"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ItemActions({ item }) {
  const [quantity, setQuantity] = useState(1);
  const total = item.price * quantity;

  const addToCart = () => {
    // Example: store in localStorage (simple demo)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${item.name} (x${quantity}) added to cart`);
  };

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 text-xl font-bold text-gray-600 hover:text-orange-500"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span className="text-lg font-semibold text-gray-800">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 text-xl font-bold text-gray-600 hover:text-orange-500"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="ml-auto text-right">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-xl font-bold text-green-600">₹{total}</div>
        </div>
      </div>

      <button
        onClick={addToCart}
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
      >
        Add to Cart
      </button>
    </div>
  );
}
