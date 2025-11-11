"use client";
import { useState } from "react";

export default function MenuPage() {
  const [cart, setCart] = useState([]);

  const items = [
    { id: 1, name: "Margherita Pizza", price: 250, image: "/pizza.jpg" },
    { id: 2, name: "Veg Burger", price: 180, image: "/burger.jpg" },
    { id: 3, name: "Cold Coffee", price: 120, image: "/coffee.jpg" },
  ];

  const addToCart = (item) => {
    if (!cart.find((c) => c.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
          🍔 Cafe Menu
        </h1>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 mt-1 mb-3">₹{item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🛒 Your Cart</h2>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">₹{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span className="font-semibold text-gray-700 text-lg">Total:</span>
              <span className="font-bold text-green-600 text-lg">₹{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
