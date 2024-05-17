import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero-main">
      <img src="hero.png" alt="" className="hero-left-img" />
      <div className="hero-right">
        <h1 className="hero-heading">
          Rentify: Your Gateway to Hassle-Free Renting.
        </h1>
        <p className="content-hero">
          Connecting Tenants and Landlords Seamlessly.
        </p>
      </div>
    </div>
  );
}
