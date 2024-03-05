import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

function ColorSection() {
  const { caughtData, choosedCard } = useContext(FormContext);

  return (
    <div className={`card-colors`}>
      {caughtData &&
        caughtData.map((item) => {
          if (item.name === choosedCard && item.cardImages) {
            return item.cardImages.map((image, id) => (
              <img key={id} src={image.front} />
            ));
          } else {
            return null;
          }
        })}
    </div>
  );
}

export default ColorSection;
