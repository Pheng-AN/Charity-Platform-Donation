import React from "react";
import "./Style/FeedsPage.css"; 
import DonationAmount from "./DonationAmount";

const FeedsPage = () => {
  return (
    <div>
      <div className="jumbotron_feed">
        <h1 className="display-feed">&nbsp;</h1>
        <h1 className="display-feed">Feed</h1>
        <h1 className="display-feed">&nbsp;</h1>
        <hr className="my-feed" />
        <p className="lead-feed">&nbsp;</p>
      </div>
      <div>
        <h1></h1>
        <DonationAmount />
      </div>
        
    </div>
  );
};

export default FeedsPage;
