"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  // Fetch order on page load
  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
          setNewStatus(data.status);
        } else {
          toast.error(data.error || "Order not found");
        }
      } catch (error) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  // PATCH order (update)
  async function handleUpdate() {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrder(data);
        toast.success("Order updated successfully ✅");
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-500">
        Order not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-100 flex justify-center items-center p-6">
      <Toaster position="top-center" />

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">🧾 Order #{order.id}</h1>

        <div className="text-gray-700 text-lg space-y-2">
          <p>
            <span className="font-semibold">Item:</span> {order.item}
          </p>
          <p>
            <span className="font-semibold">Current Status:</span>{" "}
            <span
              className={`${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Pending"
                  ? "text-orange-600"
                  : "text-blue-600"
              } font-medium`}
            >
              {order.status}
            </span>
          </p>
        </div>

        {/* Update Form */}
        <div className="mt-6">
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            onClick={handleUpdate}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
