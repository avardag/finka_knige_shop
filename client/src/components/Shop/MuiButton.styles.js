import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  button: {
    fontWeight: "bold",
    backgroundColor: "#66fcf1",
    color: "#1f2833",
    borderColor: "#45a29e",
    borderRadius: 0,
    borderWidth: 2,
    "&:hover": {
      color: "#c5c6c7",
      backgroundColor: "#45a29e",
    },
  },
});
