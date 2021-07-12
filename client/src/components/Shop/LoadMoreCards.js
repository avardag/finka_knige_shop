import React from "react";
import Button from "@material-ui/core/Button";
import CardBlockShop from "../utils/CardBlockShop";
import useStyles from "./MuiButton.styles";

const LoadMoreCards = ({ grid, products, size, limit, loadMore }) => {
  const classes = useStyles();
  return (
    <div className="load_more_container">
      <CardBlockShop grid={grid} list={products} />
      {size > 0 && size >= limit ? (
        <div className="load__btn--wrapper">
          <Button
            onClick={() => loadMore()}
            size="large"
            variant="outlined"
            className={classes.button}
          >
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMoreCards;
