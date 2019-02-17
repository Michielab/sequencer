import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48;

class InstrumentMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {options, changeInstrument, renderSpan } = this.props;

    return (
      <div>
        {/* <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton> */}
        {renderSpan(this.handleClick)}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {/* {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => {this.handleClose(); changeInstrument()}}>
              {option}
            </MenuItem>
          ))} */}
        </Menu>
      </div>
    );
  }
}

export default InstrumentMenu;
