// import React from 'react'
// import testImage from "/public/Bitcamp/bitcamp-front.svg";
import testback from "/public/Bitcamp/bitcamp-back.svg";
import { FormContext } from "../../../context/FormContext";
import { useContext, useEffect } from "react";

function CardImage() {
  const { inputData, choosedCard, caughtData } = useContext(FormContext);
  const { selectedCard, setSelectedCard } = useContext(FormContext);

  useEffect(() => {
    if (caughtData && choosedCard) {
      const findName = caughtData.find(
        (item: any) => item.name === choosedCard
      );
      setSelectedCard(findName);
    }
  }, [caughtData, choosedCard, setSelectedCard]);

  // console.log(selectedCard);

  return (
    <div className="card-border">
      {selectedCard && (
        <div
          className="front"
          style={{ backgroundImage: `url(${selectedCard.frontImage})` }}
        >
          <h2>Card Name</h2>
          <div className="card-image-details">
            <h2>{inputData.cardnumber || "0000 0000 0000 0000"}</h2>
            <div className="number-date">
              <h2>{inputData.cardname || "Name Lastname"}</h2>
              <h2>12/24</h2>
            </div>
          </div>
        </div>
      )}
      <div className="back" style={{ backgroundImage: `url(${testback})` }}>
        <h2>558</h2>
      </div>
    </div>
  );
}

export default CardImage;
