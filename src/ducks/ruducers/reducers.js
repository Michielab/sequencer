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
  HANDLE_VALUE_EFFECT_CHANGE
} from '~/ducks/actions/actions';
import { combineReducers } from 'redux';

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
      return {
        ...state,
        beatSteps: action.payload.newSteps
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
    default:
      return state;
  }
};

export default combineReducers({
  drummachine
});
