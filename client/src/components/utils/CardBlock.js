import React from "react";
import Card from "./Card";

const CardBlock = ({ list, title }) => {
  const renderCards = () =>
    list
      ? list.map((knife, i) => (
          <div key={i}>
            <Card key={i} knife={knife} />
          </div>
        ))
      : null;
  return (
    <div className="card_block">
      <div className="container">
        {title ? <div className="title">{title}</div> : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {renderCards(list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
