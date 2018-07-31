import * as types from '../action/storeTypes';
import {i18n} from '../stores/i18n';

const initialLanguageState = {
  locale: Object.keys(types.LOCALES)[0],
  translate: i18n[Object.keys(types.LOCALES)[0]]
};

const initialTextSize = {
  textSize: Object.keys(types.TEXTSIZES)[0],
  fontSize: types.TEXTSIZES[Object.keys(types.TEXTSIZES)[0]]
};

const initialGalleryState = {
  galleries: {}
};

const initialFirstLoad = {
  firstLoad: true
};

export function firstLoad(state = initialFirstLoad, action = {}) {
  switch (action.type) {
    case types.SET_FIRSTLOAD:
      return {
        ...state,
        firstLoad: false
      };
    default:
      return state;
  }
};

export function translate(state = initialLanguageState, action = {}) {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
        translate: i18n[action.locale]
      };
    default:
      return state;
  }
};

export function textSize(state = initialTextSize, action = {}) {
  switch (action.type) {
    case types.SET_TEXTSIZE:
      return {
        ...state,
        textSize: action.textSize,
        fontSize: types.TEXTSIZES[action.textSize]
      };
    default:
      return state;
  }
}
