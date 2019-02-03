import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  togglePlay,
  handleBPMChange,
  handleClearAll as handleClearAllAction,
  selectPart,
  handleSwing,
  handleCopyPart,
  handleEffectChange,
  handleValueEffectChange,
  handleSoloToggle
} from '~/ducks/actions/actions';

/* Imports components */
import Controls from '~/components/drummachine/controls/Controls';

const mapStateToProps = state => {
  return {
    bpm: state.drummachine.drummachine.bpm,
    playing: state.drummachine.drummachine.playing,
    beatSteps: state.drummachine.beatSteps,
    parts: state.drummachine.parts,
    activePart: state.drummachine.activePart,
    selectedParts: state.drummachine.selectedParts,
    steps: state.drummachine.beatSteps.steps,
    currentStep: state.drummachine.drummachine.currentStep,
    swing: state.drummachine.drummachine.swing,
    effects: state.drummachine.effects
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      togglePlay,
      handleBPMChange,
      handleClearAllAction,
      selectPart,
      handleSwing,
      handleCopyPart,
      handleEffectChange,
      handleValueEffectChange,
      handleSoloToggle
    },
    dispatch
  );
};

class ControlsSmart extends Component {
  state = {
    mousePressed: false,
    knob: undefined
  }
  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress, false);
  }

  componentWillMount() {
    window.removeEventListener('keypress', this.handleKeyPress, false);
  }

  handleKeyPress = e => {
    if (e.code === 'Space') {
      this.props.togglePlay();
    }

    if(e.code === 'KeyF') {
      this.props.handleEffectChange(!this.props.effects.active)
    }

    if(e.code === 'KeyQ') {
      this.props.handleEffectChange(false)
      this.props.handleSoloToggle([])
    }
  };

  /* method to clear all the steps */
  handleClearAll = () => {
    let { beatSteps } = this.props;

    Object.keys(beatSteps)
      .filter(el => el !== 'steps')
      .map(part =>
        Object.keys(beatSteps[part]).map(
          instrument =>
            (beatSteps[part][instrument] = beatSteps[part][instrument].map(
              step => {
                return { ...step, step: 0 };
              }
            ))
        )
      );

    this.props.handleClearAllAction(beatSteps);
  };

  toggleParts = index => {
    const {
      selectPart,
      selectedParts,
      parts,
      activePart,
      beatSteps,
      handleCopyPart
    } = this.props;
    let newSelectedParts = selectedParts;
    // eslint-disable-next-line
    selectedParts.indexOf(parts[index]) !== -1 &&
    parts[activePart] === parts[index]
      ? (newSelectedParts = newSelectedParts.filter(
          part => part !== parts[index]
        ))
      : selectedParts.indexOf(parts[index]) !== -1
      ? ''
      : newSelectedParts.push(parts[index]);

    // eslint-disable-next-line no-unused-expressions
    index !== 0 &&
      Object.keys(beatSteps[parts[index]]).length === 1 &&
      handleCopyPart(beatSteps[parts[index - 1]], parts[index]);

    selectPart(index, newSelectedParts);
  };

  setTypeOfEffect = (effect) => {
    this.props.handleEffectChange(effect)
  }

  setValueEffect = (effectValue) => {
    // const { mousePositionX, knob } = this.state;
    // console.log('e', knob.getBoundingClientRect(), mousePositionX,  clientX, clientY)
    // const knobPositionX = knob.getBoundingClientRect().x; // 0%
    // const knobWidth = knob.getBoundingClientRect().width
    // const maxXpostion = knobPositionX + knobWidth; // 100%
    // console.log(clientX / maxXpostion * 100)
    this.props.handleValueEffectChange(effectValue)
  }


  render() {
    console.log(this.props)
    const {
      handleBPMChange,
      togglePlay,
      playing,
      bpm,
      parts,
      activePart,
      selectedParts,
      currentStep,
      steps,
      swing,
      handleSwing,
      effects
    } = this.props;

    return (
      <Controls
        togglePlay={togglePlay}
        handleBPMChange={handleBPMChange}
        handleClearAll={this.handleClearAll}
        playing={playing}
        bpm={bpm}
        toggleParts={this.toggleParts}
        parts={parts}
        activePart={activePart}
        selectedParts={selectedParts}
        currentStep={currentStep}
        steps={steps}
        swing={swing}
        handleSwing={handleSwing}
        effects={effects}
        setTypeOfEffect={this.setTypeOfEffect}
        setValueEffect={this.setValueEffect}
      />
    );
  }
}

ControlsSmart.propTypes = {
  playing: PropTypes.bool,
  bpm: PropTypes.number,
  steps: PropTypes.array,
  parts: PropTypes.array,
  selectedParts: PropTypes.array,
  part: PropTypes.string,
  beatSteps: PropTypes.object,
  activePart: PropTypes.number,
  currentStep: PropTypes.number,
  handleBPMChange: PropTypes.func,
  togglePlay: PropTypes.func,
  handleClearAllAction: PropTypes.func,
  selectPart: PropTypes.func,
  swing: PropTypes.number,
  effects: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsSmart);
