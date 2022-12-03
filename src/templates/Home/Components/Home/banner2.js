import React from "react";
import "./styles/carouselHome.css";
import ImgBanner from "./../../../../assets/images/2.jpg";

export default function Banner2() {
  return (
    <div>
      <div className="flex-1 flex justify-center">
        <img
          src={ImgBanner}
          alt="banner"
          width="100%"
        />
      </div>
    </div>
  );
}
