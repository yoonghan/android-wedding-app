'use strict';

import React, {Component, PropTypes} from 'react';

import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';

import moment from 'moment';
import WeddingInfo from '../stores/weddinginfo';
import { connect } from 'react-redux';
import { Button, THEME_NAME } from 'react-native-material-design';

class VenueView extends Component {
  static contextTypes = {
      navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      eventDate: new moment(WeddingInfo.wedding.date, "YYYYMMDD").format("Do MMMM YYYY")
    }
  }

  translate = (word) => {
    const {locale} = this.props.state;
    const wordObj = WeddingInfo.wedding.restaurant;
    if(locale === 'zh' && wordObj[word+'_zh']) {
      return wordObj[word + '_zh'];
    }
    return wordObj[word];
  }

  _navOut = () => {
    const { navigator } = this.context;
    navigator.to('venue.venueMap');
  }

  createDynamicStyle = () => {
    const {fontSize} = this.props.textState;
    return StyleSheet.create({
      label: {
        flex: 1,
        fontSize: fontSize,
        fontWeight: 'bold'
      },
      text: {
        flex: 2,
        fontSize: fontSize,
        textAlign: 'left'
      },
      addressText: {
        fontSize: fontSize
      }
    });
  }

  render() {
    const weddinginfo = WeddingInfo.wedding;
    const {translate} = this.props.state;
    const containerStyle = this.createDynamicStyle();

    return(
      <Image source={require('../../img/venuebg.jpg')}  style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={containerStyle.label}>{translate['venue.in']}</Text>
            <Text style={styles.title}> {this.translate('name')}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.labelTextContainer}>
                <Text style={containerStyle.label}>{translate['venue.location']}:</Text>
                <Text style={containerStyle.text}>{this.translate('location')}</Text>
            </View>
            <View style={styles.labelTextContainer}>
                <Text style={containerStyle.label}>{translate['venue.date']}:</Text>
                <Text style={containerStyle.text}>{this.state.eventDate}</Text>
            </View>
            <View style={styles.labelTextContainer}>
                <Text style={containerStyle.label}>{translate['venue.time']}:</Text>
                <Text style={containerStyle.text}>{weddinginfo.time}</Text>
            </View>
            <View>
              <Text style={containerStyle.label}>{translate['venue.address']}:</Text>
              <Text style={containerStyle.addressText}>{weddinginfo.restaurant.address.address1}</Text>
              <Text style={containerStyle.addressText}>{weddinginfo.restaurant.address.street}</Text>
              <Text style={containerStyle.addressText}>{weddinginfo.restaurant.address.city}</Text>
              <Text style={containerStyle.addressText}>{weddinginfo.restaurant.address.postcode} {weddinginfo.restaurant.address.state}</Text>
            </View>
          </View>
          <View  style={styles.buttonContainer}>
            <Button theme={THEME_NAME[1]} text={translate['venue.map.location']} value="Map" raised={true} onPress={this._navOut} primary = {'paperPink'}/>
            <Button text={translate['venue.map.direction']} value="Navigate" raised={true}
                onPress={() => Linking.openURL("google.navigation:q=" + weddinginfo.restaurant.latitude + "," + weddinginfo.restaurant.longitude + "&m=d")} primary = {'paperPink'}/>
          </View>
        </View>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems:'stretch',
    height: null,
    width: null,
    padding: 30
  },
  venueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  infoContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C2185B',
    marginBottom: 10,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 6,
    textShadowColor: '#F8F8F8'
  },
  labelTextContainer: {
    flex: 3,
    flexDirection: 'row',
  }
});

export default connect(state => ({
  state: state.translate,
  textState: state.textSize
  })
)(VenueView);
