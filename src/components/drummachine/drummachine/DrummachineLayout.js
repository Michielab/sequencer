import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';

/* Import components */
import InstrumentRowSmart from '~/components/drummachine/instrumentRow/InstrumentRowSmart';
import ControlsSmart from '~/components/drummachine/controls/ControlsSmart';
import StepsIndicatorSmart from '~/components/drummachine/stepsIndicator/StepsIndicatorSmart';

const allInstruments = {
  4: [
    'ride',
    'ride2',
    'ride3',
    'ohL',
    'rideL2',
    'rideL3',
    'rideL4',
    'rideL5',
    'rideL6',
    'cbL',
    'cbL2',
    'cbL3',
    'cbL4',
    'cbL5',
    'cbL6'
  ],
  5: [
    'crash',
    'crash2',
    'crashL',
    'crashL2',
    'crashL3',
    'rimL',
    'rimL2',
    'rimL3',
    'rimL4',
    'rimL5',
    'rimL6',
    'rimL7',
    'rimL8',
    'rimL9',
    'rimL10'
  ],

  6: [
    'hh',
    'hh2',
    'hhL',
    'hhL2',
    'hhL3',
    'hhL4',
    'hhL5',
    'hhL6',
    'hhL7',
    'hhL8',
    'hhL9',
    'hhL10',
    'hhL11',
    'hhL12'
  ],
  7: ['oh', 'oh2', 'ohL', 'ohL2', 'ohL3', 'ohL4', 'ohL5', 'ohL6'],
  8: ['ht', 'h2', 'h3', 'caL', 'caL2', 'caL3', 'caL4', 'caL5', 'caL6'],
  9: ['mt', 'mt2'],
  10: [
    'lt',
    'lt2',
    'linnT',
    'linnT2',
    'linnT3',
    'linnT4',
    'linnT5',
    'linnT6',
    'linnT7',
    'linnT8',
    'linnT9'
  ],
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
    'snareL',
    'snareL2',
    'snareL3',
    'snareL4',
    'snareL5',
    'snareL6',
    'snareL7',
    'snareL8',
    'snareL9',
    'snareL10',
    'snareL11',
    'snareL12',
    'snareL13',
    'snareL14',
    'snareL15',
    'snareL16',
    'snareL17',
    'snareL18',
    'snareL19',
    'snareL20',
    'snareL21',
    'snareL22',
    'snareL23',
    'snareL24'
  ],
  12: [
    'clap',
    'clap2',
    'clapL',
    'clapL2',
    'clapL3',
    'clapL4',
    'clapL5',
    'clapL6',
    'clapL7',
    'clapL8',
    'clapL9'
  ],
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
    'kickL',
    'kickL2',
    'kickL3',
    'kickL4',
    'kickL5',
    'kickL6',
    'kickL7',
    'kickL8',
    'kickL9',
    'kickL10',
    'kickL11',
    'kickL12',
    'kickL13',
    'kickL14',
    'kickL15',
    'kickL16'
  ]
};

const styles = theme =>
  createStyles({
    container: {
      position: 'absolute',
      maxWidth: '1230px',
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
        width: '95%'
      },
      [theme.breakpoints.only('sm')]: {
        gridGap: '3px'
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
      4: 'cbL',
      5: 'rimL',
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
