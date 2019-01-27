import React, { Component } from 'react';
//FontAwsome icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
//Material UI components import
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0" // value of Radio Button Selection
  }
  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState })
    }
  }
  //handles click on collapse
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }
  //handles radio button change
  handleToggle = (e) => {
    this.setState({value:e.target.value}, this.props.handleFilters(e.target.value))
  }

  renderList = () => (
    this.props.list ?
      this.props.list.map((value) => (
        <FormControlLabel
          key={value._id}
          value={`${value._id}`} /* need to be string*/
          control={<Radio/>} /* element: what to render*/
          label={value.name}
        />
      ))
      : null
  )

  render() {
    return (
      <div>
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem onClick={this.handleClick} style={{ padding: "10px 23px 10px 0" }}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            <FontAwesomeIcon
              icon={this.state.open ? faAngleUp : faAngleDown}
              className='icon'
            />
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleToggle}
              >
                {this.renderList()}

              </RadioGroup>
            </List>
          </Collapse>
          <Divider />
        </List>
      </div>
    );
  }
}

export default CollapseRadio;