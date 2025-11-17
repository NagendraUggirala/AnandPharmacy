import React from "react";

export default function Profile() {
  const orders = [
    {
      id: 1,
      status: "Order delivered",
      time: "19th Sep 2025, 08:15 pm",
      amount: "₹154.79",
      images: [
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
        "https://cdn-icons-png.flaticon.com/512/888/888859.png",
      ],
    },
    {
      id: 2,
      status: "Order cancelled",
      time: "18th Sep 2025, 11:23 am",
      amount: "₹237.97",
      cancelled: true,
      images: [
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      ],
    },
    {
      id: 3,
      status: "Order delivered",
      time: "19th Aug 2025, 06:42 am",
      amount: "₹82.31",
      images: [
        "https://cdn-icons-png.flaticon.com/512/3480/3480439.png",
      ],
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-white p-6 shadow-md flex flex-col">

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-purple-400 rounded-full"></div>
          <div>
            <h2 className="font-bold text-lg">swetha kandepuneni</h2>
            <p className="text-gray-500">8179808523</p>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-black text-white rounded-lg">
          Add Balance
        </button>

        <div className="mt-10 text-gray-700 space-y-4">
          <div className="cursor-pointer">📦 Orders</div>
          <div className="cursor-pointer">📞 Customer Support</div>
          <div className="cursor-pointer">🎁 Manage Referrals</div>
          <div className="cursor-pointer">🏡 Addresses</div>
          <div className="cursor-pointer">👤 Profile</div>
        </div>

        <button className="mt-auto text-red-500 font-semibold">Log Out</button>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Settings</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {order.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className="w-12 h-12 object-cover rounded-md"
                      alt=""
                    />
                  ))}
                </div>

                <div>
                  <h2 className="font-semibold">
                    {order.status}{" "}
                    {!order.cancelled && <span className="text-green-600">✔</span>}
                    {order.cancelled && <span className="text-gray-500">✖</span>}
                  </h2>
                  <p className="text-gray-500 text-sm">Placed at {order.time}</p>
                </div>
              </div>

              <h3 className="font-semibold">{order.amount} ➤</h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
