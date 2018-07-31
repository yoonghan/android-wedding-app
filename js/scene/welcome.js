'use strict';

import React, {Component} from 'react';

import {
  Image,
  Linking,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';
import WeddingInfo from '../stores/weddinginfo';
import { Card, Button, Icon, COLOR, TYPO, THEME_NAME } from 'react-native-material-design';

class WelcomeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      triggerDate:new moment(WeddingInfo.wedding.date, "YYYYMMDD"),
      todayDate:new moment({hour: 0, minute: 0, seconds: 0, miliseconds: 0}),
      time: WeddingInfo.wedding.time,
      phone: WeddingInfo.wedding.contactNo,
      containerStyle: this.createDynamicStyle()
    }
  }

  createDynamicStyle = () => {
    const {fontSize} = this.props.textState;
    return StyleSheet.create({
      signature: {
        fontSize: fontSize,
        textAlign: 'right',
        marginTop: 10
      },
      mediaCardText: {
        fontSize: fontSize,
        marginTop: 20
      }
    });
  }

  render() {
    const { translate } = this.props.state;
    const containerStyle = this.state.containerStyle;

    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.container}
        >
          <Card>
            <Card.Media
                image={<Image source={require('../../img/login_main.jpg')}/>}
                overlay
            >
              <Text style={[TYPO.paperFontHeadline, COLOR.paperGrey50, styles.shadow]}><Icon name="event" size={18} color="#FFFFFF"/> {translate['welcome.event']}</Text>
              <View style={styles.titleNoteTable}>
                <Text style={[TYPO.paperSubhead, COLOR.paperGrey50, styles.shadow]}>
                  <Text style={styles.titleNote}>{translate['welcome.date']}: </Text>{this.state.triggerDate.format("Do MMMM YYYY (dddd)")}
                </Text>
                <Text style={[TYPO.paperSubhead, COLOR.paperGrey50, styles.shadow]}>
                  <Text style={styles.titleNote}>{translate['welcome.time']}: </Text>{this.state.time}/

                { this.state.triggerDate.diff(this.state.todayDate, 'days') > 0 &&
                  <Text style={styles.comingIndication}>{translate['welcome.occur']} {this.state.triggerDate.from(this.state.todayDate)}</Text>
                }
                { this.state.triggerDate.diff(this.state.todayDate, 'days') === 0 &&
                  <Text style={styles.todayIndication}>{translate['welcome.today']}</Text>
                }
                </Text>
              </View>
            </Card.Media>
          </Card>
          <View style={styles.forwardContainer}>
            <Text style={[TYPO.paperFontHeadline, styles.mediaCardTitle]}>
              {translate['welcome.forewards']} <Icon name="favorite" size={20} color="#E91E63"/>
            </Text>
            <Text style={containerStyle.mediaCardText}>
              {translate['welcome.forewards.paragraph1']}
            </Text>
            <Text style={containerStyle.mediaCardText}>
              {translate['welcome.forewards.paragraph2']}
            </Text>
            <Text  style={containerStyle.mediaCardText}>
              {translate['welcome.forewards.paragraph3']}
            </Text>
            <Text style={containerStyle.signature}>
              {translate['welcome.forewards.signature']}
            </Text>
            <TouchableHighlight onPress={() => Linking.openURL(this.state.phone)}>
              <Text style={styles.phoneContact}>
                  {'[ '+this.state.phone+' ]'}
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  forwardContainer: {
    padding: 30,
    paddingTop: 20
  },
  titleNote: {
    fontWeight: 'bold',
    paddingLeft: 20
  },
  titleNoteTable: {
    paddingLeft: 20,
    paddingTop: 10
  },
  phoneContact: {
    textAlign: 'right',
    color: '#E91E63'
  },
  mediaCardTitle: {
    color: '#C2185B',
    textAlign: 'center'
  },
  todayIndication: {
    fontWeight: 'bold',
    color: '#E3F2FD',
    fontSize: 16,
    marginTop: 10
  },
  comingIndication: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
  },
  shadow: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  }
});

export default connect(state => ({
  state: state.translate,
  textState: state.textSize
  })
)(WelcomeView);
