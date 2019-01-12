import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleStep,
  handleAmplitudeChange,
  toggleMute,
  handleSoloToggle
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
    amplitude: state.drummachine.amplitude,
    soloInstruments: state.drummachine.soloInstruments
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { toggleStep, handleAmplitudeChange, toggleMute, handleSoloToggle },
    dispatch
  );
};

class InstrumentRowSmart extends React.PureComponent {
  state = {
    shift: false
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleShiftPress, false);
    window.addEventListener('keyup', this.handleShiftUp, false);

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleShiftPress, false);
    window.removeEventListener('keyup', this.handleShiftUp, false);
  }

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

  handleSoloToggle = instrumentName => {
    const { soloInstruments, handleSoloToggle } = this.props;
    const { shift } = this.state;

    let newSoloInstruments = [];

    shift
      ? soloInstruments.indexOf(instrumentName) === -1
        ? (newSoloInstruments = [...soloInstruments, instrumentName])
        : (newSoloInstruments = [...soloInstruments].filter(
            instrument => instrument !== instrumentName
          ))
      : soloInstruments.indexOf(instrumentName) === -1 &&
        newSoloInstruments.push(instrumentName);
    handleSoloToggle(newSoloInstruments);
  };

  handleShiftPress = e => {
    e.key === 'Shift' && this.setState({ shift: true });
  };

  handleShiftUp = () => {
    this.setState({ shift: false });
  };

  render() {
    const {
      row,
      instrumentName,
      part,
      steps,
      parts,
      mainGain,
      amplitude,
      soloInstruments
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
        handleSoloToggle={this.handleSoloToggle}
        soloInstruments={soloInstruments}
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
  toggleMute: PropTypes.func,
  handleSoloToggle: PropTypes.func,
  soloInstruments: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentRowSmart);
