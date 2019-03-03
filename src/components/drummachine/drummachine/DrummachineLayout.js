import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';

/* Import components */
import InstrumentRowSmart from '~/components/drummachine/instrumentRow/InstrumentRowSmart';
import ControlsSmart from '~/components/drummachine/controls/ControlsSmart';
import StepsIndicatorSmart from '~/components/drummachine/stepsIndicator/StepsIndicatorSmart';

const allInstruments = {
  4: ['ride', 'ride2', 'ride3'],
  5: ['crash', 'crash2'],
  6: ['hh', 'hh2'],
  7: ['oh', 'oh2'],
  8: ['ht', 'h2', 'h3'],
  9: ['mt', 'mt2'],
  10: ['lt', 'lt2'],
  11: [
    'snare',
    'snare2',
    'snare3',
    'snare4',
    'snare5',
    'snare6',
    'snare7',
    'snare8',
    'snare9',
    'snare10',
    'snare11',
    'snare12',
    'snare13',
    'snare14',
    'snare15',
    'snareLinn'
  ],
  12: ['clap', 'clap2'],
  13: [
    'kick',
    'kick2',
    'kick3',
    'kick4',
    'kick5',
    'kick6',
    'kick7',
    'kick8',
    'kick9',
    'kick10',
    'kickLinn'
  ]
};

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
        maxHeight: 'calc(100% - 10px)'
      },
      [theme.breakpoints.only('sm')]: {
        padding: 5,
        width: '95%',
        maxHeight: 'calc(100% - 10px)'
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
        width: '95%',
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
  state = {
    instruments: {
      4: 'ride',
      5: 'crash',
      6: 'hh',
      7: 'oh',
      8: 'ht',
      9: 'mt',
      10: 'lt',
      11: 'snare',
      12: 'clap',
      13: 'kick'
    }
  };

  setInstrument = (key, instrument) => {
    const { instruments } = this.state;
    this.setState({
      instruments: {
        ...instruments,
        [key]: instrument
      }
    });
  };
  render() {
    const { classes } = this.props;
    const { instruments } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.controlsWrapper} />
        <div className={classes.wrapper}>
          <ControlsSmart />
          {Object.keys(instruments).map(key => (
            <InstrumentRowSmart
              key={key}
              instrumentName={instruments[key]}
              row={key}
              baseRow={key === 4}
              setInstrument={this.setInstrument}
              allInstruments={allInstruments}
            />
          ))}
          <StepsIndicatorSmart />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DrumMachineLayout);
