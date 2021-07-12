import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";

const CardBlock = ({ list, title }) => {
  const renderCards = () =>
    list
      ? list.map((knife, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card knife={knife} />
          </Grid>
        ))
      : null;
  return (
    <div className="container">
      <div className="card_block">
        {title ? <div className="title">{title}</div> : null}
        <Grid container spacing={2}>
          {renderCards(list)}
        </Grid>
      </div>
    </div>
  );
};

export default CardBlock;
