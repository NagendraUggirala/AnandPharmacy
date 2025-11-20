import React from "react"; 
import { Routes, Route, Navigate } from "react-router-dom";

import All from "./Medical/All";
import BabyCare from "./Medical/BabyCare";
import SkinCare from "./Medical/SkinCare";
import Diabetes from "./Medical/DiabetesCare";
import CardiacCare from "./Medical/HeartCare";
import Stomach from "./Medical/Stomach";
import PainRelief from "./Medical/PainRelief";
import LiverCare from "./Medical/LiverCare";
import OralCare from "./Medical/OralCare";
import Respiratory from "./Medical/Respiratory";
import SexualHealth from "./Medical/SexualHealth";
import Elderly from "./Medical/ElderlyCare";
import Immunity from "./Medical/Immunity";
import Women from "./Medical/WomenHealth";
import Covid from "./Medical/Covid";
import FirstAid from "./Medical/FirstAid";

export default function Home() {
  return (
    <div className="home-wrapper pt-[10px] lg:pt-[10px]">
      <div className="home-content px-4 py-6 lg:py-10">
        <Routes>

          <Route path="/" element={<Navigate to="all" replace />} />

          <Route path="all" element={<All />} />
          <Route path="baby-care" element={<BabyCare />} />
          <Route path="skin-care" element={<SkinCare />} />
          <Route path="diabetes-care" element={<Diabetes />} />
          <Route path="cardiac-care" element={<CardiacCare />} />
          <Route path="stomach-care" element={<Stomach />} />
          <Route path="pain-relief" element={<PainRelief />} />
          <Route path="liver-care" element={<LiverCare />} />
          <Route path="oral-care" element={<OralCare />} />
          <Route path="respiratory" element={<Respiratory />} />
          <Route path="sexual-health" element={<SexualHealth />} />
          <Route path="elderly-care" element={<Elderly />} />
          <Route path="cold-&-immunity" element={<Immunity />} />
          <Route path="women-health" element={<Women />} />
          <Route path="covid-essentials" element={<Covid />} />
          <Route path="first-aid" element={<FirstAid />} />

        </Routes>
      </div>
    </div>
  );
}

