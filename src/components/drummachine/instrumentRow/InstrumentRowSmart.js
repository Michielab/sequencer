import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleStep,
  handleAmplitudeChange,
  toggleMute
} from '~/ducks/actions/actions';

import InstrumentRow from './InstrumentRow';

const mapStateToProps = (state, ownProps) => {
  const part = state.drummachine.parts[state.drummachine.activePart];
  const instrumentName = ownProps.instrumentName;
  const stepArray = state.drummachine.beatSteps[part].hasOwnProperty(
    instrumentName
  )
    ? [...state.drummachine.beatSteps[part][instrumentName]]
    : [...state.drummachine.beatSteps.steps];

  const mainGain = state.drummachine.amplitude.hasOwnProperty(instrumentName)
    ? state.drummachine.amplitude[instrumentName]
    : state.drummachine.amplitude.mainGain;
  return {
    steps: stepArray,
    parts: state.drummachine.parts,
    part,
    beatSteps: state.drummachine.beatSteps,
    activePart: state.drummachine.activePart,
    mainGain,
    amplitude: state.drummachine.amplitude
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { toggleStep, handleAmplitudeChange, toggleMute },
    dispatch
  );
};

class InstrumentRowSmart extends React.PureComponent {
  toggleStep = (index, volume) => {
    const { part, beatSteps, parts, activePart, instrumentName } = this.props;

    let newSteps = beatSteps;

    if (
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) &&
        activePart === 1) ||
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) &&
        activePart === 2) ||
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) && activePart === 3)
    ) {
      newSteps[parts[0]][instrumentName] = beatSteps[parts[0]].steps;
    }

    if (
      (!beatSteps[parts[1]].hasOwnProperty(instrumentName) &&
        activePart === 3) ||
      (!beatSteps[parts[1]].hasOwnProperty(instrumentName) && activePart === 2)
    ) {
      newSteps[parts[1]][instrumentName] = beatSteps[parts[1]].steps;
    }

    if (
      !beatSteps[parts[2]].hasOwnProperty(instrumentName) &&
      activePart === 3
    ) {
      newSteps[parts[2]][instrumentName] = beatSteps[parts[2]].steps;
    }

    let steps = this.props.steps;
    const stepValue =
      steps[index].step === 1 ? (steps[index].amplitude !== volume ? 1 : 0) : 1;

    newSteps[part][instrumentName] = steps;
    newSteps[part][instrumentName][index] = {
      step: stepValue,
      amplitude: volume
    };

    this.props.toggleStep(newSteps);
  };

  changeAmplitude = (instrumentName, amplitudeValue) => {
    const { handleAmplitudeChange } = this.props;
    handleAmplitudeChange(instrumentName, amplitudeValue);
  };

  handleToggleMute = instrumentName => {
    const { toggleMute } = this.props;
    toggleMute(instrumentName);
  };

  render() {
    const {
      row,
      instrumentName,
      part,
      steps,
      parts,
      mainGain,
      amplitude
    } = this.props;
    return (
      <InstrumentRow
        instrumentName={instrumentName}
        row={row}
        steps={steps}
        toggleStep={this.toggleStep}
        parts={parts}
        part={part}
        mainGain={mainGain}
        changeAmplitude={this.changeAmplitude}
        toggleMute={this.handleToggleMute}
        amplitude={amplitude}
      />
    );
  }
}

InstrumentRowSmart.propTypes = {
  instrumentName: PropTypes.string,
  steps: PropTypes.array,
  parts: PropTypes.array,
  part: PropTypes.string,
  beatSteps: PropTypes.object,
  activePart: PropTypes.number,
  row: PropTypes.number,
  mainGain: PropTypes.number,
  amplitude: PropTypes.object,
  toggleStep: PropTypes.func,
  handleAmplitudeChange: PropTypes.func,
  toggleMute: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentRowSmart);
