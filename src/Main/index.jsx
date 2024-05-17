import React from "react";
import "./style.css";
import Navbar from "../Navbar";
import Hero from "../Hero/Hero";
import ShowAvailablePost from "../ShowAvailablePosts";
// import PropertyDisplay from "../ShowAvailablePosts/PropertyDisplay";
import FilterAndAddPost from "../FiterAndAddPost";

export default function Index() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <FilterAndAddPost />
      <ShowAvailablePost />
    </div>
  );
}
