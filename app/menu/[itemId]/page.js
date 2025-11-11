// app/menu/[itemId]/page.js
import Image from "next/image";
import ItemActions from "../../components/ItemActions"; // client component for interactions

export default async function ItemPage({ params }) {
  // params is a Promise in this context — unwrap it
  const { itemId } = await params;

  const items = [
    {
      id: 1,
      name: "Margherita Pizza",
      desc: "A classic cheese pizza with a crispy base and melted mozzarella.",
      price: 250,
      image: "/pizza.jpg",
    },
    {
      id: 2,
      name: "Veg Burger",
      desc: "A delicious veg patty loaded with veggies and creamy sauce.",
      price: 180,
      image: "/burger.jpg",
    },
    {
      id: 3,
      name: "Cold Coffee",
      desc: "Chilled cold coffee with cream and a hint of chocolate.",
      price: 120,
      image: "/coffee.jpg",
    },
  ];

  const item = items.find((i) => i.id.toString() === itemId);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Item not found</h2>
          <p className="mt-2 text-gray-600">We could not find the menu item you requested.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-64 md:h-auto relative">
          {/* Use next/image for optimized images. Make sure the file exists in /public */}
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">{item.name}</h1>
            <p className="text-gray-600 mt-3">{item.desc}</p>
            <p className="text-2xl font-semibold text-green-600 mt-4">₹{item.price}</p>
          </div>

          {/* Client-side interactive actions (quantity, add to cart) */}
          <div className="mt-6">
            <ItemActions item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
