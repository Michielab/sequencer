import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Imports Redux */
import { selectPart } from '~/ducks/actions/actions';
import { bindActionCreators } from 'redux';

/* Import Components */
import StepsIndicator from '~/components/drummachine/stepsIndicator/StepsIndicator';

function mapStateToProps(state) {
  return {
    steps: state.drummachine.beatSteps.steps,
    currentStep: state.drummachine.drummachine.currentStep,
    parts: state.drummachine.parts,
    activePart: state.drummachine.activePart,
    beatSteps: state.drummachine.beatSteps,
    selectedParts: state.drummachine.selectedParts
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPart }, dispatch);
};

class StepsIndicatorSmart extends Component {
  render() {
    const { currentStep, activePart, selectedParts } = this.props;
    let { steps } = this.props;

    let allSteps = [...steps, ...steps, ...steps, ...steps];

    let minIndex =
      activePart === 0 ? 0 : activePart === 1 ? 16 : activePart === 2 ? 32 : 48;

    let maxIndex =
      activePart === 0
        ? 16
        : activePart === 1
        ? 32
        : activePart === 2
        ? 48
        : 64;

    steps =
      selectedParts.indexOf('partFour') !== -1
        ? [...steps, ...steps, ...steps, ...steps]
        : selectedParts.indexOf('partThree') !== -1
        ? [...steps, ...steps, ...steps]
        : selectedParts.indexOf('partTwo') !== -1
        ? [...steps, ...steps]
        : steps;

    return allSteps.map(
      (step, index) =>
        index >= minIndex &&
        index < maxIndex && (
          <StepsIndicator
            key={index}
            steps={steps}
            currentStep={currentStep}
            activePart={activePart}
            index={index}
          />
        )
    );
  }
}

StepsIndicatorSmart.propTypes = {
  steps: PropTypes.array,
  parts: PropTypes.array,
  selectedParts: PropTypes.array,
  activePart: PropTypes.number,
  currentStep: PropTypes.number,
  selectPart: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsIndicatorSmart);
