'use strict';

import React, {Component, PropTypes} from 'react';

import {
  AsyncStorage,
  DrawerLayoutAndroid,
  Image,
  Modal,
  Navigator,
  StyleSheet,
  Text,
  ToolbarAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native' ;

import {connect} from 'react-redux';
import Navigate from '../util/navigate';
import GalleryLoader from '../util/galleryloader';
import Toolbar from '../component/android/toolbar';
import Navigation from '../component/android/navigation';
import {ASYNC_KEYS} from '../action/storeTypes';
import {Button, Icon, TYPO, THEME_NAME} from 'react-native-material-design';

class MainApp extends Component {

  static childContextTypes = {
		drawer: PropTypes.object,
		navigator: PropTypes.object,
    galleryloader: PropTypes.object
	};

  constructor(props) {
    super(props);
    this.state = {
			drawer: null,
  		navigator: null,
      galleryloader: new GalleryLoader()
		};
  };

  getChildContext = () => {
		return {
			drawer: this.state.drawer,
			navigator: this.state.navigator,
      galleryloader: this.state.galleryloader
		}
	};

  setDrawer = (drawer) => {
		this.setState({
			drawer
		});
	};

  setNavigator = (navigator) => {
    this.setState({
      navigator: new Navigate(navigator)
    });
  };

  navRenderScreen = (route) => {
    return (
      <View
          style={styles.scene}
          showsVerticalScrollIndicator={false}>
      </View>
    );
  };

  render() {
    const {drawer, navigator} = this.state;
    const { translate } = this.props.state;
    const { firstLoad } = this.props.firstLoad;
    const navView = <Navigation/>;
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          if(drawer && navigator) {
            return navView;
          }
          return null;
        }}
        ref={(drawer) => {!this.state.drawer ? this.setDrawer(drawer) : null }}
        >
        {firstLoad &&
          <ModalRender
            drawer={drawer}
            translate={translate}
          />
        }
        {drawer &&
          <Navigator
            initialRoute={Navigate.getInitialRoute()}
            navigationBar={<Toolbar onIconPress={drawer.openDrawer} />}
            ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
            renderScene={(route) => {
                            return (
                                <View
                                    style={styles.scene}
                                    showsVerticalScrollIndicator={false}>
                                	<route.component title={route.title} path={route.path} {...route.props} />
                                </View>
                            );
                    }}/>
        }
      </DrawerLayoutAndroid>
    )
  }
};

class ModalRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
		};
  }

  _closeMessageDialog = () => {
    this.setState({
      showModal: false
    });
    this.setFirstLoad().done();
  };

  _closeMessageDialogOpenDrawer = () => {
    const {drawer} = this.props;
    this._closeMessageDialog();
    if(drawer) {
      drawer.openDrawer();
    }
  };

  async setFirstLoad() {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.FIRSTLOGIN, "false");
    } catch (error) {
      console.warn("Error saving" + error.message);
    }
  };

  render() {
    const {showModal} = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
        onRequestClose={this._closeMessageDialog}
        >
        <View style={modalStyles.vontainer}>
          <View>
            <Image source={require('../../img/start_instruction.png')} style={modalStyles.image}/>
            <Text style={modalStyles.text}>{this.props.translate['welcome.firstload.start']}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={this._closeMessageDialogOpenDrawer}>
            <View style={modalStyles.hiddenButton}></View>
          </TouchableWithoutFeedback>
          <View style={modalStyles.button}>
            <Icon name="lock-open" size={150} color="#FFFFFF" style={{marginBottom:20}}/>
            <View style={{width: 320}}>
              <Button theme={THEME_NAME[1]} raised={true} text={this.props.translate['welcome.close']} onPress={this._closeMessageDialog}/>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  scene: {
    flex: 1,
    marginTop: 56
  },
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.8)'
  },
  modalImage: {
    height:107,
    marginLeft:2,
    marginTop:2,
    width:120
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft:50,
    textAlign: 'left'
  },
  modalButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHiddenButton: {
    position:'absolute',
    width:42,
    height:42,
    top:8,
    left:8
  }
});

var modalStyles = StyleSheet.create({
  vontainer: {
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.8)'
  },
  image: {
    height:107,
    marginLeft:2,
    marginTop:2,
    width:120
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft:50,
    textAlign: 'left'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenButton: {
    position:'absolute',
    width:42,
    height:42,
    top:8,
    left:8
  }
});

export default connect(state => ({
  state: state.translate,
  firstLoad: state.firstLoad
  })
)(MainApp);
