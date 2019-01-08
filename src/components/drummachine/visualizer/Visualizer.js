import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Visualizer extends Component {
  points = [];
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;

    /*an unsigned long value half that of the FFT size. This generally equates to 
the number of data values you will have to play with for the visualization*/

    this.dataArray = new Uint8Array(this.bufferLength);

    // method to create rectangle.
    // this.myCanvas.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    this.playSound();
    this.draw();
    console.log(this.canvas.offsetWidth)
    // requestAnimationFrame(() => this.draw());
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  canvasRef = canvas => {
    this.canvas = canvas;
    this.myCanvas = this.canvas.getContext('2d');
  };

  playSound = () => {
    var osc = this.audioContext.createOscillator();
    osc.frequency.setValueAtTime(200, 0.3);

    // osc.frequency.value = 60;
    osc.type = 'sine';

    let oscGain = this.audioContext.createGain();
    oscGain.gain.value = 0.5;

    osc.start(0.3);
    // osc.stop(this.audioContext.currentTime + 3);
    osc.connect(oscGain);
    oscGain.gain.setValueAtTime(1, 0.3);
    osc.frequency.exponentialRampToValueAtTime(50,  0.3 + 0.15);
    oscGain.gain.exponentialRampToValueAtTime(0.01,  0.3 + 0.5);
    this.timeOut = setTimeout(() => window.cancelAnimationFrame(this.animationFrame), 450);

    oscGain.connect(this.analyser); /*Connect oscillator to analyser node*/
    this.analyser.connect(this.audioContext.destination);
  };

  draw = () => {
    this.animationFrame = requestAnimationFrame(this.draw);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.myCanvas.fillStyle = '#000000';
    // method to fill the rectangle.
    this.myCanvas.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
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
        // this.points.push({x,y})
        // console.log('points', x,y)

      }

      x += sliceWidth;
    }

    this.myCanvas.lineTo(this.canvas.offsetWidth, this.canvas.offsetHeight / 2);
    this.myCanvas.stroke();
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className="visualizer"
        style={{
          gridArea: '1 / 7 / 3 / 13',
          width: '100%',
          backgroundColor: '#212121',
          marginBottom: '10px',
          height: '150px',
          // display: 'none'
        }}
      />
    );
  }
}

Visualizer.propTypes = {};

export default Visualizer;
