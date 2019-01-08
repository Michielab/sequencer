import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StepsIndicator extends Component {
  render() {
    const { steps, currentStep, activePart, index } = this.props;
    return (
      <span
        key={'steps' + index}
        style={{
          color: 'floralwhite',
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor:
            currentStep % steps.length === index ? '#2AB859' : '',
          gridColumn: `${index + 2 - 16 * activePart}
         
                  
               `,
          gridRow: '12 / span 1 '
        }}
      >
        {index + 1}
      </span>
    );
  }
}

StepsIndicator.propTypes = {
  steps: PropTypes.array,
  activePart: PropTypes.number,
  currentStep: PropTypes.number,
  index: PropTypes.number
};

export default StepsIndicator;
