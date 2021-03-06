export const SET_AUDIO_CONTEXT = 'SET_AUDIO_CONTEXT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const HANDLE_BPM_CHANGE = 'HANDLE_BPM_CHANGE';
export const HANDLE_CLEAR_ALL = 'HANDLE_CLEAR_ALL';
export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
export const SELECT_PART = 'SELECT_PART';
export const AMPLITUDE_CHANGE = 'AMPLITUDE_CHANGE';
export const MUTE_INSTRUMENT = 'MUTE_INSTRUMENT';
export const HANDLE_SOLO_TOGGLE = 'HANDLE_SOLO_TOGGLE';
export const HANDLE_SWING_CHANGE = 'HANDLE_SWING_CHANGE';
export const HANDLE_COPY_PART = 'HANDLE_COPY_PART';
export const HANDLE_EFFECT_CHANGE = 'HANDLE_EFFECT_CHANGE';
export const HANDLE_VALUE_EFFECT_CHANGE = 'HANDLE_VALUE_EFFECT_CHANGE';
export const HANDLE_DELAY_CHANGE = 'HANDLE_DELAY_CHANGE';
export const HANDLE_FEEDBACK_CHANGE = 'HANDLE_FEEDBACK_CHANGE';
export const HANDLE_INSTRUMENT_CHANGE = 'HANDLE_INSTRUMENT_CHANGE';
export const HANDLE_STEPS_CHANGE = 'HANDLE_STEPS_CHANGE';

export const setCurrentStep = currentStep => ({
  type: 'SET_CURRENT_STEP',
  payload: {
    currentStep
  }
});

export const toggleStep = (instrumentName, index, volume, steps) => ({
  type: 'TOGGLE_STEP',
  payload: {
    instrumentName,
    index,
    volume,
    steps
  }
});

export const togglePlay = () => ({
  type: 'TOGGLE_PLAY'
});

export const handleBPMChange = bpm => ({
  type: 'HANDLE_BPM_CHANGE',
  payload: {
    bpm: parseInt(bpm.target.value)
  }
});

export const handleClearAll = beatSteps => ({
  type: 'HANDLE_CLEAR_ALL',
  payload: {
    beatSteps
  }
});

export const selectPart = (part, selectedParts) => ({
  type: 'SELECT_PART',
  payload: {
    activePart: part,
    selectedParts: selectedParts
  }
});

export const handleAmplitudeChange = (instrument, amplitude) => ({
  type: 'AMPLITUDE_CHANGE',
  payload: {
    instrument,
    amplitude
  }
});

export const toggleMute = instrument => ({
  type: 'MUTE_INSTRUMENT',
  payload: {
    instrument
  }
});

export const handleSoloToggle = selectedSoloInstuments => ({
  type: 'HANDLE_SOLO_TOGGLE',
  payload: {
    selectedSoloInstuments
  }
});

export const handleSwing = swing => ({
  type: 'HANDLE_SWING_CHANGE',
  payload: {
    swing
  }
});

export const handleCopyPart = (part, currentPart) => ({
  type: 'HANDLE_COPY_PART',
  payload: {
    part,
    currentPart
  }
});

export const handleEffectChange = effect => ({
  type: 'HANDLE_EFFECT_CHANGE',
  payload: {
    effect
  }
});

export const handleValueEffectChange = effectValue => ({
  type: 'HANDLE_VALUE_EFFECT_CHANGE',
  payload: {
    effectValue
  }
});

export const handleDelayChange = effectValue => ({
  type: 'HANDLE_DELAY_CHANGE',
  payload: {
    effectValue
  }
});

export const handleFeedbackChange = effectValue => ({
  type: 'HANDLE_FEEDBACK_CHANGE',
  payload: {
    effectValue
  }
});

export const handleInstrumentChange = (prevInstrument, instrumentName) => ({
  type: 'HANDLE_INSTRUMENT_CHANGE',
  payload: {
    prevInstrument,
    instrumentName
  }
});

export const handleStepsChange = (index, instrumentName) => ({
  type: 'HANDLE_STEPS_CHANGE',
  payload: {
    index,
    instrumentName
  }
});