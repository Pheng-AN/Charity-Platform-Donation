import React from 'react';
import "./Style/Carousel.css";

export default function Carousel() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="./images/364386958_614832160790427_8905401009889992310_n.jpeg" className="d-block w-100 carousel-img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>We CARE, We SHARE</h5>
            <p>Education programs for better tomorrow.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="./images/IMG_7196.jpg" className="d-block w-100 carousel-img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>We CARE, We SHARE</h5>
            <p>Education programs for better tomorrow.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/6975575681_efa7b23a77_o.jpg" className="d-block w-100 carousel-img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Siemp Reap relief</h5>
            <p>Trusted ways to help in times of crisis</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
    
  );
}
