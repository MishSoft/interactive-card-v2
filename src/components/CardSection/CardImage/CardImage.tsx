import { FormContext } from "../../../context/FormContext";
import { CSSProperties, useContext, useEffect, useState } from "react";

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
    cardRef,
    frontRef,
    backRef,
    readyForDownload,
  } = useContext(FormContext);
  const [backTranform, setBackTransform] = useState<CSSProperties>({
    transform: "rotateY(180deg)",
  });
  useEffect(() => {
    if (caughtData && choosedCard) {
      const data = caughtData as CardDataItem[];
      const findName: CardDataItem = data.find(
        (item: CardDataItem) => item.name === choosedCard
      )!;
      console.log("This is findname ", findName);
      setSelectedCard(findName || null);
    }
  }, [caughtData, choosedCard, selectedCard, setSelectedCard]);

  const Styles = {
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  useEffect(() => {
    setBackTransform((prevTrans) => ({
      ...prevTrans,
      transform: readyForDownload ? "rotateY(0deg)" : "rotateY(180deg)",
    }));
  }, [readyForDownload]);

  return (
    <div className="card-border" style={{ ...Styles }} ref={cardRef}>
      {selectedCard && typeof selectedCard !== "string" && (
        <>
          <div
            ref={frontRef}
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
            ref={backRef}
            className="back"
            style={{
              transform: `${backTranform.transform}`,
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
