import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import CategorySlider from "./components/Header/CategorySlider";
import BackButton from "./components/Header/BackButton";
import PageLoader from "./components/Layout/PageLoader";

import { AuthContext } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import OtpVerify from "./pages/Auth/OtpVerify";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import PaymentPage from "./pages/Checkout/PaymentPage";
import OrderTracking from "./pages/Orders/OrderTracking";
import DeliveryMap from "./pages/Orders/DeliveryMap";
import Profile from "./pages/Profile/Profile";
import AddressManager from "./pages/Profile/AddressManager";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

// ================== NEW WRAPPER TO HANDLE UI CONDITION ==================
const LayoutController = ({ children }) => {
  const location = useLocation();

  const isProductDetailPage = location.pathname.startsWith("/ProductDetail");

  return (
    <>
      <Header />

      {/* Show BACK BUTTON on ProductDetail page */}
      {isProductDetailPage ? (
        <BackButton />
      ) : (
        <CategorySlider />
      )}

      <PageLoader />

      {children}
    </>
  );
};

// ================= MAIN APP ===================
const App = () => {
  return (
    <Router>
      <LayoutController>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home/*" element={<Home />} />

          {/* Product Detail */}
          <Route path="/ProductDetail/*" element={<ProductDetail />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Payment */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          {/* Orders */}
          <Route
            path="/order-tracking/:id"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery-map/:id"
            element={
              <ProtectedRoute>
                <DeliveryMap />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Address */}
          <Route
            path="/addresses"
            element={
              <ProtectedRoute>
                <AddressManager />
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login/*" element={<Login />} />
          <Route path="/otp-verify" element={<OtpVerify />} />

          {/* Redirect wrong routes */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LayoutController>
    </Router>
  );
};

export default App;
