import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  header: {
    backgroundColor: "#1f2833",
    opacity: "0.95",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    border: "none",
  },
  pageTop: {
    height: "80px",
    "@media (max-width: 900px)": {
      height: "65px",
    },
    "@media (max-width: 600px)": {
      height: "60px",
    },
  },
  toolbar: {
    minHeight: "80px",
    width: "1100px",
    margin: "0 auto",
    display: "flex",
    // justifyContent: "space-between",
    "@media (max-width: 1250px)": {
      width: "900px",
    },
    "@media (max-width: 980px)": {
      width: "768px",
    },
  },
  desktopLinks: {
    marginLeft: "50px",
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 980px)": {
      marginLeft: "10px",
    },
  },
  link: {
    fontSize: "1.2rem",
    borderBottom: "2px solid transparent",
    paddingBottom: "23px",
    "&:hover": {
      borderBottomColor: "#66fcf1",
    },
    marginLeft: "30px",
    transition: "all 200ms ease-in",
    "@media (max-width: 900px)": {
      padding: "20px",
      border: "none",
      width: "100%",
      "&:hover": {
        backgroundColor: "#c5c6c7aa",
      },
      margin: "0",
    },
  },
  myCartText: {
    marginLeft: "12px",
  },
  myBadge: { backgroundColor: "#66fcf1", color: "#0b0c10" },
  paper: {
    width: 200,
  },
  drawerContainer: {
    // padding: "30px 40px",
  },
  drawerList: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: "0",
    },
  },
}));
