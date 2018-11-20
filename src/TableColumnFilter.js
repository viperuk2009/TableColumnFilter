import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";

export default class TableColumnFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      type: props.type,
      filterText: "",
      onFilterTextboxCallback: this.props.onFilterTextboxCallback
    };
  }

  handleOpen = e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  // ---------------------------------------------------------------------------- //
  checkboxList = () => {
    return this.state.type === "checkboxList" ? (
      <div>
        <div>
          <input type="checkbox" />
          Select All
        </div>
        <div>
          <input type="checkbox" />
          Data 1
        </div>
        <div>
          <input type="checkbox" />
          Data 2
        </div>
        <div>
          <input type="checkbox" />
          Data 3
        </div>
        <div>
          <input type="checkbox" />
          Data 4
        </div>
        <div>
          <input type="checkbox" />
          Data 5
        </div>
        <Button>Clear All</Button>
        <Button>Sort</Button>
      </div>
    ) : (
      ""
    );
  };

  // ---------------------------------------------------------------------------- //
  comboDropdown = () => {
    return this.state.type === "comboDropdown" ? (
      <div>
        <div>
          <select>
            <option>Data 1</option>
            <option>Data 2</option>
            <option>Data 3</option>
            <option>Data 4</option>
            <option>Data 5</option>
          </select>
        </div>
        <Button>Clear All</Button>
        <Button>Sort</Button>
      </div>
    ) : (
      ""
    );
  };

  // ---------------------------------------------------------------------------- //
  filterTextbox = () => {
    return this.state.type === "filterTextbox" ? (
      <div>
        <div>
          Filter:
          <input
            type="text"
            onChange={this.handleChangeFilterTextbox}
            value={this.state.filterText}
          />
        </div>
        <Button onClick={this.handleClearFilterTextbox}>Clear All</Button>
        <Button>Sort</Button>
      </div>
    ) : (
      ""
    );
  };

  handleChangeFilterTextbox = e => {
    this.setState({ filterText: e.target.value });

    //Callback to the table
    this.state.onFilterTextboxCallback(e.target.value);
  };

  handleClearFilterTextbox = () => {
    this.setState({ filterText: "" });

    //Callback to the table
    this.state.onFilterTextboxCallback("");
  };

  // ---------------------------------------------------------------------------- //
  filterFromTo = () => {
    return this.state.type === "filterFromTo" ? (
      <div>
        <div>
          From:
          <input type="text" />
          To:
          <input type="text" />
        </div>
        <Button>Clear All</Button>
        <Button>Sort</Button>
      </div>
    ) : (
      ""
    );
  };

  render() {
    const { open, anchorEl } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleOpen}>
          <FilterListIcon />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <this.checkboxList />
          <this.comboDropdown />
          <this.filterTextbox />
          <this.filterFromTo />
        </Popover>
      </div>
    );
  }
}

TableColumnFilter.propTypes = {
  type: PropTypes.string.isRequired,
  onFilterTextboxCallback: PropTypes.func.isRequired
};
