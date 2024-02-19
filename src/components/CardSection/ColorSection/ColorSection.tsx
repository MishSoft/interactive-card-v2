// import React from 'react'
import image1 from "../../../../public/Bitcamp/bitcamp-front.svg";
import image2 from "../../../../public/Bitcamp/bitcamp-front-black.svg";
import image3 from "../../../../public/Bitcamp/bitcamp-front-pink.svg";
import { useState } from "react";
function ColorSection() {
  const [coordinate, setCoordinate] = useState(0);

  const handleCard = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = rect.left - 290;
    setCoordinate(offsetX);
  };

  return (
    <div className={`card-colors`}>
      <img onClick={(e) => handleCard(e)} src={image1} alt="" />
      <img onClick={(e) => handleCard(e)} src={image2} alt="" />
      <img onClick={(e) => handleCard(e)} src={image3} alt="" />
      <div className="indicator" style={{ left: `${coordinate}px` }}></div>
    </div>
  );
}

export default ColorSection;
