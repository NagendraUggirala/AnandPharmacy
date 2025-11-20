import React from "react";
import { Routes, Route } from "react-router-dom";

import AllDetail from "../pages/Detail/AllDetail";
import BabyCareDetail from "../pages/Detail/BabyCareDetail";
import CovidDetail from "../pages/Detail/CovidDetail";
import DiabetesCareDetail from "../pages/Detail/DiabetesCareDetail";
import ElderlyCareDetail from "../pages/Detail/ElderlyCareDetail";
import FirstAidDetail from "../pages/Detail/FirstAidDetail";
import HeartCareDetail from "../pages/Detail/HeartCareDetail";
import ImmunityDetail from "../pages/Detail/ImmunityDetail";
import LiverCareDetail from "../pages/Detail/LiverCareDetail";
import OralCareDetail from "../pages/Detail/OralCareDetail";
import PainReliefDetail from "../pages/Detail/PainReliefDetail";
import RespiratoryDetail from "../pages/Detail/RespiratoryDetail";
import StomachDetail from "../pages/Detail/StomachDetail";

import SexualHealthDetail from "../pages/Detail/SexualHealthDetail";
import SkinCareDetail from "../pages/Detail/SkinCareDetail";
import WomenHealthDetail from "../pages/Detail/WomenHealthDetail";

const ProductDetail = () => {
  return (
    <Routes>
      {/* ALL DETAILS */}
      <Route path="AllDetail/:id" element={<AllDetail />} />

      {/* CATEGORY-WISE SPECIFIC DETAIL PAGES */}
      <Route path="BabyCareDetail/:id" element={<BabyCareDetail />} />
      <Route path="CovidDetail/:id" element={<CovidDetail />} />
      <Route path="DiabetesCareDetail/:id" element={<DiabetesCareDetail />} />
      <Route path="ElderlyCareDetail/:id" element={<ElderlyCareDetail />} />
      <Route path="FirstAidDetail/:id" element={<FirstAidDetail />} />
      <Route path="HeartCareDetail/:id" element={<HeartCareDetail />} />
      <Route path="ImmunityDetail/:id" element={<ImmunityDetail />} />
      <Route path="LiverCareDetail/:id" element={<LiverCareDetail />} />
      <Route path="OralCareDetail/:id" element={<OralCareDetail />} />
      <Route path="PainReliefDetail/:id" element={<PainReliefDetail />} />
      <Route path="RespiratoryDetail/:id" element={<RespiratoryDetail />} />

      {/* FIXED → Corrected StomachDetail import */}
      <Route path="StomachDetail/:id" element={<StomachDetail />} />

      <Route path="SexualHealthDetail/:id" element={<SexualHealthDetail />} />
      <Route path="SkinCareDetail/:id" element={<SkinCareDetail />} />
      <Route path="WomenHealthDetail/:id" element={<WomenHealthDetail />} />
    </Routes>
  );
};

export default ProductDetail;
