import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';

/* Import components */
import InstrumentRowSmart from '~/components/drummachine/instrumentRow/InstrumentRowSmart';
import ControlsSmart from '~/components/drummachine/controls/ControlsSmart';
import StepsIndicatorSmart from '~/components/drummachine/stepsIndicator/StepsIndicatorSmart';

const styles = theme =>
  createStyles({
    container: {
      position: 'absolute',
      maxWidth: '1200px',
      borderRadius: '5px',
      top: ' 50%',
      left: ' 50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      backgroundColor: '#212121',
      padding: '20px',
      WebkitBoxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
      MozBoxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
      boxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
      [theme.breakpoints.only('xs')]: {
        padding: 5,
        width: '95%',
      },
      [theme.breakpoints.only('sm')]: {
        padding: 10,
        width: '95%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '100%'
      }
    },
    wrapper: {
      width: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns:
        ' (gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )',
      gridTemplateRows: 'repeat(13, (row) auto (gutter) 20px )',
      rowGap: '5px',
      gridGap: '5px',
      [theme.breakpoints.only('xs')]: {
        gridGap: '1px',
      },
      [theme.breakpoints.only('sm')]: {
        gridGap: '3px',
      }

    },
    controlsWrapper: {
      width: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns:
        ' (gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )',
      gridTemplateRows: 'repeat(1, (row) auto (gutter) 20px )',
      rowGap: '5px',
      gridGap: '5px',
      alignItems: 'center'
    }
  });

class DrumMachineLayout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.controlsWrapper} />
        <div className={classes.wrapper}>
          <ControlsSmart />
          <InstrumentRowSmart instrumentName="ride" row={3} />
          <InstrumentRowSmart instrumentName="crash" row={4} />
          <InstrumentRowSmart instrumentName="highHat" row={5} />
          <InstrumentRowSmart instrumentName="mt" row={6} />
          <InstrumentRowSmart instrumentName="snare" row={7} />
          <InstrumentRowSmart instrumentName="clap" row={8} />
          <InstrumentRowSmart instrumentName="kick" row={9} />
          <StepsIndicatorSmart />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DrumMachineLayout);
