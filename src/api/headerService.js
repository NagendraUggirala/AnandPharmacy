// src/api/headerService.js
// Simple mock — replace with axios calls in production
export async function getHeaderData() {
  return {
    logo: "/assets/logo/image.png", // uses your local logo (option A)
    categories: [
      { id: 1, name: "Medicines", img: "/assets/icons/med.png" },
      { id: 2, name: "Baby Care", img: "/assets/icons/baby.png" },
      { id: 3, name: "Skin Care", img: "/assets/icons/skin.png" },
      { id: 4, name: "Diabetes", img: "/assets/icons/diabetes.png" },
      { id: 5, name: "Vitamins", img: "/assets/icons/vitamin.png" },
      { id: 6, name: "Ayurveda", img: "/assets/icons/ayur.png" },
      { id: 7, name: "Devices", img: "/assets/icons/device.png" }
    ]
  };
}
