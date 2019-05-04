import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles, createStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    dialog: {
      backgroundColor: '#212121'
    },
    title: {
      color: 'rgba(255, 255, 255)',
      fontSize: '20px'
    },
    titles: {
      color: 'rgba(255, 255, 255)'
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      padding: '5px 0px'
    },
    button: {
      color: 'rgb(121, 134, 203)',
      borderRadius: '10px',
      borderWidth: '1px',
      borderStyle: 'solid'
    }
  });

class ResponsiveDialog extends React.Component {
  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{ classes: { root: classes.dialog } }}
        >
          <DialogTitle
            disableTypography={true}
            classes={{ root: classes.title }}
            id="responsive-dialog-title"
          >
            Sequencer
          </DialogTitle>
          <DialogContent>
            <DialogContentText classes={{ root: classes.text }}>
              Hi! Thanks for dropping by. Please note that the app runs best on
              a laptop/desktop because some of the functionalities are disabled for
              mobile devices. I hope you will have fun playing around with this
              sequencer! :)
            </DialogContentText>
            <DialogTitle
              disableTypography={true}
              classes={{ root: classes.titles }}
            >
              Controls
            </DialogTitle>
            <DialogContentText classes={{ root: classes.text }}>
              Step: Click on a step to select or deselect.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Amplitude: Hold the mouse when clicking on a step and move up or
              down to control the amplitude.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Polyrhythm: Double click on a step to shorten the length of the
              row.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Instrument: Click on the name of a instrument to change the
              instrument.
            </DialogContentText>
            <DialogTitle
              disableTypography={true}
              classes={{ root: classes.titles }}
            >
              Buttons
            </DialogTitle>
            <DialogContentText classes={{ root: classes.text }}>
              BPM: Increase or decrease the beats per minute.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Swing: Adds a delay on every even step in the sequencer.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Parts 1-4: Used to control the amount of steps(16,32,48 or 64).
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Play/Stop: Start or stop play.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Clear: Clears all steps.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              S: Select solo instrument, hold shift to select multiple.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              D: Resets a row to its original length.
            </DialogContentText>
            <DialogTitle
              disableTypography={true}
              classes={{ root: classes.titles }}
            >
              Shortcut keys
            </DialogTitle>
            <DialogContentText classes={{ root: classes.text }}>
              SPACE: Start or stop play.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              F: Turn the filter on or off.
            </DialogContentText>
            <DialogContentText classes={{ root: classes.text }}>
              Q: Reset all solo channels and turn off the filter.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              classes={{ root: classes.button, outlined: classes.button }}
              onClick={this.handleClose}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
