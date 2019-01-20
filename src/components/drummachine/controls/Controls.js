import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Material-ui */
import { withStyles, Button } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';

const styles = theme => ({
  label: {
    color: 'white',
    marginRight: '5px',
    gridColumn: 1,
    gridRow: 3,
    textAlign: 'center',
    marginTop: '4px',
    marginBottom: '5px',
    [theme.breakpoints.only('xs')]: {
      fontSize: '8px',
      alignSelf: 'center'
    },
    [theme.breakpoints.only('sm')]: {
      textAlign: 'left',
      fontSize: '13px',
      justifySelf: 'center'
    },
    [theme.breakpoints.only('md')]: {
      textAlign: 'left',
      fontSize: '13px'
    }
  },

  BPMinput: {
    gridColumn: 2,
    gridRow: 3,
    height: '20px',
    backgroundColor: ' #212121',
    border: '2px solid',
    color: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    textAlign: 'center',
    outline: 'initial !important',
    width: 'calc(100% - 6px)',
    marginBottom: '5px',
    [theme.breakpoints.only('xs')]: {
      gridColumn: '2 / 4',
      alignSelf: 'center',
      borderWidth: '1px',
      height: '15px',
      width: '35px'
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: 0,
      gridColumn: '2 / 4',
      width: '40px',
      borderWidth: '1px',
      justifySelf: 'left'
    },
    [theme.breakpoints.only('md')]: {
      marginRight: 0,
      gridColumn: '2 / 4',
      width: '40px',
      borderWidth: '1px',
      justifySelf: 'left'
    }
  },
  swingLabel: {
    color: 'white',
    marginRight: '5px',
    gridColumn: 3,
    gridRow: 3,
    textAlign: 'right',
    marginTop: '4px',
    marginBottom: '5px',
    [theme.breakpoints.only('xs')]: {
      fontSize: '8px',
      alignSelf: 'center',
      gridColumn: '4 / 6',
    },
    [theme.breakpoints.only('sm')]: {
      textAlign: 'left',
      fontSize: '13px',
      justifySelf: 'right',
      gridColumn: '3 / 5'
    },
    [theme.breakpoints.only('md')]: {
      textAlign: 'right',
      fontSize: '13px',
      gridColumn: '3 / 5'
    }
  },
  swingInput: {
    gridColumn: 4,
    gridRow: 3,
    height: '20px',
    backgroundColor: ' #212121',
    border: '2px solid',
    color: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    textAlign: 'center',
    outline: 'initial !important',
    width: 'calc(100% - 6px)',
    marginBottom: '5px',
    [theme.breakpoints.only('xs')]: {
      gridColumn: '6 / 8',
      alignSelf: 'center',
      borderWidth: '1px',
      height: '15px',
      width: '28px',
      fontSize: '8px',
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: 0,
      gridColumn: '5 / 7',
      width: '40px',
      borderWidth: '1px',
      justifySelf: 'left'
    },
    [theme.breakpoints.only('md')]: {
      marginRight: 0,
      gridColumn: '5 / 7',
      width: '40px',
      borderWidth: '1px',
      justifySelf: 'left'
    }
  },
  playButton: {
    gridColumn: 16,
    gridRow: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: 'solid 2px',
    height: '35px',
    borderRadius: '20%',
    width: '30px',
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      width: '30px',
      minWidth: '20px',
      gridColumn: '14 / 16',
      minHeight: 'unset',
      height: '25px',
      borderWidth: '1px',
      justifySelf: 'center',
      marginBottom: '5px'
    },
    [theme.breakpoints.only('sm')]: {
      width: '40px',
      minWidth: '20px',
      gridColumn: '14 / 16',
      alignSelf: 'center',
      minHeight: 'unset',
      height: '30px',
      marginBottom: '10px',
      borderWidth: '1px',
      justifySelf: 'right'
    },
    [theme.breakpoints.only('md')]: {
      width: '100%',
      minWidth: '40px'
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '30px'
    }
  },
  selectPartButton: {
    gridRow: 3,
    border: 'solid 2px',
    height: '35px',
    borderRadius: '20%',
    width: '30px',
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '20px',
      minHeight: 'unset',
      marginBottom: '5px',
      alignSelf: 'center',
      height: '20px',
      borderWidth: '1px',
      justifySelf: 'center'
    },
    [theme.breakpoints.only('sm')]: {
      width: '100%',
      minWidth: '20px',
      minHeight: 'unset',
      marginBottom: '10px',
      alignSelf: 'center',
      height: '25px',
      borderWidth: '1px',
      justifySelf: 'center'
    },
    [theme.breakpoints.only('md')]: {
      width: '100%',
      minWidth: '40px',
      marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '30px'
    }
  },
  clearButton: {
    gridColumn: 17,
    gridRow: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: 'solid 2px',
    height: '35px',
    borderRadius: '20%',
    width: '30px',
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      width: '30px',
      minWidth: '20px',
      gridColumn: '16 / 18',
      minHeight: 'unset',
      height: '25px',
      borderWidth: '1px',
      justifySelf: 'left'
    },
    [theme.breakpoints.only('sm')]: {
      width: '40px',
      minWidth: '20px',
      gridColumn: '16 / 18',
      minHeight: 'unset',
      height: '30px',
      borderWidth: '1px',
      justifySelf: 'center'
    },
    [theme.breakpoints.only('md')]: {
      width: '100%',
      minWidth: '40px',
      marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '30px'
    }
  }
});

