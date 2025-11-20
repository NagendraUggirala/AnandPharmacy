// src/pages/SkinCare.jsx
import React, { useEffect, useMemo, useState } from "react";
import productsData from "../../data/skincare.json"; // adjust path if needed
 
export default function SkinCare() {
  // View state: "list" or "product"
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);
 
  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;
 
  // cart persisted to localStorage as object { [id]: qty }
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skincare_cart") || "{}");
    } catch {
      return {};
    }
  });
 
  useEffect(() => {
    try {
      localStorage.setItem("skincare_cart", JSON.stringify(cart));
    } catch { }
  }, [cart]);
 
  // helper to get images array for a product (supports legacy single image)
  const getImages = (p) => {
    if (Array.isArray(p.images) && p.images.length > 0) return p.images.slice(0, 5);
    // if single image provided use it + generate placeholders (Unsplash) to fill up to 5
    const base = p.image || `https://source.unsplash.com/1200x1200/?skincare,pharmacy&sig=${p.id}`;
    const imgs = [base];
    for (let i = 1; i < 5; i++) {
      // generate unsplash-like placeholder with sig for variety
      imgs.push(`https://source.unsplash.com/1200x1200/?skincare,dermatology&sig=${p.id * 10 + i}`);
    }
    return imgs;
  };
 
  // categories derived from data
  const categories = useMemo(() => {
    const setC = new Set(productsData.map((p) => p.category));
    return ["All", ...Array.from(setC)];
  }, []);
 
  // filtered products by category and query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return productsData.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const hay = `${p.name} ${p.brand} ${p.composition} ${p.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, category]);
 
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const visible = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
 
  // cart operations
  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const increase = (id) => addToCart(id);
  const decrease = (id) =>
    setCart((c) => {
      if (!c[id]) return c;
      const next = { ...c };
      if (next[id] <= 1) delete next[id];
      else next[id] = next[id] - 1;
      return next;
    });
  const remove = (id) =>
    setCart((c) => {
      const copy = { ...c };
      delete copy[id];
      return copy;
    });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = productsData.find((x) => String(x.id) === String(id));
    return sum + (p ? (p.priceNumeric ?? 0) * qty : 0);
  }, 0);
 
  const handleOpenProduct = (p) => {
    setSelected(p);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const handleBack = () => {
    setSelected(null);
    setView("list");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const handleImgError = (e, name) => {
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/800x800?text=${encodeURIComponent(name)}`;
  };
 
  /* ---------- LIST VIEW ---------- */
  function ListView() {
    return (
      <div className="min-h-screen bg-gray-50 pb-36">
        {/* Header / Search */}
        <div className="sticky top-0 z-30 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Dermatology Treatments — Pharma</h1>
              <p className="text-sm text-gray-600">Ointments, lotions, creams & dermatology care</p>
            </div>
 
            <div className="flex-1 max-w-lg">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search products, brands, ingredients..."
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-200"
              />
            </div>
 
            <div className="flex items-center gap-3">
              <div className="text-sm hidden sm:block">ETA: <span className="font-semibold text-green-600">10–20 mins</span></div>
              <div className="bg-white px-3 py-1 rounded border shadow-sm">Cart: <span className="font-semibold">{cartCount}</span></div>
            </div>
          </div>
        </div>
 
        {/* Banner */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="relative overflow-hidden rounded-xl mb-4">
            <div className="w-full h-44 bg-gradient-to-r from-pink-50 to-white rounded-xl flex items-center justify-between px-6">
              <div>
                <h2 className="text-2xl font-bold">Skincare for Dermatology</h2>
                <p className="text-sm text-gray-600 mt-1">Medicines, creams and corrective skincare solutions</p>
              </div>
              <img src="https://source.unsplash.com/600x300/?skincare,pharmacy" alt="banner" className="h-40 object-cover rounded" />
            </div>
          </div>
 
          {/* Category tabs */}
          <div className="overflow-x-auto whitespace-nowrap pb-3 mb-4 border-b">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setPage(1); }}
                className={`px-4 py-2 mr-3 font-semibold rounded-lg ${category === c ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {c}
              </button>
            ))}
          </div>
 
          {/* Product count */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">Showing {filtered.length} items</div>
            <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
          </div>
 
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visible.map((p) => {
              const savePercent = p.originalPriceNumeric ? Math.round(((p.originalPriceNumeric - p.priceNumeric) / p.originalPriceNumeric) * 100) : 0;
              const qty = cart[p.id] || 0;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden group flex flex-col"
                >
                  <div onClick={() => handleOpenProduct(p)} className="cursor-pointer flex-1 flex flex-col">
                    <div className="relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-40 object-cover"
                        onError={(e) => handleImgError(e, p.name)}
                      />
                      <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Save {savePercent}%
                      </div>
                    </div>
 
                    {/* Content */}
                    <div className="p-3 flex flex-col h-full">
                      <h3 className="text-sm font-semibold line-clamp-2 min-h-[32px]">{p.name}</h3>
 
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1 min-h-[16px]">{p.brand}</p>
 
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <div className="text-red-600 font-bold">₹{p.priceNumeric}</div>
                          <div className="text-xs text-gray-400 line-through">₹{p.originalPriceNumeric}</div>
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">{p.composition}</div>
                      </div>
 
                      {/* Push ADD button down */}
                      <div className="mt-auto" />
                    </div>
                  </div>
 
                  {/* ADD / COUNTER (always bottom aligned) */}
                  <div className="p-3 bg-white">
                    {!qty ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p.id);
                        }}
                        className="bg-white border border-green-600 text-green-600 py-2 rounded-lg font-semibold w-full" style={{width:'100px',marginLeft:'50px'}}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center justify-between border border-green-600 rounded-lg px-3 py-2 w-full" style={{width:'100px',marginLeft:'50px'}}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrease(p.id);
                          }}
                          className="text-xl text-red-600"
                        >
                          −
                        </button>
                        <div className="font-semibold">{qty}</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            increase(p.id);
                          }}
                          className="text-xl text-green-600"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
 
              );
            })}
          </div>
 
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1} className="px-3 py-1 rounded border bg-white">Prev</button>
            <div>Page {page} / {totalPages}</div>
            <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border bg-white">Next</button>
          </div>
        </div>
      </div>
    );
  }
 
  /* ---------- PRODUCT VIEW ---------- */
  function ProductView({ p }) {
    const imgs = getImages(p);
    const [mainIdx, setMainIdx] = useState(0);
    const qty = cart[p.id] || 0;
    const savePercent = p.originalPriceNumeric ? Math.round(((p.originalPriceNumeric - p.priceNumeric) / p.originalPriceNumeric) * 100) : 0;
 
    // related: same category
    const related = productsData.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6);
 
    return (
      <div className="min-h-screen bg-white pb-36">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          {/* top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-2xl">←</button>
              <div>
                <div className="text-sm text-gray-500">{p.brand}</div>
                <h1 className="text-2xl font-bold">{p.name}</h1>
              </div>
            </div>
            <div className="text-sm">Cart: <strong>{cartCount}</strong></div>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* left: sticky images */}
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="bg-white rounded-xl border overflow-hidden shadow">
                  <img src={imgs[mainIdx]} alt={`${p.name}-${mainIdx}`} className="w-full h-[60vh] object-contain bg-white" onError={(e) => handleImgError(e, p.name)} />
                </div>
 
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {imgs.map((src, i) => (
                    <button key={i} onClick={() => setMainIdx(i)} className={`rounded-lg overflow-hidden border ${i === mainIdx ? "ring-2 ring-green-600" : ""}`}>
                      <img src={src} alt={`${p.name}-thumb-${i}`} className="w-full h-20 object-cover" onError={(e) => handleImgError(e, p.name)} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
 
            {/* right: content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-red-600">₹{p.priceNumeric}</div>
                <div className="text-sm line-through text-gray-400">₹{p.originalPriceNumeric}</div>
                <div className="text-sm bg-green-600 text-white px-2 py-1 rounded">{savePercent}% OFF</div>
              </div>
 
              {/* add / counter */}
              <div className="mt-4 max-w-xs">
                {!qty ? (
                  <button onClick={() => addToCart(p.id)} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">ADD TO CART • ₹{p.priceNumeric}</button>
                ) : (
                  <div className="flex items-center gap-4 w-full max-w-xs border rounded-lg px-3 py-2">
                    <button onClick={() => decrease(p.id)} className="text-2xl text-red-600">−</button>
                    <div className="font-semibold">{qty}</div>
                    <button onClick={() => increase(p.id)} className="text-2xl text-green-600">+</button>
                    <button onClick={() => remove(p.id)} className="ml-2 text-xs text-red-500">Remove</button>
                  </div>
                )}
              </div>
 
              {/* Overview / Composition */}
              <section className="mt-6">
                <h3 className="text-lg font-semibold">Overview</h3>
                <p className="text-gray-700 mt-2">{p.description}</p>
 
                <div className="mt-3 text-sm text-gray-600">
                  <div><strong>Composition:</strong> {p.composition}</div>
                  <div className="mt-1"><strong>Brand:</strong> {p.brand}</div>
                  <div className="mt-1"><strong>Category:</strong> {p.category}</div>
                </div>
              </section>
 
              {/* Key features */}
              <section className="mt-6">
                <h4 className="text-lg font-semibold">Key features</h4>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  {/* attempt to give useful features from available data */}
                  <li>Pharma-grade formulation</li>
                  <li>Clinically indicated for {p.category.toLowerCase()}</li>
                  <li>Easy to apply topical formulation</li>
                </ul>
              </section>
 
              {/* Uses */}
              <section className="mt-6">
                <h4 className="text-lg font-semibold">Uses</h4>
                <p className="text-gray-700 mt-2">{p.description}</p>
              </section>
 
              {/* Safety */}
              <section className="mt-6">
                <h4 className="text-lg font-semibold">Safety information</h4>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li>For external use only (unless specified for oral tablets).</li>
                  <li>Avoid contact with eyes — in case of contact, rinse thoroughly.</li>
                  <li>Keep out of reach of children — follow doctor prescription.</li>
                </ul>
              </section>
 
              {/* Storage */}
              <section className="mt-6">
                <h4 className="text-lg font-semibold">Storage</h4>
                <p className="text-gray-700 mt-2">Store in a cool, dry place away from direct sunlight. Keep the container tightly closed.</p>
              </section>
 
              {/* You Might Also Like */}
              <section className="mt-8">
                <h4 className="text-lg font-semibold mb-3">You might also like</h4>
                <div className="flex gap-3 overflow-x-auto pb-3">
                  {related.map((r) => (
                    <div key={r.id} onClick={() => handleOpenProduct(r)} className="w-44 bg-white rounded-lg border p-2 shrink-0 cursor-pointer">
                      <img src={r.image} alt={r.name} className="w-full h-24 object-cover rounded" onError={(e) => handleImgError(e, r.name)} />
                      <div className="mt-2 text-sm font-semibold line-clamp-2">{r.name}</div>
                      <div className="text-red-600 font-bold mt-1">₹{r.priceNumeric}</div>
                    </div>
                  ))}
                </div>
              </section>
 
            </div>
          </div>
        </div>
 
        {/* sticky bottom cart summary */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 bg-white border-t">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-gray-500">Subtotal</div>
                <div className="text-lg font-bold">₹{subtotal}</div>
              </div>
              <div className="w-56">
                <button onClick={() => alert("Proceed to checkout (mock)")} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Checkout • {cartCount} items</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  // render main based on view
  return (
    <div>
      {view === "list" ? <ListView /> : (selected ? <ProductView p={selected} /> : <div />)}
    </div>
  );
}
 