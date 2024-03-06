import { Key, useContext } from "react";
import { FormContext } from "../../../context/FormContext";

function ColorSection() {
  const { caughtData, choosedCard, setSelectedColor } = useContext(FormContext);

  const handleColorCard = (e: any) => {
    setSelectedColor(e.target.src);
    // console.log(caughtData[0].cardImages);
  };

  return (
    <div className={`card-colors`}>
      {caughtData &&
        caughtData.map(
          (item: {
            name: string;
            cardImages: { front: string | undefined }[];
          }) => {
            if (item.name === choosedCard && item.cardImages) {
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
