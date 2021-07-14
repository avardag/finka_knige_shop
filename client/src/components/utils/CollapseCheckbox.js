import React, { Component } from "react";
//FontAwsome icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
//Material UI components import
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [], //list of checked values in checkbox list
  };
  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }
  //handles click on collapse
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  //renders list of checkboxes. list is passed as a props from upper compnt
  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <ListItem key={value._id} style={{ padding: "0px 0" }}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleToggle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      //value is not in the list
      newChecked.push(value); //add it to the list
    } else {
      //value is in the list
      newChecked.splice(currentIndex, 1); //remove from the list
    }
    //set new state for check list
    this.setState(
      {
        checked: newChecked,
      },
      () => this.props.handleFilters(newChecked) //send checked list to upper compnt
    );
  };
  render() {
    return (
      <div className="collapse_item_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            <FontAwesomeIcon
              icon={this.state.open ? faAngleUp : faAngleDown}
              className="icon"
            />
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
          <Divider />
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
