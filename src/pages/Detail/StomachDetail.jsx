// src/pages/ProductDetail/Detail/TemplateDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import DataFile from "../../data/Stomach.json"; // replace per category

const StomachDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(0);
  const scrollRef = useRef(null);
  const likeScrollRef = useRef(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [simQty, setSimQty] = useState({});

  // Safe number formatter
  const price = (v) => (typeof v === "number" ? Math.round(v) : v);

  /* ------------------------------------------------------
     LOAD + NORMALIZE PRODUCT
  ------------------------------------------------------ */
  useEffect(() => {
    const data = DataFile.product || DataFile;

    let merged = [];
    Object.keys(data).forEach((cat) => {
      if (Array.isArray(data[cat])) merged = merged.concat(data[cat]);
    });

    setAllProducts(merged);

    const found = merged.find((p) => String(p.id) === String(id));

    if (!found) return;

    let imgs = [];
    if (Array.isArray(found.images)) imgs = found.images;
    else if (typeof found.images === "string") imgs = [found.images];
    else if (found.images?.url) imgs = [found.images.url];

    setProduct({ ...found, images: imgs });
    setMainImage(imgs[0] || "");
  }, [id]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setAtStart(el.scrollLeft <= 5);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
    };

    el.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const simInc = (id) => {
    setSimQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const simDec = (id) =>
    setSimQty((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));

  if (!product) return <div className="p-6 text-center">Product not found</div>;

  const inc = () => setQty((v) => v + 1);
  const dec = () => setQty((v) => (v > 1 ? v - 1 : 0));

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* ====================================================
          TOP SECTION
      ===================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        {/* LEFT COLUMN (Screenshot 2 layout) */}
        <div className="flex flex-col items-center md:items-start gap-4">
          {/* LEFT IMAGE SECTION — EXACT LIKE ZEPTO */}
          <div className="flex gap-8 w-full">
            {/* THUMBNAILS LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`
          w-16 h-16 
          rounded-2xl 
          overflow-hidden 
          bg-white 
          border-[1px]
          transition-all
          ${
            mainImage === img
              ? "border-black shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
              : "border-gray-300 shadow-sm"
          }
        `}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE RIGHT SIDE */}
            <div
              className="
      relative 
      flex-1
      bg-white 
      border 
      border-gray-200 
      rounded-[15px] 
      shadow-[0_10px_25px_rgba(0,0,0,0.06)] 
      p-6 
      flex justify-center items-center
    "
            >
              <img
                src={mainImage}
                alt={product.name}
                className="
        w-full 
        h-[350px] md:h-[400px] 
        object-contain 
        rounded-[22px]
      "
              />

              {/* RIGHT ARROW ICON */}
              <div
                className="
        absolute bottom-4 right-4 
        w-9 h-9 
        bg-white 
        border 
        rounded-full 
        shadow-md 
        flex justify-center items-center 
        text-gray-600 
        text-lg 
        cursor-pointer
      "
              >
                ❯
              </div>
            </div>
          </div>

          {/* PRICE + ADD TO CART ROW */}
          <div className="w-full flex items-center justify-between mt-2">
            {/* Price Box (Left) */}
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

            {/* Add To Cart (Right) */}
            {qty === 0 ? (
              <button
                onClick={inc}
                className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition"
              >
                Add To Cart
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-gray-100 px-4 py-1 rounded-xl">
                <button onClick={dec} className="text-2xl">
                  −
                </button>
                <span className="text-lg font-bold">{qty}</span>
                <button onClick={inc} className="text-2xl">
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          {/* TITLE */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* NET QTY + RATING */}
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="bg-green-600 text-white px-2 py-1 rounded">
              ⭐ {product.rating}
            </span>
            <span className="text-gray-500">(120k reviews)</span>
            {product.net_quantity && (
              <span className="ml-4 text-gray-600">
                Net Qty: {product.net_quantity}
              </span>
            )}
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
                  {Math.round(
                    ((product.cost - product.final_price) / product.cost) * 100
                  )}
                  % OFF
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

            {/* ZEPPTO ICON BOXES */}
          </div>

          {/* INFO TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">
            <div className="border p-3 rounded-lg text-sm">
              <div className="font-semibold">Brand</div>
              <div className="text-gray-700">{product.brand || "-"}</div>
            </div>
            <div className="border p-3 rounded-lg text-sm">
              <div className="font-semibold">Manufacturer</div>
              <div className="text-gray-700">
                {product.manufacturer || product.manufactured_by || "-"}
              </div>
            </div>
            <div className="border p-3 rounded-lg text-sm">
              <div className="font-semibold">Stock</div>
              <div className="text-gray-700">{product.stock ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          HIGHLIGHTS BOX
      ===================================================== */}
      <div className="mt-10 bg-white border p-8 rounded-xl  shadow-sm">
        <h2 className="text-xl font-bold mb-6 ">Highlights</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <strong>Product Type:</strong>{" "}
            {product.highlights?.product_type || "-"}
          </p>
          <p>
            <strong>Pack Size:</strong> {product.highlights?.pack_size || "-"}
          </p>
          <p>
            <strong>Shelf Life:</strong> {product.highlights?.shelf_life || "-"}
          </p>
          <p>
            <strong>Country of Origin:</strong>{" "}
            {product.highlights?.country_of_origin || "-"}
          </p>
        </div>

        {product.highlights?.description && (
          <p className="mt-4 text-gray-700">{product.highlights.description}</p>
        )}
      </div>

      {/* ====================================================
          INFORMATION BOX
      ===================================================== */}
      <div className="mt-10 bg-white border p-8 pr-2 rounded-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Information</h2>

        <p>
          <strong>Ingredients:</strong> {product.ingredients || "-"}
        </p>
        <p>
          <strong>Weight:</strong> {product.weight || "-"}
        </p>

        <h3 className="font-semibold mt-4">Disclaimer</h3>
        <p className="text-gray-600">
          {product.information?.disclaimer || "—"}
        </p>

        <h3 className="font-semibold mt-4">Usage Instruction</h3>
        <p className="text-gray-600">
          {product.information?.usage_instruction || "—"}
        </p>

        <h3 className="font-semibold mt-4">Seller Details</h3>
        <p>
          <strong>Seller:</strong> {product.seller_name || "-"}
        </p>
        <p>
          <strong>Address:</strong> {product.seller_address || "-"}
        </p>
        <p>
          <strong>License:</strong> {product.seller_license || "-"}
        </p>
      </div>

      {/* ====================================================
          SIMILAR PRODUCTS
      ===================================================== */}
      {/* ====================================================
    SIMILAR PRODUCTS (FINAL WORKING ARROWS)
==================================================== */}
      <div className="mt-12 relative">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>

        {/* LEFT ARROW */}
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="
      hidden md:flex
      absolute -left-20 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full
      justify-center items-center text-gray-700
      hover:bg-gray-100
      z-20
    "
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="
      hidden md:flex
      absolute -right-20 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full
      justify-center items-center text-gray-700
      hover:bg-gray-100
      z-20
    "
        >
          ❯
        </button>

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="
      flex overflow-x-auto gap-4 pb-3 no-scrollbar
      scroll-smooth px-1
    "
        >
          {allProducts.slice(0, 12).map((sim) => {
            const simImg = Array.isArray(sim.images)
              ? sim.images[0]
              : typeof sim.images === "string"
                ? sim.images
                : "";

            return (
              <Link
                key={sim.id}
                to={`/ProductDetail/StomachDetail/${sim.id}`}
                className="min-w-[150px] p-3 border rounded-xl bg-white shadow-sm"
              >
                <img src={simImg} className="h-24 object-contain mx-auto" />
                <p className="text-sm mt-2 font-semibold">{sim.name}</p>
                <p className="text-green-600 font-bold">
                  ₹{price(sim.final_price)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          YOU MIGHT ALSO LIKE
      ===================================================== */}

    {/* ====================================================
    YOU MIGHT ALSO LIKE  (FINAL FIXED ARROWS)
==================================================== */}
<div className="mt-12 relative">
  <h2 className="text-xl font-bold mb-4">You might also like</h2>

  {/* LEFT ARROW */}
  <button
    onClick={() =>
      likeScrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
    className="
      hidden md:flex
      absolute -left-20 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full
      justify-center items-center text-gray-700
      hover:bg-gray-100
      z-20
    "
  >
    ❮
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={() =>
      likeScrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
    className="
      hidden md:flex
      absolute -right-20 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full
      justify-center items-center text-gray-700
      hover:bg-gray-100
      z-20
    "
  >
    ❯
  </button>

  {/* SCROLLER */}
  <div
    ref={likeScrollRef}
    className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
  >
    {allProducts.slice(12, 28).map((sim) => {
      const simImg = Array.isArray(sim.images)
        ? sim.images[0]
        : typeof sim.images === "string"
        ? sim.images
        : "";

      return (
        <Link
          key={sim.id}
          to={`/ProductDetail/StomachDetail/${sim.id}`}
          className="min-w-[150px] p-3 border rounded-xl bg-white shadow-sm"
        >
          <img src={simImg} className="h-24 object-contain mx-auto" />
          <p className="text-sm mt-2 font-semibold">{sim.name}</p>
          <p className="text-green-600 font-bold">
            ₹{price(sim.final_price)}
          </p>
        </Link>
      );
    })}
  </div>
</div>

    </div>
  );
};

export default StomachDetail;
