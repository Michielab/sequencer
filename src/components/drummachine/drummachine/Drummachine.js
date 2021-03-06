import React, { Component } from 'react';
import WAAClock from 'waaclock';
import { sampleLoader } from '~/utils/Kick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentStep } from '~/ducks/actions/actions';
import AudioCtxContext from '../audioContext/AudioContext';
import { withStyles, createStyles } from '@material-ui/core';

const styles = theme =>
  createStyles({
    canvas: {
      width: '100%',
      height: '30%'
    }
  });

const mapStateToProps = state => {
  return {
    playing: state.drummachine.drummachine.playing,
    bpm: state.drummachine.drummachine.bpm,
    beatSteps: state.drummachine.beatSteps,
    currentStep: state.drummachine.drummachine.currentStep,
    activePart: state.drummachine.activePart,
    parts: state.drummachine.parts,
    selectedParts: state.drummachine.selectedParts,
    amplitude: state.drummachine.amplitude,
    soloInstruments: state.drummachine.soloInstruments,
    swing: state.drummachine.drummachine.swing,
    effects: state.drummachine.effects,
    delay: state.drummachine.delay,
    feedback: state.drummachine.feedback
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setCurrentStep }, dispatch);
};

class Drummachine extends Component {
  audioContext;
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }

  componentDidMount() {
    /* To create a new audio context */
    /* WAAClock is a library that helps scheduling things in time for the 
    WEB audio API. 
    */
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.clock = new WAAClock(this.audioContext);

    // linn
    // highHat
    sampleLoader(
      './wa_free_ldrum_cl-hat_01_t1.wav',
      this.audioContext,
      buffer => {
        this.hhLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_01_t2.wav',
      this.audioContext,
      buffer => {
        this.hhL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_01_t3.wav',
      this.audioContext,
      buffer => {
        this.hhL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_02_t1.wav',
      this.audioContext,
      buffer => {
        this.hhL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_02_t2.wav',
      this.audioContext,
      buffer => {
        this.hhL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_02_t3.wav',
      this.audioContext,
      buffer => {
        this.hhL6Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_03_t1.wav',
      this.audioContext,
      buffer => {
        this.hhL7Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_03_t2.wav',
      this.audioContext,
      buffer => {
        this.hhL8Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_03_t3.wav',
      this.audioContext,
      buffer => {
        this.hhL9Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_04_t1.wav',
      this.audioContext,
      buffer => {
        this.hhL10Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_04_t2.wav',
      this.audioContext,
      buffer => {
        this.hhL11Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cl-hat_04_t3.wav',
      this.audioContext,
      buffer => {
        this.hhL12Buffer = buffer;
      }
    );

    // clap
    sampleLoader(
      './wa_free_ldrum_clap_01_t1.wav',
      this.audioContext,
      buffer => {
        this.clapLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_01_t2.wav',
      this.audioContext,
      buffer => {
        this.clapL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_01_t3.wav',
      this.audioContext,
      buffer => {
        this.clapL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_02_t1.wav',
      this.audioContext,
      buffer => {
        this.clapL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_02_t2.wav',
      this.audioContext,
      buffer => {
        this.clapL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_02_t3.wav',
      this.audioContext,
      buffer => {
        this.clapL6Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_03_t1.wav',
      this.audioContext,
      buffer => {
        this.clapL7Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_03_t2.wav',
      this.audioContext,
      buffer => {
        this.clapL8Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_clap_03_t3.wav',
      this.audioContext,
      buffer => {
        this.clapL9Buffer = buffer;
      }
    );

    // sd
    sampleLoader(
      './wa_free_ldrum_snare_01_t1.wav',
      this.audioContext,
      buffer => {
        this.snareLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_01_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_01_t3.wav',
      this.audioContext,
      buffer => {
        this.snareL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_02_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_02_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_02_t3.wav',
      this.audioContext,
      buffer => {
        this.snareL6Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_03_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL7Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_03_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL8Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_04_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL9Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_04_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL10Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_05_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL11Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_05_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL12Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_06_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL13Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_06_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL14Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_07_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL15Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_07_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL16Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_08_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL17Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_08_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL18Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_09_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL19Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_09_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL20Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_10_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL21Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_10_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL22Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_11_t1.wav',
      this.audioContext,
      buffer => {
        this.snareL23Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_snare_11_t2.wav',
      this.audioContext,
      buffer => {
        this.snareL24Buffer = buffer;
      }
    );

    // cr

    sampleLoader(
      './wa_free_ldrum_crash_01_t1.wav',
      this.audioContext,
      buffer => {
        this.crashLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_crash_01_t2.wav',
      this.audioContext,
      buffer => {
        this.crashL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_crash_01_t3.wav',
      this.audioContext,
      buffer => {
        this.crashL3Buffer = buffer;
      }
    );

    // ride
    sampleLoader(
      './wa_free_ldrum_ride_01_t1.wav',
      this.audioContext,
      buffer => {
        this.rideLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_ride_01_t2.wav',
      this.audioContext,
      buffer => {
        this.rideL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_ride_02_t1.wav',
      this.audioContext,
      buffer => {
        this.rideL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_ride_02_t2.wav',
      this.audioContext,
      buffer => {
        this.rideL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_ride_02_t3.wav',
      this.audioContext,
      buffer => {
        this.rideL5Buffer = buffer;
      }
    );

    // bd
    sampleLoader(
      './wa_free_ldrum_kick_01_t1.wav',
      this.audioContext,
      buffer => {
        this.kickLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_02_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_02_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_02_t3.wav',
      this.audioContext,
      buffer => {
        this.kickL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_03_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_03_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL6Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_04_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL7Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_05_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL8Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_05_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL9Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_06_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL10Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_07_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL11Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_07_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL12Buffer = buffer;
      }
    );
    sampleLoader(
      './wa_free_ldrum_kick_08_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL12Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_08_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL13Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_09_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL14Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_09_t2.wav',
      this.audioContext,
      buffer => {
        this.kickL15Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_kick_10_t1.wav',
      this.audioContext,
      buffer => {
        this.kickL16Buffer = buffer;
      }
    );

    // oh

    sampleLoader(
      './wa_free_ldrum_op-hat_01_t1.wav',
      this.audioContext,
      buffer => {
        this.ohLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_op-hat_01_t2.wav',
      this.audioContext,
      buffer => {
        this.ohL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_op-hat_01_t3.wav',
      this.audioContext,
      buffer => {
        this.ohL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_op-hat_02_t1.wav',
      this.audioContext,
      buffer => {
        this.ohL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_op-hat_02_t2.wav',
      this.audioContext,
      buffer => {
        this.ohL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_op-hat_02_t3.wav',
      this.audioContext,
      buffer => {
        this.ohL6Buffer = buffer;
      }
    );

    // ht

    sampleLoader('./wa_free_ldrum_tom_01_t1.wav', this.audioContext, buffer => {
      this.linnTBuffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_tom_02_t1.wav', this.audioContext, buffer => {
      this.linnT1Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_03_t1.wav', this.audioContext, buffer => {
      this.linnT2Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_04_t1.wav', this.audioContext, buffer => {
      this.linnT3Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_05_t1.wav', this.audioContext, buffer => {
      this.linnT4Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_06_t1.wav', this.audioContext, buffer => {
      this.linnT5Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_07_t1.wav', this.audioContext, buffer => {
      this.linnT6Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_08_t1.wav', this.audioContext, buffer => {
      this.linnT7Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_09_t1.wav', this.audioContext, buffer => {
      this.linnT8Buffer = buffer;
    });
    sampleLoader('./wa_free_ldrum_tom_10_t1.wav', this.audioContext, buffer => {
      this.linnT9Buffer = buffer;
    });

    // lt
    sampleLoader('./lt01.wav', this.audioContext, buffer => {
      this.ltBuffer = buffer;
    });

    sampleLoader('./lt02.wav', this.audioContext, buffer => {
      this.lt2Buffer = buffer;
    });

    //cabasa
    sampleLoader(
      './wa_free_ldrum_cabasa_01_t1.wav',
      this.audioContext,
      buffer => {
        this.caLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cabasa_01_t2.wav',
      this.audioContext,
      buffer => {
        this.caL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cabasa_01_t3.wav',
      this.audioContext,
      buffer => {
        this.caL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cabasa_02_t1.wav',
      this.audioContext,
      buffer => {
        this.caL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cabasa_03_t1.wav',
      this.audioContext,
      buffer => {
        this.caL5Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cabasa_03_t2.wav',
      this.audioContext,
      buffer => {
        this.caL6Buffer = buffer;
      }
    );

    //rim
    sampleLoader('./wa_free_ldrum_rim_01_t1.wav', this.audioContext, buffer => {
      this.rimLBuffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_01_t2.wav', this.audioContext, buffer => {
      this.rimL2Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_02_t1.wav', this.audioContext, buffer => {
      this.rimL3Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_02_t2.wav', this.audioContext, buffer => {
      this.rimL4Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_03_t1.wav', this.audioContext, buffer => {
      this.rimL5Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_03_t2.wav', this.audioContext, buffer => {
      this.rimL6Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_04_t1.wav', this.audioContext, buffer => {
      this.rimL7Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_04_t2.wav', this.audioContext, buffer => {
      this.rimL8Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_05_t1.wav', this.audioContext, buffer => {
      this.rimL9Buffer = buffer;
    });

    sampleLoader('./wa_free_ldrum_rim_05_t2.wav', this.audioContext, buffer => {
      this.rimL10Buffer = buffer;
    });

    //cowbell
    sampleLoader(
      './wa_free_ldrum_cowbell_01_t1.wav',
      this.audioContext,
      buffer => {
        this.cbLBuffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cowbell_01_t2.wav',
      this.audioContext,
      buffer => {
        this.cbL2Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cowbell_02_t1.wav',
      this.audioContext,
      buffer => {
        this.cbL3Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cowbell_02_t2.wav',
      this.audioContext,
      buffer => {
        this.cbL4Buffer = buffer;
      }
    );

    sampleLoader(
      './wa_free_ldrum_cowbell_03_t1.wav',
      this.audioContext,
      buffer => {
        this.cbL5Buffer = buffer;
      }
    );
    sampleLoader(
      './wa_free_ldrum_cowbell_03_t2.wav',
      this.audioContext,
      buffer => {
        this.cbL6Buffer = buffer;
      }
    );

    // highHat
    sampleLoader('./hihat.wav', this.audioContext, buffer => {
      this.hhBuffer = buffer;
    });

    sampleLoader('./hh01.wav', this.audioContext, buffer => {
      this.hh2Buffer = buffer;
    });

    sampleLoader('./hh02.wav', this.audioContext, buffer => {
      this.hh3Buffer = buffer;
    });

    // clap
    sampleLoader('./clap.wav', this.audioContext, buffer => {
      this.clapBuffer = buffer;
    });

    sampleLoader('./cp02.wav', this.audioContext, buffer => {
      this.clap2Buffer = buffer;
    });

    // mt
    sampleLoader('./mt01.wav', this.audioContext, buffer => {
      this.mtBuffer = buffer;
    });

    sampleLoader('./mt02.wav', this.audioContext, buffer => {
      this.mt2Buffer = buffer;
    });

    // sd
    sampleLoader('./sd01.wav', this.audioContext, buffer => {
      this.snareBuffer = buffer;
    });

    sampleLoader('./sd02.wav', this.audioContext, buffer => {
      this.snare2Buffer = buffer;
    });
    sampleLoader('./sd03.wav', this.audioContext, buffer => {
      this.snare3Buffer = buffer;
    });
    sampleLoader('./sd04.wav', this.audioContext, buffer => {
      this.snare4Buffer = buffer;
    });
    sampleLoader('./sd05.wav', this.audioContext, buffer => {
      this.snare5Buffer = buffer;
    });
    sampleLoader('./sd06.wav', this.audioContext, buffer => {
      this.snare6Buffer = buffer;
    });
    sampleLoader('./sd07.wav', this.audioContext, buffer => {
      this.snare7Buffer = buffer;
    });
    sampleLoader('./sd08.wav', this.audioContext, buffer => {
      this.snare8Buffer = buffer;
    });
    sampleLoader('./sd09.wav', this.audioContext, buffer => {
      this.snare9Buffer = buffer;
    });
    sampleLoader('./sd10.wav', this.audioContext, buffer => {
      this.snare10Buffer = buffer;
    });

    sampleLoader('./sd11.wav', this.audioContext, buffer => {
      this.snare11Buffer = buffer;
    });

    sampleLoader('./sd12.wav', this.audioContext, buffer => {
      this.snare12Buffer = buffer;
    });

    sampleLoader('./sd13.wav', this.audioContext, buffer => {
      this.snare13Buffer = buffer;
    });

    sampleLoader('./sd14.wav', this.audioContext, buffer => {
      this.snare14Buffer = buffer;
    });

    sampleLoader('./sd15.wav', this.audioContext, buffer => {
      this.snare15Buffer = buffer;
    });

    sampleLoader('./sdLinn.wav', this.audioContext, buffer => {
      this.snareLinnBuffer = buffer;
    });

    // cr

    sampleLoader('./cr01.wav', this.audioContext, buffer => {
      this.crashBuffer = buffer;
    });

    sampleLoader('./cr02.wav', this.audioContext, buffer => {
      this.crash2Buffer = buffer;
    });

    // ride
    sampleLoader('./cym.wav', this.audioContext, buffer => {
      this.rideBuffer = buffer;
    });

    sampleLoader('./rd01.wav', this.audioContext, buffer => {
      this.ride2Buffer = buffer;
    });

    sampleLoader('./rd02.wav', this.audioContext, buffer => {
      this.ride3Buffer = buffer;
    });

    // bd
    sampleLoader('./bd01.wav', this.audioContext, buffer => {
      this.kickBuffer = buffer;
    });
    sampleLoader('./bd02.wav', this.audioContext, buffer => {
      this.kick2Buffer = buffer;
    });
    sampleLoader('./bd03.wav', this.audioContext, buffer => {
      this.kick3Buffer = buffer;
    });
    sampleLoader('./bd04.wav', this.audioContext, buffer => {
      this.kick4Buffer = buffer;
    });
    sampleLoader('./bd05.wav', this.audioContext, buffer => {
      this.kick5Buffer = buffer;
    });
    sampleLoader('./bd06.wav', this.audioContext, buffer => {
      this.kick6Buffer = buffer;
    });
    sampleLoader('./bd07.wav', this.audioContext, buffer => {
      this.kick7Buffer = buffer;
    });
    sampleLoader('./bd08.wav', this.audioContext, buffer => {
      this.kick8Buffer = buffer;
    });
    sampleLoader('./bd09.wav', this.audioContext, buffer => {
      this.kick9Buffer = buffer;
    });
    sampleLoader('./bd10.wav', this.audioContext, buffer => {
      this.kick10Buffer = buffer;
    });

    // oh

    sampleLoader('./oh01.wav', this.audioContext, buffer => {
      this.ohBuffer = buffer;
    });

    sampleLoader('./oh02.wav', this.audioContext, buffer => {
      this.oh2Buffer = buffer;
    });

    // ht

    sampleLoader('./ht01.wav', this.audioContext, buffer => {
      this.htBuffer = buffer;
    });

    sampleLoader('./ht02.wav', this.audioContext, buffer => {
      this.ht2Buffer = buffer;
    });

    // lt
    sampleLoader('./lt01.wav', this.audioContext, buffer => {
      this.ltBuffer = buffer;
    });

    sampleLoader('./lt02.wav', this.audioContext, buffer => {
      this.lt2Buffer = buffer;
    });
    // this.draw();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  componentDidUpdate(prevProps) {
    const { playing, bpm, setCurrentStep } = this.props;
    if (prevProps.playing !== playing) {
      // eslint-disable-next-line no-unused-expressions
      !playing
        ? (setCurrentStep(0), this.stopTickEvent())
        : (setCurrentStep(-1), this.startTickEvent());
      this.audioContext.resume();
    }
    if (prevProps.bpm !== bpm && playing) {
      this.tickEvent.repeat(this.covertBMPtoSeconds(bpm));
    }
  }

  covertBMPtoSeconds = bpm => {
    return 60 / bpm / 4;
  };

  /* This method is used to start playing and schedule a event for the WEB audio API
   */

  startTickEvent = () => {
    const { bpm } = this.props;
    this.setState(
      {
        currentStep: -1
      },
      () => {
        this.clock.start();
        this.tickEvent = this.clock
          .callbackAtTime(
            this.handleTick.bind(this),
            this.audioContext.currentTime
          )
          .repeat(this.covertBMPtoSeconds(bpm));
      }
    );
  };

  stopTickEvent = () => {
    this.setState(() => {
      this.clock.stop();
      this.tickEvent.clear();
      this.tickEvent = null;
    });
  };

  /* callback function that is going to be called before the sound is played */
  handleTick({ deadline }) {
    const {
      beatSteps,
      currentStep,
      setCurrentStep,
      selectedParts,
      amplitude,
      soloInstruments,
      swing,
      bpm,
      effects,
      delay,
      feedback
      // parts,
      // activePart
    } = this.props;
    // console.log(beatSteps)

    let newDeadLine = deadline;
    const newCurrentStep = currentStep + 1;
    // eslint-disable-next-line no-unused-vars
    let steps = [
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
      { step: 0, amplitude: 100 },
      { step: 0, amplitude: 100 },
      { step: 0, amplitude: 100 },
      { step: 0, amplitude: 100 },
      { step: 0, amplitude: 100 },
      { step: 0, amplitude: 100 }
    ];

    let beats = {};

    let keyArray = Object.keys(beatSteps).filter(
      element => element !== 'steps'
    );

    keyArray.map(part =>
      Object.keys(beatSteps[part]).map((instrument, index) => {
        return beats.hasOwnProperty(instrument)
          ? (beats[instrument] = beats[instrument].concat(
              ...beatSteps[part][instrument]
            ))
          : (beats[instrument] = beatSteps[part][instrument]);
      })
    );

    steps =
      selectedParts.indexOf('partFour') !== -1
        ? [...steps, ...steps, ...steps, ...steps]
        : selectedParts.indexOf('partThree') !== -1
        ? [...steps, ...steps, ...steps]
        : selectedParts.indexOf('partTwo') !== -1
        ? [...steps, ...steps]
        : steps;

    // eslint-disable-next-line array-callback-return
    Object.keys(beats).map((instrument, index) => {
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
      if (beats[instrument][newCurrentStep % setStepLength]) {
        if (beats[instrument][newCurrentStep % setStepLength].step) {
          const buffer = instrument + 'Buffer';

          const amplitudeValue = amplitude.hasOwnProperty(instrument)
            ? ((amplitude[instrument] / 100) *
                beats[instrument][newCurrentStep % setStepLength]
                  .amplitude) /
              100
            : beats[instrument][newCurrentStep % setStepLength]
                .amplitude / 100;

          let gainValue = amplitude.hasOwnProperty(instrument + 'Mute')
            ? amplitude[instrument + 'Mute']
              ? 0
              : amplitudeValue
            : amplitudeValue;

          if (swing > 0 && newCurrentStep % 2 === 1) {
            newDeadLine =
              newDeadLine + (this.covertBMPtoSeconds(bpm) / 30) * swing;
          }

          // eslint-disable-next-line no-unused-expressions
          soloInstruments.length > 0
            ? soloInstruments.indexOf(instrument) !== -1
              ? this.triggerSound(
                  this.audioContext,
                  newDeadLine,
                  this[buffer],
                  gainValue,
                  instrument,
                  effects,
                  delay,
                  feedback
                )
              : ''
            : this.triggerSound(
                this.audioContext,
                newDeadLine,
                this[buffer],
                gainValue,
                instrument,
                effects,
                delay,
                feedback
              );

          // instrument === 'kick'
          //   ? triggerKick(this.audioContext, deadline, gainValue, this.analyser)
          //   : this.triggerSound(
          //       this.audioContext,
          //       deadline,
          //       this[buffer],
          //       gainValue,
          //       instrument
          //     );
        }
      }
    });

    setCurrentStep(newCurrentStep);
  }

  setupSound = (bufferType, gainValue, effects, delay, feedback) => {
    // creation of nodes
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.source = this.audioContext.createBufferSource();
    this.biquadFilter = this.audioContext.createBiquadFilter();
    this.delay = this.audioContext.createDelay(10);
    this.gain = this.audioContext.createGain();
    this.feedback = this.audioContext.createGain();

    this.gain.gain.value = gainValue;
    this.feedback.value =
      feedback.currentLevel > 0 ? feedback.currentLevel / 5 : 0;
    // setting the source with the current instrument
    this.source.buffer = bufferType;

    // delay node
    // this.delay.delayTime.value = 0.5;
    let delayValue = 0;
    if (delay.currentLevel > 0) {
      delayValue = 1 / delay.currentLevel;
    }
    if (!delay.active) {
      delayValue = 0;
    }
    // this.delay.delayTime.value = delay.currentLevel / 10;
    this.delay.delayTime.setValueAtTime(
      delayValue,
      this.audioContext.currentTime
    );

    // this.source.connect(this.biquadFilter);

    //delay
    // this.delay.connect(this.audioContext.destination)

    // filter node
    this.biquadFilter.type = 'highpass';
    this.biquadFilter.Q.value = 5;
    let filterValue = effects.currentLevel * 100;
    if (!effects.active) {
      filterValue = 0;
    }
    this.biquadFilter.frequency.setValueAtTime(
      filterValue,
      this.audioContext.currentTime
    );

    // this.source.connect(this.delay);
    this.source.connect(this.gain);
    this.gain.connect(this.biquadFilter);
    this.gain.connect(this.analyser);
    this.biquadFilter.connect(this.compressor);
    this.compressor.connect(this.audioContext.destination);

    // this.delay.connect(this.feedback);
    // this.feedback.connect(this.biquadFilter);
    // this.feedback.connect(this.analyser);
    // this.biquadFilter.connect(this.compressor);
    // this.compressor.connect(this.audioContext.destination);
    // this.analyser.connect(this.delay)
    // this.delay.connect(this.biquadFilter)
    // this.biquadFilter.connect(this.gain)
    // this.gain.connect(this.analyser);
    // this.gain.connect(this.compressor);
    // this.gain.connect(this.biquadFilter)
    // this.compressor.connect(this.audioContext.destination);
  };

  triggerSound = (
    context,
    deadline,
    bufferType,
    gainValue,
    instrument,
    effects,
    delay,
    feedback
  ) => {
    this.setupSound(bufferType, gainValue, effects, delay, feedback);
    if (instrument === 'ride') {
      this.gain.gain.exponentialRampToValueAtTime(0.01, deadline + 0.5);
    }
    this.source.start(deadline);
  };

  canvasRef = canvas => {
    this.canvas = canvas;
    this.myCanvas = this.canvas.getContext('2d');
  };

  draw = () => {
    this.animationFrame = requestAnimationFrame(this.draw);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.myCanvas.fillStyle = '#333333';
    // method to fill the rectangle.
    this.myCanvas.fillRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
    this.myCanvas.lineWidth = 2;
    this.myCanvas.strokeStyle = 'rgb(40, 95, 95)';

    this.myCanvas.beginPath();
    var sliceWidth = (this.canvas.offsetWidth * 1.0) / this.bufferLength;
    var x = 0;

    for (var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = (v * this.canvas.offsetHeight) / 2;
      if (i === 0) {
        this.myCanvas.moveTo(x, y);
      } else {
        this.myCanvas.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.myCanvas.lineTo(this.canvas.offsetWidth, this.canvas.offsetHeight / 2);
    this.myCanvas.stroke();
  };

  render() {
    const { classes } = this.props;
    return <canvas ref={this.canvasRef} className={classes.canvas} />;
  }
}

const ConnectedDrummachine = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Drummachine));

export default () => (
  <AudioCtxContext.Consumer>
    {childProps => <ConnectedDrummachine {...childProps} />}
  </AudioCtxContext.Consumer>
);
