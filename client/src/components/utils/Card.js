import React from "react";
import MyButton from "./buttons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/userActions";
//MUI imports
import { makeStyles } from "@material-ui/core/styles";
import MUICard from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",

    height: (props) => (props.grid === "grid_as_list" ? 300 : 420),
    display: "flex",
    flexDirection: (props) =>
      props.grid === "grid_as_list" ? "row" : "column",
    color: "#003566",
    backgroundColor: "#e6f4f1",
  },
  media: {
    minHeight: 240,
    width: (props) => (props.grid === "grid_as_list" ? "40%" : "100%"),
  },
  price: {
    color: "#66fcf1",
    padding: "5px 20px",
    backgroundColor: "#1f283388",
    borderRadius: "5px",
  },
  brandName: {
    padding: "5px 0",
  },
  contentDiv: {
    width: (props) => (props.grid === "grid_as_list" ? "60%" : "100%"),
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    // /* Required for text-overflow to do anything */
    // whiteSpace: "wrap",
    // overflow: "hidden",
    /**Major Properties**/
    width: "400px",
    overflow: "hidden",
    lineHeight: "1rem",
    maxHeight: "6rem",
    display: "block",
    textOverflow: "ellipsis",
    "@media screen and (max-width:900px)": {
      maxHeight: "5rem",
      width: "320px",
    },
    "@media screen and (max-width:760px)": {
      maxHeight: "4rem",
      width: "270px",
    },
  },
});
//

export default function Card({ knife, grid }) {
  const classes = useStyles({ grid });

  //to add product to cart ONLY if user is authenticated
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  //truncates knife description if its too long for a card element
  const renderDescription = () => {
    const desc =
      knife.description.length < 350
        ? knife.description
        : knife.description.substring(0, 350) + "...";
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.description}
      >
        {desc}
      </Typography>
    );
  };
  //RETURN
  return (
    <MUICard className={classes.root}>
      <CardMedia
        className={classes.media}
        image={renderCardImage(knife.images)}
        title={knife.brand.name}
      />
      <div className={classes.contentDiv}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.brandName}
            >
              {knife.brand.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.price}
            >
              €{knife.price}
            </Typography>
          </div>

          <Typography>{knife.name}</Typography>

          {grid ? renderDescription() : null}
        </CardContent>
        <CardActions>
          <div style={{ flex: "1" }}>
            <MyButton
              type="default"
              altClass="card_link"
              text="View product"
              linkTo={`/product-detail/${knife._id}`}
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div>
            <MyButton
              type="bag_link"
              runAction={() => {
                user.userData.isAuth
                  ? dispatch(addToCart(knife._id))
                  : console.log("need to login");
              }}
            />
          </div>
        </CardActions>{" "}
      </div>
    </MUICard>
  );
}

/*  v1

style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}

style={{ flex: "1" }}

const useStyles = makeStyles({
  root: {
    width: "100%",

    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#003566",
    backgroundColor: "#e6f4f1",
  },
  media: {
    height: 240,
  },
  price: {
    // color: "#45a29e",
    color: "#66fcf1",
    padding: "5px 20px",
    backgroundColor: "#1f283388",
    borderRadius: "5px",
  },
  brandName: {
    padding: "5px 0",
  },
});
//

export default function Card({ knife, grid }) {
  const classes = useStyles();

  //to add product to cart ONLY if user is authenticated
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  return (
    <MUICard className={classes.root}>
      <div>
        <CardMedia
          className={classes.media}
          image={renderCardImage(knife.images)}
          title={knife.brand.name}
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.brandName}
            >
              {knife.brand.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.price}
            >
              ${knife.price}
            </Typography>
          </div>

          <Typography>{knife.name}</Typography>

          {grid ? (
            <Typography variant="body2" color="textSecondary" component="p">
              {knife.description}
            </Typography>
          ) : null}
        </CardContent>
      </div>
      <CardActions>
        <div style={{ flex: "1" }}>
          <MyButton
            type="default"
            altClass="card_link"
            text="View product"
            linkTo={`/product-detail/${knife._id}`}
            addStyles={{
              margin: "10px 0 0 0",
            }}
          />
        </div>
        <div>
          <MyButton
            type="bag_link"
            runAction={() => {
              user.userData.isAuth
                ? dispatch(addToCart(knife._id))
                : console.log("need to login");
            }}
          />
        </div>
      </CardActions>
    </MUICard>
  );
}


*/

/*  v2

const useStyles = makeStyles({
  root: {
    width: "100%",

    height: 450,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    color: "#003566",
    backgroundColor: "#e6f4f1",
  },
  media: {
    minHeight: 240,
  },
  price: {
    color: "#66fcf1",
    padding: "5px 20px",
    backgroundColor: "#1f283388",
    borderRadius: "5px",
  },
  brandName: {
    padding: "5px 0",
  },
});
//

export default function Card({ knife, grid }) {
  console.log("🚀 ~ Card ~ grid", grid);
  const classes = useStyles()

  //to add product to cart ONLY if user is authenticated
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  return (
    <MUICard className={classes.root}>
      <CardMedia
        className={classes.media}
        image={renderCardImage(knife.images)}
        title={knife.brand.name}
      />
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.brandName}
            >
              {knife.brand.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.price}
            >
              ${knife.price}
            </Typography>
          </div>

          <Typography>{knife.name}</Typography>

          {grid ? (
            <Typography variant="body2" color="textSecondary" component="p">
              {knife.description}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          <div style={{ flex: "1" }}>
            <MyButton
              type="default"
              altClass="card_link"
              text="View product"
              linkTo={`/product-detail/${knife._id}`}
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div>
            <MyButton
              type="bag_link"
              runAction={() => {
                user.userData.isAuth
                  ? dispatch(addToCart(knife._id))
                  : console.log("need to login");
              }}
            />
          </div>
        </CardActions>{" "}
      </div>
    </MUICard>
  );
}

*/
