import {SET_LOCALE, SET_TEXTSIZE, SET_FIRSTLOAD, LOCALES} from './storeTypes';

function getLanguage(locale) {
  if(LOCALES.hasOwnProperty(locale)) {
    return locale;
  }
  else {
    return Object.keys(LOCALES)[0];
  }
}

export function setLanguage(locale) {
  return {
    type: SET_LOCALE,
    locale: getLanguage(locale)
  };
}

export function setTextSize(textSize) {
  return {
    type: SET_TEXTSIZE,
    textSize: textSize
  };
}

export function removeFirstLoad() {
  return {
    type: SET_FIRSTLOAD
  };
}
