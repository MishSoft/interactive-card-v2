// import React from 'react'
import testImage from "/public/Bitcamp/bitcamp-front.svg";

function CardImage() {
  return (
    <div
      className="card-image-container"
      style={{ backgroundImage: `url(${testImage})` }}
    >
      <h2>Card Name</h2>
      <div className="card-image-details">
        <h2>0000 0000 0000 0000</h2>
        <div className="number-date">
          <h2>mishiko aspanidze</h2>
          <h2>12/24</h2>
        </div>
      </div>
    </div>
  );
}

export default CardImage;
