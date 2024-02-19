// import React from 'react'
import testImage from "/public/Bitcamp/bitcamp-front.svg";
import testback from "/public/Bitcamp/bitcamp-back.svg";
import { FormContext } from "../../../context/FormContext";
import { useContext } from "react";

// console.log(FormContext);

function CardImage() {
  const data = useContext(FormContext);
  console.log(data.inputData.cardname);
  return (
    <div className="card-border">
      <div className="front" style={{ backgroundImage: `url(${testImage})` }}>
        <h2>Card Name</h2>
        <div className="card-image-details">
          <h2>{data.inputData.cardnumber}</h2>
          <div className="number-date">
            <h2>{data.inputData.cardname}</h2>
            <h2>12/24</h2>
          </div>
        </div>
      </div>
      <div className="back" style={{ backgroundImage: `url(${testback})` }}>
        <h2>558</h2>
      </div>
    </div>
  );
}

export default CardImage;
