import React from "react";
import "../card/card.scss";

const Card = ({ img, title }) => {
  return (
    <>
      <div className="card">
        <img src={"https://image.tmdb.org/t/p/w500" + img} alt="" />
        <h1>{title}</h1>
      </div>
    </>
  );
};

export default Card;
