import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  list: {
    width: 250
  }
};

class FilterColumns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      columns: props.columns,
      visible: props.columns.filter(x => x.visible === true).length,
      hidden: 0
    };
  }

  toggleDrawer = open => () => {
    this.setState({
      open: open
    });
  };

  handleChange = (e, checked) => {
    this.setState({
      visible: this.state.visible + (checked ? 1 : -1),
      hidden: this.state.hidden + (checked ? -1 : 1)
    });
  };

  render() {
    const { columns, visible, hidden } = this.state;
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <div>
          <label className="control-label col-md-12">Add columns</label>
        </div>
        <div>
          <label className="control-label col-md-12">
            {visible} shown | {visible + hidden} total
          </label>
        </div>
        <div>
          <label className="control-label col-md-12">Showing {visible}</label>
        </div>
        <List>
          {columns.map((column, index) => (
            <ListItem button key={index}>
              <Checkbox
                defaultChecked={column.visible}
                onChange={this.handleChange}
              />
              <ListItemText primary={column.label} />
            </ListItem>
          ))}
        </List>
        <div>
          <label className="control-label col-md-12">Hidden {hidden}</label>
        </div>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Filter Columns</Button>
        <Drawer
          anchor="right"
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
        >
          <div tabIndex={0} role="button">
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

FilterColumns.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterColumns);
