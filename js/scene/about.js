'use strict';

import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View
}
from 'react-native';

import { connect } from 'react-redux';
import {getVersion} from '../component/android/systemproperties';

class AboutView extends Component {
  constructor(props) {
    super(props);
  }

  createDynamicStyle = () => {
    const {fontSize} = this.props.textState;
    return StyleSheet.create({
      title: {
        fontSize: (fontSize + 6),
        fontWeight: 'bold',
        marginBottom: 10
      },
      version: {
        fontSize: (fontSize - 2)
      },
      release: {
        fontSize: fontSize,
        marginTop: 20,
        textAlign: 'justify'
      }
    });
  }

  render() {
    const containerStyle = this.createDynamicStyle();
    return(
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../img/app_logo.png')} style={styles.logo}/>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={containerStyle.title}>Wedding Planner</Text>
          <Text style={containerStyle.version}>Release: {getVersion()}</Text>
          <Text style={containerStyle.release}>Created under Walcron Coorperation</Text>
          <Text style={{fontWeight: 'bold'}}> Yoong Han &amp; Tai Lee Wan.</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  logoContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  logo: {
    height: 120,
    width: 120,
  },
  aboutContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40
  }
});

export default connect(state => ({
  textState: state.textSize
  })
)(AboutView);
