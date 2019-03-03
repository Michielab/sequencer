import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Button } from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import { VolumeMute, VolumeUp } from '@material-ui/icons/';
import InstrumentMenu from '../instrumentMenu/InstrumentMenu';

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
      [theme.breakpoints.only('xs')]: {
        width: '90%',
        minWidth: '20px',
        minHeight: '20px',
        height: '80%',
        alignSelf: 'center',
        borderWidth: '1px'
      },
      [theme.breakpoints.only('sm')]: {
        width: '100%',
        minWidth: '29px',
        minHeight: '28px',
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
      [theme.breakpoints.only('xs')]: {
        marginRight: 0,
        maxHeight: '25px'
      },
      [theme.breakpoints.only('sm')]: {
        marginRight: 2,
        maxHeight: '25px'
      }
    },
    muteButton: {
      minWidth: 'unset',
      minHeight: 'unset',
      width: '20px',
      gridColumn: 1,
      color: '#D3D3D3',
      padding: '0',
      [theme.breakpoints.only('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '12px',
        width: '10px'
      }
    },
    soloButton: {
      border: '1px solid',
      borderRadius: '50%',
      minWidth: 'unset',
      minHeight: 'unset',
      width: '20px',
      gridColumn: 1,
      color: '#D3D3D3',
      padding: '0',
      [theme.breakpoints.only('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '10px',
        width: '15px',
        marginBottom: '1px'
      }
    },
    instrumentNameContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginLeft: '10px',
      width: '100%',
      [theme.breakpoints.only('xs')]: {
        marginLeft: 0,
        fontSize: '8px',
        width: '20px'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '12px',
        width: '40px'
      }
    },
    warpSlider: {
      top: '-15px',
      height: 0
    },
    slider: {
      width: '64px',
      height: '20px'
    },
    volumeIcons: {
      fontSize: '20px',
      [theme.breakpoints.only('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '15px',
        width: '17px'
      }
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
      handleSoloToggle,
      soloInstruments,
      setInstrument,
      allInstruments,
      mute,
      getCurrentStep
    } = this.props;

    let gainValue = mute ? 0 : mainGain;

    return (
      <React.Fragment>
        <div
          style={{
            gridRow: `row ${row} / span 1 `
          }}
          className={classes.volumeControlContainer}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Button
              className={classes.soloButton}
              style={{
                gridRow: `row ${row} / span 1 `,
                color:
                  soloInstruments.indexOf(instrumentName) === -1
                    ? '#D3D3D3'
                    : 'red'
              }}
              onMouseDown={() => handleSoloToggle(instrumentName)}
            >
              S
            </Button>

            <Button
              style={{
                gridRow: `row ${row} / span 1 `
              }}
              className={classes.muteButton}
              onMouseDown={() => toggleMute(instrumentName)}
            >
              {gainValue === 0 ? (
                <VolumeMute classes={{ root: classes.volumeIcons }} />
              ) : (
                <VolumeUp classes={{ root: classes.volumeIcons }} />
              )}
            </Button>
          </div>
          <div className={classes.instrumentNameContainer}>
            <InstrumentMenu
              row={row}
              setInstrument={setInstrument}
              options={allInstruments[row].filter(
                instrument => instrument !== instrumentName
              )}
              renderSpan={handleClick => (
                <span
                  onClick={e => handleClick(e)}
                  style={{ cursor: 'pointer' }}
                >
                  {instrumentName}
                </span>
              )}
            />
            <Slider
              style={{ width: '100%', height: '20px' }}
              classes={{
                trackContainer: classes.slider,
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={100}
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
                  backgroundColor:  getCurrentStep ? getCurrentStep % steps.length === index ? '#2AB859' :  steps[index].step === 0 ? '' : '#404572': steps[index].step === 0 ? '' : '#404572',
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
  row: PropTypes.string,
  mainGain: PropTypes.number,
  amplitude: PropTypes.object,
  toggleStep: PropTypes.func,
  changeAmplitude: PropTypes.func,
  toggleMute: PropTypes.func,
  handleSoloToggle: PropTypes.func,
  soloInstruments: PropTypes.array
};

export default withStyles(styles)(InstrumentRow);
