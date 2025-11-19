import React, { useEffect, useState, useCallback } from "react";

export default function Babycare() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null); // full-screen product
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch("/data/babycare.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
        else console.error("Invalid JSON structure");
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addToCart = (p) => {
    setCart((c) => [...c, p]);
    alert(`${p.name} added to cart`);
  };

  // open full-screen product page
  const openProduct = (product) => {
    setActiveProduct(product);
    // related products: same brand (exclude itself); fallback: first 4 others
    const sameBrand = products.filter((x) => x.brand === product.brand && x.id !== product.id);
    setRelated(sameBrand.length ? sameBrand : products.filter((x) => x.id !== product.id).slice(0, 4));
    // lock scrolling
    document.body.style.overflow = "hidden";
  };

  const closeProduct = useCallback(() => {
    setActiveProduct(null);
    setRelated([]);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeProduct();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProduct]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
        <div className="bg-baby-pink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/assets/Babycare/babycare_banner.jpg"
              alt="Baby Care Products"
              className="rounded-lg shadow-2xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl"
              onError={(e) => e.target.src = "https://via.placeholder.com/1200x400/EC4899/FFFFFF?text=Baby+Care+Products"}
            />
          </div>
        </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Babycare Essentials</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border"
              onClick={() => openProduct(p)}
            >
              <div className="h-44 flex items-center justify-center overflow-hidden rounded-t-lg bg-white">
                <img src={p.image} alt={p.name} className="object-contain h-full w-full" />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.brand}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-600">{p.price}</div>
                    <div className="text-xs text-gray-400 line-through">{p.originalPrice}</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-screen product page (overlay) */}
      {activeProduct && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeProduct}
          />

          <div className="relative h-full overflow-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Images */}
                  <div className="lg:w-1/2 p-6 bg-gray-50 flex flex-col gap-4">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-96 object-contain rounded-md bg-white"
                    />

                    {/* small thumbnails (related images from same brand currently shown as related products) */}
                    <div className="flex gap-3 overflow-x-auto pt-2">
                      {related.map((r) => (
                        <img
                          key={r.id}
                          src={r.image}
                          alt={r.name}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="lg:w-1/2 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{activeProduct.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">{activeProduct.brand}</p>
                      </div>

                      <button
                        onClick={closeProduct}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="text-2xl font-bold text-green-600">{activeProduct.price}</div>
                      <div className="text-sm text-gray-400 line-through">{activeProduct.originalPrice}</div>
                      <div className="mt-2 text-sm text-gray-600">Save: {activeProduct.savings}</div>
                    </div>

                    <div className="mt-6 space-y-3 text-gray-700 text-sm">
                      <div>
                        <h4 className="font-semibold">Description</h4>
                        <p className="mt-1">{activeProduct.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Composition</h4>
                        <p className="mt-1">{activeProduct.composition}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Ingredients</h4>
                        <p className="mt-1">{activeProduct.ingredients}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Usage</h4>
                        <p className="mt-1">{activeProduct.usage}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Suitable For</h4>
                        <p className="mt-1">{activeProduct.suitableFor}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Highlights</h4>
                        <ul className="list-disc ml-5 mt-1">
                          {activeProduct.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={() => addToCart(activeProduct)}
                        className="bg-pink-600 text-white px-6 py-3 rounded font-semibold"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => alert("Proceed to buy - not implemented")}
                        className="border border-gray-300 px-6 py-3 rounded"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Related products area */}
                <div className="p-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Related products</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {related.map((r) => (
                      <div
                        key={r.id}
                        className="bg-white rounded-lg shadow-sm border cursor-pointer p-3"
                        onClick={() => openProduct(r)}
                      >
                        <div className="h-32 flex items-center justify-center overflow-hidden">
                          <img src={r.image} alt={r.name} className="object-contain h-full w-full" />
                        </div>
                        <h4 className="text-sm font-semibold mt-2 line-clamp-2">{r.name}</h4>
                        <div className="text-sm text-green-600 mt-1">{r.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
