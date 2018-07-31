'use strict'

import { NativeModules } from 'react-native';
let { RNPermissionRequest } = NativeModules;

export function requestPermission(perm) {
  return RNPermissionRequest.requestPermission(perm);
}
