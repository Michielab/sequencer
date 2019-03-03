import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import {
  toggleStep,
  handleAmplitudeChange,
  toggleMute,
  handleSoloToggle,
  handleInstrumentChange
} from '~/ducks/actions/actions';
import InstrumentRow from './InstrumentRow';

const getSteps = (state, props) => {
  return (
    state.drummachine.beatSteps[
      state.drummachine.parts[state.drummachine.activePart]
    ].hasOwnProperty(props.instrumentName) ?
    state.drummachine.beatSteps[
      state.drummachine.parts[state.drummachine.activePart]
    ][props.instrumentName] :  props.row === '6' ? 
      [
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
        { step: 0, amplitude: 100 },
      ] :
     state.drummachine.beatSteps.steps
  );
};
const getPart = state => state.drummachine.parts[state.drummachine.activePart];
const getParts = state => state.drummachine.parts;
const getActivePart = state => state.drummachine.activePart;
const getMainGain = (state, props) =>
  state.drummachine.amplitude.hasOwnProperty(props.instrumentName)
    ? state.drummachine.amplitude[props.instrumentName]
    : state.drummachine.amplitude.mainGain;
const getMuteState = (state, props) =>
  state.drummachine.amplitude.hasOwnProperty(props.instrumentName + 'Mute')
    ? state.drummachine.amplitude[props.instrumentName + 'Mute']
      ? true
      : false
    : false;
const getSoloInstruments = state => state.drummachine.soloInstruments;
const getCurrentStep = (state, props) =>  props.row === '6' && state.drummachine.drummachine.currentStep;
const makeInstrumentRowData = () =>
  createSelector(
    [
      getSteps,
      getParts,
      getPart,
      getActivePart,
      getMainGain,
      getSoloInstruments,
      getMuteState,
      getCurrentStep
    ],
    (
      steps,
      parts,
      part,
      activePart,
      mainGain,
      soloInstruments,
      getMuteState,
      getCurrentStep
    ) => {
      return {
        steps,
        parts,
        part,
        activePart,
        mainGain,
        soloInstruments,
        mute: getMuteState,
        getCurrentStep
      };
    }
  );

const mapStateToProps = () => {
  const getInstrumentRowData = makeInstrumentRowData();
  return (state, ownProps) => {
    const instrumentData = getInstrumentRowData(state, ownProps);
    return { ...instrumentData };
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleStep,
      handleAmplitudeChange,
      toggleMute,
      handleSoloToggle,
      handleInstrumentChange
    },
    dispatch
  );
};

class InstrumentRowSmart extends React.PureComponent {
  state = {
    shift: false
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleShiftPress, true);
    window.addEventListener('keyup', this.handleShiftUp, true);

    if (this.props.baseRow) {
      window.addEventListener('keypress', this.handleKeyPress, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleShiftPress, true);
    window.removeEventListener('keyup', this.handleShiftUp, true);
    if (this.props.baseRow) {
      window.removeEventListener('keypress', this.handleKeyPress, true);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.updateInstrumentRow(prevProps.instrumentName);
    }
  }

  updateInstrumentRow = prevInstrument => {
    const { instrumentName, handleInstrumentChange } = this.props;
    handleInstrumentChange(prevInstrument, instrumentName);
  };

  toggleStep = (index, volume) => {
    const { instrumentName, row } = this.props;
    let { steps } = this.props;

    // if(row === '6') {
    //   steps = [
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //   ]
    // }
    this.props.toggleStep(instrumentName, index, volume, steps);
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
    // eslint-disable-next-line no-unused-expressions
    e.key === 'Shift' && this.setState({ shift: true, keyPressed: true });
  };

  handleShiftUp = () => {
    this.setState({ shift: false });
  };

  handleKeyPress = e => {
    const instrumentsNames = {
      Digit1: 'ride',
      Digit2: 'hh',
      Digit3: 'mt',
      Digit4: 'snare',
      Digit5: 'clap',
      Digit6: 'kick'
    };

    if (Object.keys(instrumentsNames).indexOf(e.code) !== -1) {
      if (e.shiftKey === true && !this.state.shift) {
        this.setState({ shift: true });
      }

      e.ctrlKey
        ? this.handleToggleMute(instrumentsNames[e.code])
        : this.handleSoloToggle(instrumentsNames[e.code]);
    }
  };

  render() {
    const {
      row,
      instrumentName,
      part,
      parts,
      mainGain,
      soloInstruments = [],
      allInstruments,
      setInstrument,
      mute,
      getCurrentStep
      // steps
    } = this.props;
    let { steps } = this.props;

    // if(row === '6') {
    //   steps = [
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //     { step: 0, amplitude: 100 },
    //   ]
    // }
    console.log(this.props)
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
        handleSoloToggle={this.handleSoloToggle}
        soloInstruments={soloInstruments}
        allInstruments={allInstruments}
        setInstrument={setInstrument}
        mute={mute}
        getCurrentStep={getCurrentStep}
      />
    );
  }
}

InstrumentRowSmart.propTypes = {
  instrumentName: PropTypes.string,
  parts: PropTypes.array,
  part: PropTypes.string,
  activePart: PropTypes.number,
  row: PropTypes.string,
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
