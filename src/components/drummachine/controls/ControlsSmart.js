import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  togglePlay,
  handleBPMChange,
  handleClearAll as handleClearAllAction,
  selectPart
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
    currentStep: state.drummachine.drummachine.currentStep
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { togglePlay, handleBPMChange, handleClearAllAction, selectPart },
    dispatch
  );
};

class ControlsSmart extends Component {
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
    const { selectPart, selectedParts, parts, activePart } = this.props;
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

    selectPart(index, newSelectedParts);
  };

  render() {
    const {
      handleBPMChange,
      togglePlay,
      playing,
      bpm,
      parts,
      activePart,
      selectedParts,
      currentStep,
      steps
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
  selectPart: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsSmart);
