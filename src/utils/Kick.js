export const triggerKick = (context, deadline, gainMax, analyser) => {
  /* 
    Create Oscillator is a method the audio context. 
    A Oscillator is a switch that creates periodic waves. 
    */
  const oscillator = context.createOscillator();
  oscillator.frequency.setValueAtTime(200, deadline);
  
  oscillator.start(deadline);
  /* 
    Create gain is a way to create a gain node, which in return allows us 
    to control the amplitude of our oscillator over time. Amplitude is the 
    maximum displacement of points on a wave, which you can think of as the 
    degree of intensity of change. The maximum displacement is mesured from 
    the equilibrium position. Wavelength is the distance between two 
    successive like points on a wave.   
    */
  const amplifier = context.createGain();

  /* 
    Connect our oscillator to the gain node we created
    */
  oscillator.connect(amplifier);
  /* 
    SetvalueAtTime is used to set the value of the gain at a certain moment.
    The first parameter is the value you want to set and the second parameter is the time 
    on which you want te set the parameter.
    */
  amplifier.gain.setValueAtTime(gainMax * 2, deadline);
  oscillator.frequency.exponentialRampToValueAtTime(50, deadline + 0.15);

  /* 
   There are several Web Audio functions that can gradually change an audioParam:

   linearRampToValueAtTime(value, endTime); // linear
    exponentialRampToValueAtTime(value, endTime); // exponential
     setTargetAtTime(target, startTime, timeConstant); // exponential
    
     exponentialRampToValueAtTime which decreases the gain to close to zero over the next 0.5 seconds.

    //gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    linearRampToValueAtTime schedules a grudual linear change. 
    One difference between them is the easing function that is used to change the audio param value; either linear (left) or exponential (right). 
   Mozilla has a piece of advise to those unsure of which one to use:

Exponential ramps are considered more useful when changing frequencies or playback rates than linear ramps because of the way the human ear works.
    */
  // amplifier.gain.exponentialRampToValueAtTime(0.001, deadline + 0.02);
  amplifier.gain.exponentialRampToValueAtTime(0.01, deadline + 0.5);
  amplifier.connect(analyser)
  /*  The last step is to connect the amplifier to the contect desitation aka sound device */
  analyser.connect(context.destination);

};

export const sampleLoader = (url, context, callback) => {
  var request = new XMLHttpRequest();
  request.open('get', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      callback(buffer);
    });
  };
  request.send();
};
