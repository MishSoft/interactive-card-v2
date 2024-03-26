import { FormContext } from "../../../context/FormContext";
import { useContext, useEffect } from "react";

interface CardDataItem {
  name: string;
  frontImage: string;
  backImage: string;
}

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
      const data = caughtData as CardDataItem[];
      const findName = data.find(
        (item: CardDataItem) => item.name === choosedCard
      );
      setSelectedCard(findName || selectedCard);
      console.log(selectedCard);
    }
  }, [caughtData, choosedCard, selectedCard, setSelectedCard]);

  const Styles = {
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  return (
    <div className="card-border" style={{ ...Styles }}>
      {selectedCard && typeof selectedCard !== "string" && (
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
