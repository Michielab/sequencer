import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Material-ui */
import { withStyles, Button } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';
import { Slider } from 'material-ui-slider';

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
      gridColumn: '4 / 6'
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
      fontSize: '8px'
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
  },
  knob: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '50px',
    backgroundColor: '#6b6b6b',
    borderRadius: '50%',
    boxShadow: 'inset -2px 2px 0px 0px rgba(#fff, 0.1)'
  },
  knobAfter: {
    position: 'absolute',
    top: '50%',
    left: '75%',
    width: ' 25%',
    height: ' 4px',
    marginTop: '-2px',
    backgroundColor: '#fefefe',
    bordeRadius: '2px',
    transition: 'all 200ms ease-in-out',
    transformOrigin: '-100% 50%',
    boxShadow: '1px -1px 0px 0px rgba(#111, 0.2)',
    content: ''
  },
  filter: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '5 / 6',
      gridRow: '3',
      textAlign: 'center',
      marginTop: '5px',
      marginBottom: '5px',
      color: 'white',
      marginRight: '5px',

    }  
  },
  slider: {
    display: 'none',
    [theme.breakpoints.only('md')]: {
      // width: '100%',
      // minWidth: '40px',
      // marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '6 / 7',
      gridRow: '3',
      marginLeft: '5px'
    }  
  },

  delay: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '5 / 6',
      gridRow: '3',
      textAlign: 'center',
      marginTop: '-10px',
      marginBottom: '5px',
      color: 'white',
      marginRight: '5px',
      alignSelf: 'center'
    }  
  },
  sliderDelay: {
    display: 'none',
    [theme.breakpoints.only('md')]: {
      // width: '100%',
      // minWidth: '40px',
      // marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '6 / 7',
      gridRow: '3',
      marginLeft: '5px',
      alignSelf: 'center'
    }  
  },
  feedback: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '5 / 6',
      gridRow: '3',
      textAlign: 'end',
      // marginTop: '-10px',
      marginBottom: '8px',
      color: 'white',
      marginRight: '5px',
      alignSelf: 'end'
    }  
  },
  sliderFeedback: {
    display: 'none',
    [theme.breakpoints.only('md')]: {
      // width: '100%',
      // minWidth: '40px',
      // marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'unset',
      gridColumn: '6 / 7',
      gridRow: '3',
      marginLeft: '5px',
      alignSelf: 'end'
    }  
  },
  warpSlider: {
    [theme.breakpoints.only('md')]: {
      // width: '100%',
      // minWidth: '40px',
      // marginBottom: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      top: '-10px'
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
      handleSwing,
      setValueEffect,
      // eslint-disable-next-line no-unused-vars
      delay,
      effects,
      // eslint-disable-next-line no-unused-vars
      feedback
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
          onChange={e => handleSwing(parseInt(e.target.value))}
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
          {/* <div
            className={classes.knob}
            onMouseDown={toggleMousePress}
            onMouseUp={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {setValueEffect(e.clientX, e.clientY)}}
            ref={setKnobRef}
          >
            <div
              className={classes.knobAfter}
              style={{
                transform: `rotate(${-220 + effects.currentLevel * 30}deg)`
              }}
            />
          </div> */}
           <label className={classes.filter}>Filter</label>
          <div className={ classes.slider}>
          <Slider
              style={{ width: '100%', height: '20px' }}
              classes={{
                trackContainer: classes.slider,
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={10}
              value={effects.currentValue}
              onChange={value => setValueEffect(value, 'filter')}
              componentPropType="span"
            />

          </div>
          {/* <label className={classes.delay}>Delay</label>
          <div className={ classes.sliderDelay}>
          <Slider
              style={{ width: '100%', height: '20px' }}
              classes={{
                trackContainer: classes.slider,
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={10}
              value={delay.currenLevel}
              onChange={value => setValueEffect(value, 'delay')}
              componentPropType="span"
            />

          </div>
          <label className={classes.feedback}>DelayVo</label>
          <div className={ classes.sliderFeedback}>
          <Slider
              style={{ width: '100%', height: '20px' }}
              classes={{
                trackContainer: classes.slider,
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={10}
              value={feedback.currenLevel}
              onChange={value => setValueEffect(value, 'feedback')}
              componentPropType="span"
            />

          </div> */}
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
