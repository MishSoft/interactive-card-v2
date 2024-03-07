import { Key, useContext } from "react";
import { FormContext } from "../../../context/FormContext";

function ColorSection() {
  const {
    caughtData,
    choosedCard,
    setSelectedColor,
    setSelectedCardBack,
    // selectedCardBack,
    selectedCard,
  } = useContext(FormContext);

  const handleColorCard = (e: any) => {
    const key = e.target.src;
    setSelectedColor(e.target.src);
    if (selectedCard) {
      const findBackImage = caughtData.find((item: any, id: number) =>
        console.log(item.cardImages[id])
      );
      setSelectedCardBack(findBackImage);
      console.log(key);
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
