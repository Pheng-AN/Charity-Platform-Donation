import React from "react";
import "./Style/Cards.css";


export const Cards = () => {
    
  return (
    <div>
        <div className="card_container">
            <div className="card" style={{ width: "18rem" }}>
            <img src="./images/IMG_90271.jpg" className="card-img-top" alt="..." />
                <div className="card-label">
                    <h>Society</h>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Support a family to stay together</h5>
                    <p className="card-text overflow-hidden">
                    During daily activities we see people struggling, some growing, some not having opportunity to improve their life. We have met Lockman in 2018 and his health condition didn't allow him to greet us or even see the sunlight.
                    </p>
                    <a href="#" className="btn btn-success">
                    Donate
                    </a>
                </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
            <img src="./images/cambodia-map-icon-cambodia-flat-icon-png.webp" className="card-img-top" alt="..." />
                <div className="card-label">
                    <h>Environment</h>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Discover Environment Fundraisers on </h5>
                    <p className="card-text overflow-hidden">
                    Help others by donating to their fundraiser, or start one for someone you care about.
                    </p>
                    <a href="#" className="btn btn-success">
                    Donate
                    </a>
                </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
            <img src="./images/6975575681_efa7b23a77_o.jpg" className="card-img-top" alt="..." />
                <div className="card-label">
                    <h>Disaster</h>
                </div>            
                <div className="card-body">
                    <h5 className="card-title">How to Help: Flood in Siem Reap</h5>
                    <p className="card-text overflow-hidden">
                    Multiple storms and tornadoes are causing injury, death, and destruction in towns across the Midwest and South.
                    </p>
                    <a href="#" className="btn btn-success">
                    Donate
                    </a>
                </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
            <img src="./images/32196048476_5406fe682f_b.jpg" className="card-img-top" alt="..." />
                <div className="card-label">
                    <h>Education</h>
                </div>        
                <div className="card-body">
                    <h5 className="card-title">Give The Gift Of An Education</h5>
                    <p className="card-text overflow-hidden">
                    The majority of the children we support come from difficult households living in extreme poverty. CCF believes that with quality education, one child has the potential to pull an entire family out of poverty, and that a generation of educated children has the power to transform an entire society.
                    </p>
                    <a href="#" className="btn btn-success">
                    Donate
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Cards;
