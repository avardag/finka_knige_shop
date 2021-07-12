import React from "react";
import Card from "./Card";

const CardBlockShop = ({ list, grid }) => {
  const renderCards = () =>
    list
      ? list.map((card) => <Card key={card._id} knife={card} grid={grid} />)
      : null;

  return (
    <div className={grid}>
      <div className="card_block_shop">
        {list ? (
          list.length === 0 ? (
            <div className="no_result">Sorry, no results</div>
          ) : null
        ) : null}
        {renderCards(list)}
      </div>
    </div>
  );
};

export default CardBlockShop;
