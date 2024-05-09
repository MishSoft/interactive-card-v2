import { Key, useContext } from "react";
import { FormContext } from "../../../context/FormContext";

interface FindIMageBackProps {
  front: string;
  back: string;
}

function ColorSection() {
  const {
    caughtData,
    choosedCard,
    setSelectedColor,
    setSelectedCardBack,
    selectedCard,
  } = useContext(FormContext);

  const handleColorCard = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const key = e.currentTarget.src.split("73").pop() || "";
    setSelectedColor(key);

    if (
      selectedCard &&
      typeof selectedCard !== "string" &&
      selectedCard.cardImages
    ) {
      console.log("Swotria");
      const findBackImage: FindIMageBackProps | undefined =
        selectedCard.cardImages.find(
          (image: { front: string | undefined }) =>
            image.front && image.front.includes(key)
        );

      if (findBackImage) {
        setSelectedCardBack(findBackImage.back);
        console.log("This is ", findBackImage);
      }
    }
  };

  return (
    <div className={`card-colors`}>
      {caughtData &&
        caughtData.map((item) => {
          if (item.name === choosedCard && item.cardImages) {
            return item.cardImages.map(
              (
                image: { front: string | undefined },
                id: Key | null | undefined
              ) => <img onClick={handleColorCard} key={id} src={image.front} />
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}

export default ColorSection;
