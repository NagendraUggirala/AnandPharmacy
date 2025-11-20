// src/pages/Medical/Clopvex_75_Clopidogrel.jsx
import React, { useState } from "react";

const Clopvex_75_Clopidogrel = ({ onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // Only use images that actually exist
  const availableImages = [
    "/assets/Cardiology/Clopvex_75_Clopidogrel.jpg",
    // Add only images that exist in your project
  ].filter(Boolean);

  const medication = {
    id: 1,
    name: "Clopvex 75 Clopidogrel",
    brand: "Clopigold 75",
    price: "₹299",
    originalPrice: "₹450",
    savings: "34%",
    images: availableImages.length > 0 ? availableImages : [
      "https://via.placeholder.com/500x500/DC2626/FFFFFF?text=Clopvex+75+Clopidogrel"
    ],
    description: "It offers fast-acting protection for cardiovascular health. Clopidogrel is an antiplatelet medication that helps prevent blood clots in patients with heart conditions, recent heart attacks, strokes, or peripheral arterial disease.",
    composition: "Clopvex-75 (Clopidogrel 75 mg)",
    dosage: "75mg",
    form: "Tablet",
    packaging: "Strip of 10 tablets",
    manufacturer: "Leading Pharmaceutical Company",
    indications: [
      "Prevention of blood clots",
      "Reduces risk of heart attack",
      "Prevents stroke in high-risk patients",
      "Management of acute coronary syndrome"
    ],
    sideEffects: [
      "Bleeding or bruising",
      "Headache",
      "Dizziness",
      "Stomach pain"
    ]
  };

  const tabletInfo = {
    about: "Clopvex 75 is an antiplatelet medication containing Clopidogrel 75mg. It works by preventing blood platelets from sticking together and forming clots, thereby reducing the risk of heart attack and stroke in patients with cardiovascular diseases.",
    uses: [
      "Prevention of blood clots after heart attack",
      "Reduction of stroke risk in high-risk patients",
      "Management of acute coronary syndrome",
      "Prevention of stent thrombosis after coronary stenting",
      "Treatment of peripheral arterial disease"
    ],
    advantages: [
      "Proven efficacy in cardiovascular protection",
      "Once-daily dosage for better compliance",
      "Well-tolerated with minimal side effects",
      "Cost-effective compared to branded alternatives",
      "DCGI and FDA approved formulation"
    ],
    storage: "Store below 30°C in a cool, dry place. Protect from light and moisture. Keep out of reach of children.",
    dosageInstructions: [
      "Take one tablet daily with or without food",
      "Do not crush or chew the tablet",
      "Take at the same time every day",
      "Continue as prescribed by your physician"
    ],
    precautions: [
      "Inform your doctor if you have bleeding disorders",
      "Avoid if allergic to Clopidogrel",
      "Consult doctor before any surgical procedures",
      "Monitor for signs of unusual bleeding"
    ]
  };

  const relatedMedications = [
    {
      id: 2,
      name: "Clopidogrel 75mg",
      brand: "Clopilet 75",
      price: "₹279",
      originalPrice: "₹420",
      savings: "34%",
      image: "/assets/Cardiology/Clopidogrel_75_mg.jpg",
      description: "Prevents blood clot formation and reduces cardiovascular risks.",
      composition: "Clopidogrel Bisulfate 75mg"
    },
    {
      id: 3,
      name: "Clopivas 75",
      brand: "Sun Pharma",
      price: "₹259",
      originalPrice: "₹390",
      savings: "34%",
      image: "/assets/Cardiology/Clopidogrel_75_mg_and_150_mg.jpg",
      description: "Trusted antiplatelet therapy from Sun Pharma.",
      composition: "Clopidogrel 75mg"
    },
    {
      id: 4,
      name: "Atorvastatin 40mg & Clopidogrel 75mg",
      brand: "Atvastrin CV",
      price: "₹599",
      originalPrice: "₹850",
      savings: "30%",
      image: "/assets/Cardiology/Atorvastatin_40_mg_Clopidogrel_75_mg.jpg",
      description: "Combination therapy for comprehensive heart protection.",
      composition: "Atorvastatin 40mg + Clopidogrel 75mg"
    },
    {
      id: 5,
      name: "Aspirin 75mg",
      brand: "Ecosprin",
      price: "₹189",
      originalPrice: "₹280",
      savings: "32%",
      image: "/assets/Cardiology/Aspirin_75mg.jpg",
      description: "Prevents blood clots and reduces cardiovascular risks.",
      composition: "Aspirin 75mg"
    }
  ];

  const handleAddToCart = () => {
    alert(`${medication.name} added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${medication.name}`);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % medication.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + medication.images.length) % medication.images.length);
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const handleRelatedProductClick = (product) => {
    alert(`Redirecting to ${product.name}`);
  };

  // Handle image error - fallback to placeholder
  const handleImageError = (e, fallbackText = "Clopvex 75 Clopidogrel") => {
    e.target.src = `https://via.placeholder.com/500x500/DC2626/FFFFFF?text=${encodeURIComponent(fallbackText)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-cardiac-red hover:text-cardiac-dark mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cardiac Medications
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Gallery - Fixed Amazon Style */}
            <div className="flex flex-row gap-4 lg:gap-6">
              {/* Thumbnail Gallery - Left Side Vertical (Amazon Style) */}
              {medication.images.length > 1 && (
                <div className="flex flex-col gap-2 order-1">
                  {medication.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 border-2 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                        selectedImage === index 
                          ? 'border-cardiac-red ring-2 ring-cardiac-red ring-opacity-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e, `Img ${index + 1}`)}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Container */}
              <div className={`${medication.images.length > 1 ? 'flex-1 order-2' : 'w-full order-1'}`}>
                <div 
                  className="w-full h-80 lg:h-96 bg-gray-100 rounded-lg cursor-zoom-in overflow-hidden relative"
                  onClick={openImageModal}
                >
                  <img
                    src={medication.images[selectedImage]}
                    alt={`${medication.name} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => handleImageError(e, medication.name)}
                  />
                  
                  {/* Image Navigation Arrows - Only show if multiple images */}
                  {medication.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Counter - Only show if multiple images */}
                  {medication.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {medication.images.length}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">

              {/* Title and Brand */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {medication.name}
                </h1>
                <p className="text-lg text-gray-600">{medication.brand}</p>
                <p className="text-sm text-gray-500 mt-1">Strip of 10 tablets</p>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-green-600">{medication.price}</span>
                  <span className="text-xl text-gray-500 line-through">{medication.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save {medication.savings}
                  </span>
                </div>
                <p className="text-green-600 font-semibold">57% OFF</p>
              </div>

              {/* Discount Offer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">
                  Get at ₹479 with coupon offers
                </p>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800">
                  View all offers
                </button>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">+</span>
                  </button>
                  <span className="text-sm text-gray-500 ml-4">Strip of 10 tablets</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-cardiac-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-cardiac-dark transition-colors shadow-md hover:shadow-lg text-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg text-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-3 text-green-600">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Fast Delivery - Same Day Dispatch</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-600">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="font-semibold">2 Days Easy Exchanges</span>
                </div>
                <div className="flex items-center space-x-3 text-purple-600">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-semibold">DCGI & FDA Approved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Information Section */}
          <div className="border-t bg-white">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tablet Information</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* About Tablet */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-cardiac-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      About Clopvex 75 Clopidogrel
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{tabletInfo.about}</p>
                    <div className="mt-4 p-4 bg-white rounded border">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Packaging:</span>
                        <span className="font-semibold text-gray-900">Strip of 10 tablets</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Strength:</span>
                        <span className="font-semibold text-gray-900">75 mg per tablet</span>
                      </div>
                    </div>
                  </div>

                  {/* Uses */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Uses
                    </h3>
                    <ul className="space-y-2">
                      {tabletInfo.uses.map((use, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Storage Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Storage Instructions
                    </h3>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded border">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Store Below 30°C</p>
                        <p className="text-sm text-gray-600">{tabletInfo.storage}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Advantages */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Advantages
                    </h3>
                    <ul className="space-y-2">
                      {tabletInfo.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dosage Instructions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Dosage Instructions
                    </h3>
                    <ul className="space-y-2">
                      {tabletInfo.dosageInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Precautions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Precautions
                    </h3>
                    <ul className="space-y-2">
                      {tabletInfo.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Medications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMedications.map((product) => (
              <div
                key={product.id}
                onClick={() => handleRelatedProductClick(product)}
                className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => handleImageError(e, product.name)}
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Save {product.savings}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-700 text-xs mb-3">{product.composition}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold text-lg">
                      {product.price}
                    </span>
                    <button className="bg-cardiac-red text-white px-4 py-2 rounded text-sm font-semibold hover:bg-cardiac-dark transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={medication.images[selectedImage]}
              alt={`${medication.name} - Full View`}
              className="max-w-full max-h-screen object-contain"
              onError={(e) => handleImageError(e, medication.name)}
            />
            {medication.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {medication.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      selectedImage === index ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clopvex_75_Clopidogrel;