class Controls extends Component {
  render() {
    const {
      handleBPMChange,
      togglePlay,
      handleClearAll,
      playing,
      bpm,
      classes,
      toggleParts,
      parts,
      activePart,
      selectedParts,
      steps,
      currentStep,
      swing,
      handleSwing
    } = this.props;

    let currentStepPart;
    let currentSteps =
      selectedParts.indexOf('partFour') !== -1
        ? [...steps, ...steps, ...steps, ...steps]
        : selectedParts.indexOf('partThree') !== -1
        ? [...steps, ...steps, ...steps]
        : selectedParts.indexOf('partTwo') !== -1
        ? [...steps, ...steps]
        : steps;

    // eslint-disable-next-line
    currentStep % currentSteps.length >= 0 &&
    currentStep % currentSteps.length < 16
      ? (currentStepPart = 0)
      : currentStep % currentSteps.length >= 16 &&
        currentStep % currentSteps.length < 32
      ? (currentStepPart = 1)
      : currentStep % currentSteps.length >= 32 &&
        currentStep % currentSteps.length < 48
      ? (currentStepPart = 2)
      : currentStep % currentSteps.length >= 48 &&
        currentStep % currentSteps.length < 64
      ? (currentStepPart = 3)
      : '';

    return (
      <React.Fragment>
        <label className={classes.label}>BPM</label>
        <input
          min={40}
          max={240}
          value={bpm}
          type="number"
          onChange={handleBPMChange}
          className={classes.BPMinput}
        />
        <label className={classes.swingLabel}>Swing</label>
        <input
          min={0}
          max={10}
          value={swing}
          type="number"
          onChange={(e) => handleSwing(parseInt(e.target.value))}
          className={classes.swingInput}
        />
        {parts.map((part, index) => (
          <Button
            key={index}
            onClick={() => toggleParts(index)}
            classes={{ root: classes.selectPartButton }}
            style={{
              gridColumn: 8 + index,
              color:
                selectedParts.indexOf(parts[index]) !== -1
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(255, 255, 255, 0.4)',
              borderColor:
                activePart === index && currentStepPart === index
                  ? 'rgba(255, 255, 255, 0.8)'
                  : currentStepPart === index
                  ? '# 0C8330'
                  : activePart === index &&
                    selectedParts.indexOf(parts[index]) !== -1
                  ? 'rgba(255, 255, 255, 0.8)'
                  : selectedParts.indexOf(parts[index]) !== -1
                  ? '#8D80A3'
                  : activePart === index
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(255, 255, 255, 0.4)',
              backgroundColor:
                currentStepPart === index
                  ? '#33B65D'
                  : selectedParts.indexOf(parts[index]) !== -1
                  ? 'rgb(64, 69, 114)'
                  : ''
            }}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => togglePlay()}
          classes={{ root: classes.playButton }}
        >
          {!playing ? <PlayArrow /> : <Stop />}
        </Button>
        <Button
          onClick={() => handleClearAll()}
          classes={{ root: classes.clearButton }}
        >
          <ClearAll />
        </Button>
      </React.Fragment>
    );
  }
}

Controls.propTypes = {
  playing: PropTypes.bool,
  bpm: PropTypes.number,
  steps: PropTypes.array,
  parts: PropTypes.array,
  selectedParts: PropTypes.array,
  activePart: PropTypes.number,
  currentStep: PropTypes.number,
  handleBPMChange: PropTypes.func,
  togglePlay: PropTypes.func,
  handleClearAll: PropTypes.func
};

export default withStyles(styles)(Controls);
