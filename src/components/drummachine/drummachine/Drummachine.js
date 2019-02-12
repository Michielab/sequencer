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
    sampleLoader('./hihat.wav', this.audioContext, buffer => {
      this.highHatBuffer = buffer;
    });
    sampleLoader('./clap.wav', this.audioContext, buffer => {
      this.clapBuffer = buffer;
    });
    sampleLoader('./mt01.wav', this.audioContext, buffer => {
      this.mtBuffer = buffer;
    });
    sampleLoader('./sd03.wav', this.audioContext, buffer => {
      this.snareBuffer = buffer;
    });
    sampleLoader('./cr02.wav', this.audioContext, buffer => {
      this.crashBuffer = buffer;
    });

    sampleLoader('./cym.wav', this.audioContext, buffer => {
      this.rideBuffer = buffer;
    });

    sampleLoader('./bd09.wav', this.audioContext, buffer => {
      console.log('bufferk', buffer)

      this.kickBuffer = buffer;
    });

    sampleLoader('./oh01.wav', this.audioContext, buffer => {
      this.ohBuffer = buffer;
    });
    sampleLoader('./ht01.wav', this.audioContext, buffer => {
      this.htBuffer = buffer;
    });
    sampleLoader('./lt01.wav', this.audioContext, buffer => {
      console.log('buffer', buffer)
      this.ltBuffer = buffer;
    });
    this.draw();
    console.log('mount')
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
    } = this.props;
    console.log(this.props);
    let newDeadLine = deadline;
    const newCurrentStep = currentStep + 1;
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

    Object.keys(beats).map((instrument, index) => {
      if (beats[instrument][newCurrentStep % steps.length]) {
        if (beats[instrument][newCurrentStep % steps.length].step) {
          const buffer = instrument + 'Buffer';

          const amplitudeValue = amplitude.hasOwnProperty(instrument)
            ? ((amplitude[instrument] / 100) *
                beats[instrument][newCurrentStep % steps.length].amplitude) /
              100
            : beats[instrument][newCurrentStep % steps.length].amplitude / 100;

          let gainValue = amplitude.hasOwnProperty(instrument + 'Mute')
            ? amplitude[instrument + 'Mute']
              ? 0
              : amplitudeValue
            : amplitudeValue;

          if (swing > 0 && newCurrentStep % 2 === 1) {
            newDeadLine =
              newDeadLine + (this.covertBMPtoSeconds(bpm) / 100) * swing;
          }
          console.log(buffer)
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
    this.feedback.value = feedback.currentLevel > 0 ?  feedback.currentLevel / 5 : 0;
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
    console.log(feedback);
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
