'use strict';

import React, {Component, PropTypes} from 'react';
var ReactNative = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} = ReactNative;

export default class VenueMapView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Image style={styles.container} source={require('../../img/map.png')}>
        </Image>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null
  }
});
