// src/pages/ProductDetail/Detail/DiabetesCareDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Diabetes from "../../data/Diabetes.json";

const DiabetesCareDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(0);

  const scrollRef = useRef(null);
  const likeScrollRef = useRef(null);

  /* ------------------------------------------
      SAFE PRICE FORMATTER
  -------------------------------------------*/
  const price = (v) => (typeof v === "number" ? Math.round(v) : v);

  /* ------------------------------------------
      LOAD & MERGE DATA FROM Diabetes.json
  -------------------------------------------*/
  useEffect(() => {
    const data = Diabetes.product || Diabetes;

    let merged = [];
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) merged = merged.concat(data[key]);
    });

    setAllProducts(merged);

    const found = merged.find((p) => String(p.id) === String(id));

    if (!found) return;

    // Normalize images
    let imgs = [];
    if (Array.isArray(found.images)) imgs = found.images;
    else if (typeof found.images === "string") imgs = [found.images];
    else if (found.images?.url) imgs = [found.images.url];

    setProduct({ ...found, images: imgs });
    setMainImage(imgs[0] || "");
  }, [id]);

  if (!product) return <div className="p-6 text-center">Product not found</div>;

  const inc = () => setQty((v) => v + 1);
  const dec = () => setQty((v) => (v > 1 ? v - 1 : 0));

  /* ---------------------------------------------------
            RENDER UI
  ----------------------------------------------------*/
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* ===========================
          TOP SECTION
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex gap-8 w-full">

            {/* THUMBNAILS */}
            <div className="flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden bg-white border-[1px] transition-all ${
                    mainImage === img
                      ? "border-black shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                      : "border-gray-300 shadow-sm"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex-1 bg-white border border-gray-200 rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-6 flex justify-center items-center">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[350px] md:h-[400px] object-contain rounded-[22px]"
              />

              {/* NEXT ARROW */}
              <div className="absolute bottom-4 right-4 w-9 h-9 bg-white border rounded-full shadow-md flex justify-center items-center text-gray-600 text-lg cursor-pointer">
                ❯
              </div>
            </div>
          </div>

          {/* PRICE + ADD CART */}
          <div className="w-full flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white px-3 py-1 text-lg font-bold rounded-md">
                ₹{price(product.final_price)}
              </span>

              {product.cost && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{price(product.cost)}
                </span>
              )}
            </div>

            {qty === 0 ? (
              <button
                onClick={inc}
                className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold"
              >
                Add To Cart
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-gray-100 px-4 py-1 rounded-xl">
                <button onClick={dec} className="text-2xl">−</button>
                <span className="text-lg font-bold">{qty}</span>
                <button onClick={inc} className="text-2xl">+</button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="bg-green-600 text-white px-2 py-1 rounded">
              ⭐ {product.rating}
            </span>
            <span className="text-gray-500">(120k reviews)</span>
          </div>

          {/* PRICE ROW */}
          <div className="flex items-center gap-4 mt-5">
            <span className="text-3xl font-bold text-green-700">
              ₹{price(product.final_price)}
            </span>
            {product.cost && (
              <>
                <span className="line-through text-gray-400 text-lg">
                  ₹{price(product.cost)}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  {Math.round(((product.cost - product.final_price) / product.cost) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* OFFERS */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Coupons & Offers</h3>
            <ul className="mt-3 text-gray-700 text-sm space-y-1">
              <li>✔ Assured Cashback From CRED</li>
              <li>✔ 10% bank discounts</li>
              <li>✔ UPI cashback offers</li>
            </ul>
          </div>

          {/* INFO TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">
            <div className="border p-3 rounded-lg text-sm">
              <b>Brand</b>
              <p>{product.brand || "-"}</p>
            </div>
            <div className="border p-3 rounded-lg text-sm">
              <b>Manufacturer</b>
              <p>{product.manufacturer || product.manufactured_by || "-"}</p>
            </div>
            <div className="border p-3 rounded-lg text-sm">
              <b>Stock</b>
              <p>{product.stock ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
            HIGHLIGHTS
      ============================ */}
      <div className="mt-10 bg-white border p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">Highlights</h2>

        <p><b>Product Type:</b> {product.highlights?.product_type || "-"}</p>
        <p><b>Pack Size:</b> {product.highlights?.pack_size || "-"}</p>
        <p><b>Shelf Life:</b> {product.highlights?.shelf_life || "-"}</p>
        <p><b>Country of Origin:</b> {product.highlights?.country_of_origin || "-"}</p>
      </div>

      {/* ===========================
            INFORMATION
      ============================ */}
      <div className="mt-10 bg-white border p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">Information</h2>

        <p><b>Ingredients:</b> {product.ingredients || "-"}</p>
        <p><b>Weight:</b> {product.weight || "-"}</p>

        <h3 className="font-semibold mt-4">Disclaimer</h3>
        <p className="text-gray-600">{product.information?.disclaimer || "—"}</p>

        <h3 className="font-semibold mt-4">Usage Instruction</h3>
        <p className="text-gray-600">{product.information?.usage_instruction || "—"}</p>
      </div>

      {/* ===========================
            SIMILAR PRODUCTS
      ============================ */}
      <div className="mt-12 relative">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>

        {/* LEFT ARROW */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
          className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full justify-center items-center"
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
          className="hidden md:flex absolute -right-20 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full justify-center items-center"
        >
          ❯
        </button>

        {/* SCROLLER */}
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth pb-3">
          {allProducts.slice(0, 12).map((sim) => {
            const simImg = Array.isArray(sim.images)
              ? sim.images[0]
              : typeof sim.images === "string"
              ? sim.images
              : "";

            return (
              <Link
                key={sim.id}
                to={`/ProductDetail/DiabetesCareDetail/${sim.id}`}
                className="min-w-[150px] p-3 border rounded-xl bg-white shadow-sm"
              >
                <img src={simImg} className="h-24 object-contain mx-auto" />
                <p className="text-sm mt-2 font-semibold">{sim.name}</p>
                <p className="text-green-600 font-bold">₹{price(sim.final_price)}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ===========================
            YOU MIGHT ALSO LIKE
      ============================ */}
      <div className="mt-12 relative">
        <h2 className="text-xl font-bold mb-4">You might also like</h2>

        {/* LEFT ARROW */}
        <button
          onClick={() => likeScrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
          className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full justify-center items-center"
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => likeScrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
          className="hidden md:flex absolute -right-20 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full justify-center items-center"
        >
          ❯
        </button>

        {/* SCROLLER */}
        <div ref={likeScrollRef} className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth pb-3">
          {allProducts.slice(12, 28).map((sim) => {
            const simImg = Array.isArray(sim.images)
              ? sim.images[0]
              : typeof sim.images === "string"
              ? sim.images
              : "";

            return (
              <Link
                key={sim.id}
                to={`/ProductDetail/DiabetesCareDetail/${sim.id}`}
                className="min-w-[150px] p-3 border rounded-xl bg-white shadow-sm"
              >
                <img src={simImg} className="h-24 object-contain mx-auto" />
                <p className="text-sm mt-2 font-semibold">{sim.name}</p>
                <p className="text-green-600 font-bold">₹{price(sim.final_price)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiabetesCareDetail;
