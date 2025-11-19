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

  // Similar + You might also like refs
  const simScrollRef = useRef(null);
  const likeScrollRef = useRef(null);

  // Disable arrow state
  const [simAtStart, setSimAtStart] = useState(true);
  const [simAtEnd, setSimAtEnd] = useState(false);

  const price = (v) => (typeof v === "number" ? Math.round(v) : v);

  /* ------------------------------------------------------
        LOAD PRODUCT + NORMALIZE
  ------------------------------------------------------ */
  useEffect(() => {
    const data = Diabetes.product || Diabetes;

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

  /* ------------------------------------------------------
        CHECK SIMILAR PRODUCT SCROLL (disable arrows)
  ------------------------------------------------------ */
  useEffect(() => {
    const el = simScrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setSimAtStart(el.scrollLeft <= 5);
      setSimAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
    };

    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  /* ------------------------------------------------------
        QTY
  ------------------------------------------------------ */
  const inc = () => setQty((v) => v + 1);
  const dec = () => setQty((v) => (v > 1 ? v - 1 : 0));

  if (!product)
    return <div className="p-6 text-center text-lg">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* ====================================================
            TOP SECTION (IMAGES + PRICE + CART)
      ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT IMAGE SECTION */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex gap-8 w-full">

            {/* THUMBNAILS */}
            <div className="flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`
                    w-16 h-16 rounded-2xl overflow-hidden border 
                    ${
                      mainImage === img
                        ? "border-black shadow-lg"
                        : "border-gray-300 shadow-sm"
                    }
                  `}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 bg-white border shadow-md rounded-2xl p-6 flex justify-center items-center">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[350px] md:h-[400px] object-contain"
              />
            </div>
          </div>

          {/* PRICE + ADD TO CART */}
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

        {/* RIGHT COLUMN — DETAILS */}
        <div className="col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{product.name}</h1>

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
                <span className="line-through text-gray-400">₹{price(product.cost)}</span>
                <span className="text-green-600 font-bold">
                  {Math.round(
                    ((product.cost - product.final_price) / product.cost) * 100
                  )}% OFF
                </span>
              </>
            )}
          </div>

          {/* OFFERS */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Coupons & Offers</h3>
            <ul className="mt-3 text-gray-700 text-sm space-y-1">
              <li>✔ Assured Cashback From CRED</li>
              <li>✔ Bank Discounts</li>
              <li>✔ UPI Cashback</li>
            </ul>
          </div>

          {/* INFO BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="border p-3 rounded-lg text-center text-sm">
              <div className="font-semibold">Brand</div>
              <div>{product.brand || "-"}</div>
            </div>

            <div className="border p-3 rounded-lg text-center text-sm">
              <div className="font-semibold">Manufacturer</div>
              <div>{product.manufacturer || "-"}</div>
            </div>

            <div className="border p-3 rounded-lg text-center text-sm">
              <div className="font-semibold">Stock</div>
              <div>{product.stock || "-"}</div>
            </div>
          </div>

        </div>
      </div>

      {/* ====================================================
            HIGHLIGHTS
      ==================================================== */}
      <div className="mt-10 bg-white border p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">Highlights</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Product Type:</strong> {product.highlights?.product_type || "-"}</p>
          <p><strong>Pack Size:</strong> {product.highlights?.pack_size || "-"}</p>
          <p><strong>Shelf Life:</strong> {product.highlights?.shelf_life || "-"}</p>
          <p><strong>Country of Origin:</strong> {product.highlights?.country_of_origin || "-"}</p>
        </div>

        {product.highlights?.description && (
          <p className="mt-4 text-gray-700">{product.highlights.description}</p>
        )}
      </div>

      {/* ====================================================
            INFORMATION
      ==================================================== */}
      <div className="mt-10 bg-white border p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Information</h2>

        <p><strong>Ingredients:</strong> {product.ingredients || "-"}</p>
        <p><strong>Weight:</strong> {product.weight || "-"}</p>

        <h3 className="font-semibold mt-4">Disclaimer</h3>
        <p className="text-gray-600">{product.information?.disclaimer || "-"}</p>

        <h3 className="font-semibold mt-4">Seller</h3>
        <p><strong>Seller:</strong> {product.seller_name || "-"}</p>
        <p><strong>Address:</strong> {product.seller_address || "-"}</p>
        <p><strong>License:</strong> {product.seller_license || "-"}</p>
      </div>

      {/* ====================================================
            SIMILAR PRODUCTS
      ==================================================== */}
      <div className="mt-12 relative">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>

        {/* LEFT ARROW */}
        <button
          disabled={simAtStart}
          onClick={() =>
            simScrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
          }
          className={`
            hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg 
            justify-center items-center
            ${
              simAtStart
                ? "opacity-30 cursor-not-allowed bg-gray-300"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          disabled={simAtEnd}
          onClick={() =>
            simScrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
          }
          className={`
            hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg 
            justify-center items-center
            ${
              simAtEnd
                ? "opacity-30 cursor-not-allowed bg-gray-300"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          ❯
        </button>

        {/* SCROLLER */}
        <div
          ref={simScrollRef}
          className="flex overflow-x-auto gap-5 no-scrollbar scroll-smooth pb-4 px-1"
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
                to={`/ProductDetail/DiabetesCareDetail/${sim.id}`}
                className="min-w-[210px] border bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition"
              >
                <img src={simImg} className="h-28 object-contain mx-auto" />
                <p className="text-sm font-semibold leading-tight line-clamp-2 mt-2">
                  {sim.name}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                    ₹{price(sim.final_price)}
                  </span>

                  {sim.cost && (
                    <span className="line-through text-gray-400 text-sm">
                      ₹{price(sim.cost)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ====================================================
            YOU MIGHT ALSO LIKE
      ==================================================== */}
      <div className="mt-12 relative">
        <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>

        {/* LEFT ARROW */}
        <button
          onClick={() =>
            likeScrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="
            hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 
            bg-white rounded-full shadow-lg justify-center items-center hover:bg-gray-100
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
            hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 
            bg-white rounded-full shadow-lg justify-center items-center hover:bg-gray-100
          "
        >
          ❯
        </button>

        {/* PRODUCT SCROLLER */}
        <div
          ref={likeScrollRef}
          className="flex overflow-x-auto gap-5 no-scrollbar scroll-smooth pb-4"
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
                to={`/ProductDetail/DiabetesCareDetail/${sim.id}`}
                className="min-w-[210px] border bg-white rounded-xl p-4 shadow-sm"
              >
                <img src={simImg} className="h-28 object-contain mx-auto" />
                <p className="text-sm font-semibold mt-2 line-clamp-2">
                  {sim.name}
                </p>
                <p className="text-green-700 font-bold mt-2">
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

export default DiabetesCareDetail;
