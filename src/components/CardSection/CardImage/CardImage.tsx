// import React from 'react'
// import testImage from "/public/Bitcamp/bitcamp-front.svg";
// import testback from "/public/Bitcamp/bitcamp-back.svg";
import { FormContext } from "../../../context/FormContext";
import { useContext, useEffect } from "react";

function CardImage() {
  const {
    inputData,
    choosedCard,
    caughtData,
    selectedCard,
    setSelectedCard,
    selectedColor,
    isFlipped,
    selectedCardBack,
  } = useContext(FormContext);

  useEffect(() => {
    if (caughtData && choosedCard) {
      const findName = caughtData.find(
        (item: any) => item.name === choosedCard
      );
      setSelectedCard(findName || selectedCard);
    }
  }, [caughtData, choosedCard, selectedCard, setSelectedCard]);

  const Styles = {
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };
  return (
    <div className="card-border" style={{ ...Styles }}>
      {selectedCard && (
        <>
          <div
            className="front"
            style={{
              backgroundImage: `url(${
                selectedColor ? selectedColor : selectedCard.frontImage
              })`,
            }}
          >
            <h2>Interactive Card</h2>
            <div className="card-image-details">
              <h2>{inputData.cardnumber || "0000 0000 0000 0000"}</h2>
              <div className="number-date">
                <h2 style={{ textTransform: "uppercase" }}>
                  {inputData.cardname || "Name Lastname"}
                </h2>
                <h2>{inputData.mm + "/" + inputData.yy}</h2>
              </div>
            </div>
          </div>
          <div
            className="back"
            style={{
              backgroundImage: `url(${
                selectedColor ? selectedCardBack : selectedCard.backImage
              })`,
            }}
          >
            <h2>{inputData.cvc || "123"}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default CardImage;
