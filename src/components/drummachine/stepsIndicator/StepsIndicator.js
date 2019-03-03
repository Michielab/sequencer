import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core';

const styles = theme =>
  createStyles({
    step: {
      color: 'floralwhite',
      textAlign: 'center',
      borderRadius: '5px',
      [theme.breakpoints.only('xs')]: {
        fontSize: 13
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: 13
      }
    }
  });

class StepsIndicator extends Component {
  render() {
    const { steps, currentStep, activePart, index, classes } = this.props;
    return (
      <span
        key={'steps' + index}
        style={{
          backgroundColor:
            currentStep % steps.length === index ? '#2AB859' : '',
          gridColumn: `${index + 2 - 16 * activePart}   
               `,
          gridRow: '15 / span 1 '
        }}
        className={classes.step}
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

export default withStyles(styles)(StepsIndicator);
