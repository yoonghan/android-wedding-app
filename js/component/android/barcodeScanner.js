'use strict'

import { NativeModules } from 'react-native';
let { RNBarcodeIntent } = NativeModules;

export function startBarcodeScanner() {
  let requestCode = 101;
  return RNBarcodeIntent.startActivityForResult(requestCode)
  .then(function(result) {
    if(result.requestCode == requestCode) {
      return result;
    }
    result.resultCode = 0;
    return result;
  });
}
