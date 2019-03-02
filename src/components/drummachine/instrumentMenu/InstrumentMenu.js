import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';

class InstrumentMenu extends React.Component {
  state = {
    anchorEl: null
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
    const { options, setInstrument, renderSpan, row } = this.props;

    return (
      <div>
        {renderSpan(this.handleClick)}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 100,
              backgroundColor: '#333333',
              overflowY: 'hidden',
              outline: '#333333 !important',
              '*:focus': {
                outline: 'none'
              },
              webkitBoxShadow: 'none',
              boxShadow: 'none'
            },
          }}
        >
          <Scrollbars autoHeight style={{outline: 'none'}}>
            {options.map(option => (
              <MenuItem
                style={{ color: 'white' }}
                key={option}
                onClick={() => {
                  this.handleClose();
                  setInstrument(row, option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Scrollbars>
        </Menu>
      </div>
    );
  }
}

export default InstrumentMenu;
