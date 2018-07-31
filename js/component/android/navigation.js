/**
 * Controls Drawer and Back button
 */
import React, {Component, PropTypes} from 'react';

import {
  BackAndroid,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  Avatar,
  Drawer,
  Divider,
  Icon,
  COLOR,
  TYPO
} from 'react-native-material-design';

import { connect } from 'react-redux';

class Navigation extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
        route: null
    }
    BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress);
  }

  changeScene = (path, name) => {
    const { drawer, navigator } = this.context;

    this.setState({
        route: path
    });
    navigator.to(path, name);
    drawer.closeDrawer();
  };

  _hardwareBackPress = () => {
    const { drawer, navigator } = this.context;
		if (navigator.isMain()) {
			BackAndroid.exitApp();
			return false;
		} else {
      drawer.closeDrawer();
			navigator.back();
			return true;
		}
	};

  render() {
    const { route } = this.state;
    const { translate } = this.props.state;
    return (
      <Drawer theme='light' primary={'paperPink'}>
        <Drawer.Header image={<Image source={require('../../../img/drawer_main.jpg')} resizeMode={Image.resizeMode.stretch}/>}>
          <View style={styles.header}>
            <Text style={[styles.text, COLOR.paperPink400, TYPO.paperFontSubhead]}>{translate['Signature.groom']} <Icon name="favorite" size={20} color="#E91E63"/> {translate['Signature.bride']}</Text>
          </View>
        </Drawer.Header>

        <Drawer.Section
          items={[{
            icon: 'home',
            value: translate['Welcome'],
            active: !route || route === 'welcome',
            onPress: () => this.changeScene('welcome'),
            onLongPress: () => this.changeScene('welcome')
          },
          {
            icon: 'collections',
            value: translate['Gallery'],
            active: route === 'gallery',
            onPress: () => this.changeScene('gallery'),
            onLongPress: () => this.changeScene('gallery')
          },
          {
            icon: 'drive-eta',
            value: translate['Venue'],
            active: route === 'venue',
            onPress: () => this.changeScene('venue'),
            onLongPress: () => this.changeScene('venue')
          },
          {
            icon: 'assignment',
            value: translate['Arrangements'],
            active: route === 'arrangements',
            onPress: () => this.changeScene('arrangements'),
            onLongPress: () => this.changeScene('arrangements')
          }]}
        />
        <Divider style={{ marginTop: 25}} />
        <Drawer.Section
          title={translate['Extras']}
          items={[{
              icon: 'settings',
              value: translate['Settings'],
              active: route === 'setting',
              onPress: () => this.changeScene('setting'),
              onLongPress: () => this.changeScene('setting')
          },
          {
              icon: 'face',
              value: translate['About Us'],
              active: route === 'about',
              onPress: () => this.changeScene('about'),
              onLongPress: () => this.changeScene('about')
          }]}
        />
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 80
  },
  text: {
    marginTop: 30,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 6,
    textShadowColor: '#888888'
  }
});

export default connect(state => ({
  state: state.translate
  })
)(Navigation);
