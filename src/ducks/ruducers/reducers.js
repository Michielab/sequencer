import {
  SET_AUDIO_CONTEXT,
  TOGGLE_STEP,
  TOGGLE_PLAY,
  HANDLE_BPM_CHANGE,
  HANDLE_CLEAR_ALL,
  SET_CURRENT_STEP,
  SELECT_PART,
  AMPLITUDE_CHANGE,
  MUTE_INSTRUMENT,
  HANDLE_SOLO_TOGGLE,
  HANDLE_SWING_CHANGE,
  HANDLE_COPY_PART,
  HANDLE_EFFECT_CHANGE,
  HANDLE_VALUE_EFFECT_CHANGE,
  HANDLE_DELAY_CHANGE,
  HANDLE_FEEDBACK_CHANGE,
  HANDLE_INSTRUMENT_CHANGE
} from '~/ducks/actions/actions';
import { combineReducers } from 'redux';

const updateInstrumentRow = (beatSteps, prevInstrument, instrumentName) => {
  let newInstrumentRow = { ...beatSteps };

  // eslint-disable-next-line array-callback-return
  Object.keys(newInstrumentRow).map(part => {
    // eslint-disable-next-line array-callback-return
    Object.keys(newInstrumentRow[part]).map(instrument => {
      if (prevInstrument === instrument) {
        delete Object.assign(newInstrumentRow[part], {
          [instrumentName]: newInstrumentRow[part][prevInstrument]
        })[prevInstrument];
      }
    });
  });
  return newInstrumentRow;
};

const toggleStep = (
  instrumentName,
  index,
  volume,
  steps,
  beatSteps,
  activePart,
  parts,
  part
) => {

  if (
    (!beatSteps[parts[0]].hasOwnProperty(instrumentName) && activePart === 1) ||
    (!beatSteps[parts[0]].hasOwnProperty(instrumentName) && activePart === 2) ||
    (!beatSteps[parts[0]].hasOwnProperty(instrumentName) && activePart === 3)
  ) {
    beatSteps[parts[0]][instrumentName] = beatSteps[parts[0]].steps;
  }

  if (
    (!beatSteps[parts[1]].hasOwnProperty(instrumentName) && activePart === 3) ||
    (!beatSteps[parts[1]].hasOwnProperty(instrumentName) && activePart === 2)
  ) {
    beatSteps[parts[1]][instrumentName] = beatSteps[parts[1]].steps;
  }

  if (!beatSteps[parts[2]].hasOwnProperty(instrumentName) && activePart === 3) {
    beatSteps[parts[2]][instrumentName] = beatSteps[parts[2]].steps;
  }

  const stepValue =
    steps[index].step === 1 ? (steps[index].amplitude !== volume ? 1 : 0) : 1;

  beatSteps[part][instrumentName] = steps;
  beatSteps[part][instrumentName][index] = {
    step: stepValue,
    amplitude: volume
  };
  return beatSteps
};

const audioContextDefaultState = {
  drummachine: {
    playing: false,
    bpm: 130,
    currentStep: 0,
    swing: 0
  },
  beatSteps: {
    steps: [
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
    ],
    partOne: {
      steps: [
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
      ]
    },
    partTwo: {
      steps: [
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
      ]
    },
    partThree: {
      steps: [
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
      ]
    },
    partFour: {
      steps: [
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
      ]
    }
  },
  amplitude: {
    mainGain: 50
  },
  parts: ['partOne', 'partTwo', 'partThree', 'partFour'],
  effects: {
    active: true,
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentLevel: 0
  },
  delay: {
    active: true,
    currentLevel: 0
  },
  feedback: {
    active: true,
    currentLevel: 0
  },
  activePart: 0,
  selectedParts: ['partOne'],
  soloInstruments: []
};

const drummachine = (state = audioContextDefaultState, action) => {
  switch (action.type) {
    case SET_AUDIO_CONTEXT:
      return {
        ...state,
        audioContext: action.payload.audioContext
      };
    case TOGGLE_STEP:
      const part =  'partOne'
      const newSteps = toggleStep(
        action.payload.instrumentName,
        action.payload.index,
        action.payload.volume,
        action.payload.steps,
        state.beatSteps,
        state.activePart,
        state.parts,
        part
      );
      return {
        ...state,
        beatSteps: newSteps
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          playing: !state.drummachine.playing
        }
      };
    case HANDLE_BPM_CHANGE:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          bpm: action.payload.bpm
        }
      };
    case HANDLE_CLEAR_ALL:
      return {
        ...state,
        beatSteps: {
          ...action.payload.beatSteps
        }
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          currentStep: action.payload.currentStep
        }
      };
    case SELECT_PART:
      return {
        ...state,
        activePart: action.payload.activePart,
        selectedParts: [...action.payload.selectedParts]
      };
    case AMPLITUDE_CHANGE:
      return {
        ...state,
        amplitude: {
          ...state.amplitude,
          [action.payload.instrument]: action.payload.amplitude
        }
      };
    case MUTE_INSTRUMENT:
      let mute = state.amplitude[action.payload.instrument + 'Mute']
        ? false
        : true;
      return {
        ...state,
        amplitude: {
          ...state.amplitude,
          [action.payload.instrument + 'Mute']: mute
        }
      };
    case HANDLE_SOLO_TOGGLE:
      return {
        ...state,
        soloInstruments: [...action.payload.selectedSoloInstuments]
      };
    case HANDLE_SWING_CHANGE:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          swing: action.payload.swing
        }
      };
    case HANDLE_COPY_PART:
      return {
        ...state,
        beatSteps: {
          ...state.beatSteps,
          [action.payload.currentPart]: { ...action.payload.part }
        }
      };
    case HANDLE_EFFECT_CHANGE:
      return {
        ...state,
        effects: {
          ...state.effects,
          active: action.payload.effect
        }
      };
    case HANDLE_VALUE_EFFECT_CHANGE:
      return {
        ...state,
        effects: {
          ...state.effects,
          currentLevel: action.payload.effectValue
        }
      };
    case HANDLE_DELAY_CHANGE:
      return {
        ...state,
        delay: {
          ...state.effects,
          currentLevel: action.payload.effectValue
        }
      };
    case HANDLE_FEEDBACK_CHANGE:
      return {
        ...state,
        feedback: {
          ...state.effects,
          currentLevel: action.payload.effectValue
        }
      };
    case HANDLE_INSTRUMENT_CHANGE: {
      const newBeatsteps = updateInstrumentRow(
        state.beatSteps,
        action.payload.prevInstrument,
        action.payload.instrumentName
      );
      return {
        ...state,
        beatSteps: newBeatsteps
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  drummachine
});
