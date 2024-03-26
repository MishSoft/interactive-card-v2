import { Key, useContext } from "react";
import { FormContext } from "../../../context/FormContext";

function ColorSection() {
  const {
    caughtData,
    choosedCard,
    setSelectedColor,
    setSelectedCardBack,
    selectedCard,
  } = useContext(FormContext);

  const handleColorCard = (e: any) => {
    const key = e.target.src.split("73").pop() || "";
    setSelectedColor(key);

    // console.log(key);
    if (selectedCard) {
      const findBackImage = selectedCard.cardImages.find((image: any) =>
        image.front.includes(key)
      );

      setSelectedCardBack(findBackImage?.back);
    }
  };

  return (
    <div className={`card-colors`}>
      {caughtData &&
        caughtData.map(
          (item: {
            name: string;
            cardImages: { front: string | undefined }[];
          }) => {
            if (item.name === choosedCard) {
              return item.cardImages.map(
                (
                  image: { front: string | undefined },
                  id: Key | null | undefined
                ) => (
                  <img onClick={handleColorCard} key={id} src={image.front} />
                )
              );
            } else {
              return null;
            }
          }
        )}
    </div>
  );
}

export default ColorSection;
