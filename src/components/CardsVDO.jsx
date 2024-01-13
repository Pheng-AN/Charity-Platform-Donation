import React from 'react';

export default function CardsVDO() {
  return (
    <div className="card bg-dark text-white">
      <video className="card-img" autoPlay loop muted>
        <source src="/Video/videoplayback.mp4" type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
        Your browser does not support the video tag.
      </video>
      <div className="card-img-overlay">
        <h5 className="card-title"></h5>
        <p className="card-text"></p>
        <p className="card-text"></p>
      </div>
    </div>
  );
}
