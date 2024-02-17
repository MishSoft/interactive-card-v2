// import React from 'react'

import CardImage from "./CardImage/CardImage";
import ColorSection from "./ColorSection/ColorSection";
import SelectCards from "./SelectCards/SelectCards";

function CardSection() {
  return (
    <div className="card-container">
      <ColorSection />
      <CardImage />
      <SelectCards />
    </div>
  );
}

export default CardSection;
