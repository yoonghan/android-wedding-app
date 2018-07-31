'use strict'

import { NativeModules} from 'react-native'
let { RNSystemProperties } = NativeModules

export function getLocaleLang() {
  return RNSystemProperties["locale_language"];
}

export function getVersion() {
  return RNSystemProperties["version"];
}
