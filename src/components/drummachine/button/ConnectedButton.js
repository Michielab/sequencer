import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

/* 
instrumentName
      const setStepLength =
        selectedParts.length === 4
          ? beatSteps['partFour'][instrument].length +
            beatSteps['partThree'][instrument].length +
            beatSteps['partTwo'][instrument].length +
            beatSteps['partOne'][instrument].length
          :  selectedParts.length === 3
          ? 
          beatSteps['partThree'][instrument].length +
          beatSteps['partTwo'][instrument].length +
          beatSteps['partOne'][instrument].length
          : selectedParts.length === 2
          ? 
          beatSteps['partTwo'][instrument].length +
          beatSteps['partOne'][instrument].length
          :  beatSteps['partOne'][instrument].length;


*/

// const getStep = (state, ownProps) =>
//   state.drummachine.beatSteps[state.drummachine.parts[state.drummachine.activePart]].hasOwnProperty(ownProps.instrument) ?
//   state.drummachine.drummachine.currentStep %
//     state.drummachine.selectedParts.length ===
//   4
//     ? state.drummachine.beatSteps['partFour'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partThree'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partTwo'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partOne'][ownProps.instrument].length
//     : state.drummachine.selectedParts.length === 3
//     ? state.drummachine.beatSteps['partThree'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partTwo'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partOne'][ownProps.instrument].length
//     : state.drummachine.selectedParts.length === 2
//     ? state.drummachine.beatSteps['partTwo'][ownProps.instrument].length +
//       state.drummachine.beatSteps['partOne'][ownProps.instrument].length
//     : state.drummachine.beatSteps['partOne'][ownProps.instrument].length ===
//       ownProps.index
//     ? true
//     : false : false;
const getStep = (state,ownProps) => state.drummachine.drummachine.currentStep % ownProps.stepLength === ownProps.index ? true : false;

const makeStepData = () =>
  createSelector(
    [getStep],
    currentStep => {
      return {
        currentStep
      };
    }
  );

const mapStateToProps = () => {
  const getStepData = makeStepData();
  return (state, ownProps) => {
    const stepData = getStepData(state, ownProps);
    return stepData;
  };
};

// const mapStateToProps = (state, ownProps) => {
//   return { currentStep: state.drummachine.drummachine.currentStep, playing: state.drummachine.drummachine.playing };
// };

class ConnectedButton extends React.Component {
  // shouldComponentUpdate(nextProps){
  //   if( nextProps.currentStep % this.props.stepLength === this.props.index) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  render() {
    const { currentStep } = this.props;
    return (
      <span
        style={{
          width: '100%',
          borderRadius: '35%',
          backgroundColor: currentStep ? '#2AB859' : 'transparent',
          position: 'absolute',
          bottom: 0,
          height: `100%`,
          zIndex: 99
        }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(ConnectedButton);
