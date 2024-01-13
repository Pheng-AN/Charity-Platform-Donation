import React from "react";
import Cards from "./Cards";
import Carousel from "./Carousel";
import CardsVDO from "./CardsVDO";
import "./Style/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Your Home</h1>
        <h1 className="display-4">for help</h1>
        <hr className="my-4"/>
        <p className="lead"></p>
        <div className="centered-button">
          <Link to="/discover">
              <button type="button" class="btn btn-success btn-lg">
              Your Home Greatest Again
              </button>
          </Link>
        </div>
      </div>
   
      <h1 className="Home-text">Trending Campaigns. Your family for help</h1> 
      <Cards />
      <h1 className="Home-text">Recommended Topics. Find what is best for you</h1> 
      <Carousel/>
      <h1 className="Home-text">How it works</h1> 
      <CardsVDO/>

      
    </div>
  );
};


export default HomePage;
