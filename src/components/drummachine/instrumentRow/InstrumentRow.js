import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Button } from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import { VolumeMute, VolumeUp } from '@material-ui/icons/';

const styles = theme =>
  createStyles({
    button: {
      position: 'relative',
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: '#212121'
      },
      [theme.breakpoints.only('sm')]: {
        width: '100%',
        minWidth: '29px',
        minHeight: '30px',
        height: '80%',
        alignSelf: 'center',
        borderWidth: '1px'
      },
      [theme.breakpoints.only('md')]: {
        width: '100%',
        minWidth: '40px',
        minHeight: '45px',
        height: '100%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '50px'
      }
    },
    volumeControlContainer: {
      gridColumn: 1,
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px',
      color: 'floralwhite',
      [theme.breakpoints.only('sm')]: {
        marginRight: 2
      }
    },
    muteButton: {
      minWidth: 'unset',
      minHeight: 'unset',
      width: '20px',
      gridColumn: 1,
      color: '#D3D3D3',
      padding: '0',
      [theme.breakpoints.only('sm')]: {
        fontSize: '12px',
        width: '10px'
      }
    },
    instrumentNameContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginLeft: '10px',
      width: '100%',
      [theme.breakpoints.only('sm')]: {
        fontSize: '12px',
        width: '40px'
      }
    },
    warpSlider: {
      top: '-15px'
    },
    slider: {
      width: '64px',
      height: '20px'
    }
  });

class InstrumentRow extends React.PureComponent {
  state = {
    selectedStep: '',
    clientY: ''
  };

  handleMouseDown = (clientY, step) => {
    this.setState({
      selectedStep: step,
      clientY: clientY
    });
  };

  handleMouseUp = (clientY, step) => {
    if (this.state.clientY) {
      this.handleVolumeChange(clientY, step);
    }
  };

  handleMouseOut = (clientY, step) => {
    if (this.state.clientY) {
      this.handleVolumeChange(clientY, step);
    }
  };

  handleVolumeChange = (clientY, step) => {
    let height = (46 / 100) * this.props.steps[step].amplitude;

    let volume;
    this.state.clientY - clientY > 0
      ? (volume =
          ((this.state.clientY - clientY) / 46) * 100 +
          this.props.steps[step].amplitude)
      : (volume = ((height + (this.state.clientY - clientY)) / 46) * 100);

    volume > 100 && (volume = 100);
    volume < 0 && (volume = 0);
    this.setState(
      {
        selectedStep: '',
        clientY: '',
        volume
      },
      this.props.toggleStep(step, volume)
    );
  };

  render() {
    const {
      row,
      instrumentName,
      classes,
      steps,
      mainGain,
      changeAmplitude,
      toggleMute,
      amplitude
    } = this.props;

    let gainValue = amplitude.hasOwnProperty(instrumentName + 'Mute')
      ? amplitude[instrumentName + 'Mute']
        ? 0
        : mainGain
      : mainGain;

    return (
      <React.Fragment>
        <div
          style={{
            gridRow: `row ${row} / span 1 `
          }}
          className={classes.volumeControlContainer}
        >
          <Button
            onClick={() => toggleMute(instrumentName)}
            style={{
              gridRow: `row ${row} / span 1 `
            }}
            className={classes.muteButton}
          >
            {gainValue === 0 ? <VolumeMute /> : <VolumeUp />}
          </Button>
          <div className={classes.instrumentNameContainer}>
            <span>{instrumentName}</span>
            <Slider
              // style={{ width: '64px', height: '20px' }}
              style={{ width: '100%', height: '20px' }}
              classes={{
                trackContainer: classes.slider,
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={200}
              value={gainValue}
              onChange={value => changeAmplitude(instrumentName, value)}
              componentPropType="span"
            />
          </div>
        </div>
        {steps.map((step, index) => (
          <React.Fragment key={instrumentName + index}>
            <Button
              classes={{ root: classes.button }}
              style={{
                gridColumn: `${index + 2}
                 `,
                gridRow: `row ${row} / span 1 `
              }}
              onMouseDown={e =>
                this.handleMouseDown(e.clientY, index + instrumentName)
              }
              onMouseUp={e => this.handleMouseUp(e.clientY, index)}
              onMouseLeave={e => this.handleMouseOut(e.clientY, index)}
            >
              <span
                style={{
                  width: '100%',
                  borderRadius: '35%',
                  backgroundColor: steps[index].step === 0 ? '' : '#404572',
                  position: 'absolute',
                  bottom: 0,
                  height: `${step.amplitude}%`
                }}
              />
            </Button>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

InstrumentRow.propTypes = {
  instrumentName: PropTypes.string,
  steps: PropTypes.array,
  parts: PropTypes.array,
  part: PropTypes.string,
  row: PropTypes.number,
  mainGain: PropTypes.number,
  amplitude: PropTypes.object,
  toggleStep: PropTypes.func,
  changeAmplitude: PropTypes.func,
  toggleMute: PropTypes.func
};

export default withStyles(styles)(InstrumentRow);