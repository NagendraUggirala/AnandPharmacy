// src/App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

// ======================= GLOBAL COMPONENTS =======================
import Header from "./components/Header/Header";
import PageLoader from "./components/Layout/PageLoader";

// ======================= CONTEXT =======================
import { AuthContext } from "./context/AuthContext";

// ======================= PAGES =======================
import Home from "./pages/Home/Home";

import Login from "./pages/Auth/Login";
import OtpVerify from "./pages/Auth/OtpVerify";

import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import PaymentPage from "./pages/Checkout/PaymentPage";

import OrderTracking from "./pages/Orders/OrderTracking";
import DeliveryMap from "./pages/Orders/DeliveryMap";

import Profile from "./pages/Profile/Profile";
import AddressManager from "./pages/Profile/AddressManager";


// ====================================================================
// 🔐 PROTECTED ROUTE WRAPPER
// ====================================================================
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

// ====================================================================
// 🌐 MAIN APP
// ====================================================================
const App = () => {
  return (
    <Router>
      {/* HEADER ALWAYS VISIBLE */}
      <Header />

      {/* GLOBAL PAGE LOADING INDICATOR */}
      <PageLoader />

      {/* ROUTES */}
      <Routes>
        {/* HOME */}
        <Route path="/" element={ 
          <Home />} />

        {/* PRODUCT LIST + DETAILS */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* CART (login required) */}
        <Route
          path="/cart"
          element={
            <CartPage />
            // <ProtectedRoute>
              
            // </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT PAGE */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        {/* ORDER TRACKING */}
        <Route
          path="/order-tracking/:id"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />

        {/* LIVE MAP TRACKING */}
        <Route
          path="/delivery-map/:id"
          element={
            <ProtectedRoute>
              <DeliveryMap />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADDRESS MANAGER */}
        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <AddressManager />
            </ProtectedRoute>
          }
        />

        {/* LOGIN + OTP */}
        <Route path="/login/*" element={<Login />} />
        <Route path="/otp-verify" element={<OtpVerify />} />

        {/* WRONG ROUTE -> BACK TO HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
