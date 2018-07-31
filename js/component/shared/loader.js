'use strict'

import React, {Component, PropTypes} from 'react';

import {
  StyleSheet,
  Text,
  View
}
from 'react-native';

import Spinner from 'react-native-spinkit';

export default class LoadingMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'CubeGrid',
      color: '#E91E63'
    }
  }

  render() {
    const { type, color } = this.state;
    const { message } = this.props;

    return(
      <View style={styles.connectionContainer}>
          <Spinner style={styles.spinner} isVisible={true} size={100} type={type} color={color}/>
          <Text style={styles.connectionText}>{message + '...'}</Text>
      </View>
    );
  }
};

LoadingMessage.propTypes = {
  message: PropTypes.string.isRequired
}

var styles = StyleSheet.create({
  connectionContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    paddingTop: 50
  },
  connectionText: {
    color: '#2196F3',
    fontSize: 24,
    marginTop: 20
  },
  spinner: {
    marginTop: 50
  }
})
