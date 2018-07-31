/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {PropTypes, Component} from 'react';
import {
  AsyncStorage,
  Navigator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as storeActions from '../action/storeActions';

import MainApp from './mainapp';
import LoginView from '../scene/restricted/login';
import RegistrationView from '../scene/restricted/registration';

import {ASYNC_KEYS} from '../action/storeTypes';
import {getLocaleLang} from '../component/android/systemproperties';

var _navigator;

class WeddingApp extends Component {

  static childContextTypes = {
    navigator: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      navigator: null
    };
  };

  getChildContext = () => {
		return {
			navigator: this.state.navigator
		}
	};

  componentWillMount() {
  	this._loadInitialState().done();
  };

  setNavigator = (navigator) => {
    this.setState({
      navigator: navigator
    });
  };

  async _loadInitialState() {
    const {setLanguage, setTextSize, removeFirstLoad} = this.props.actions;
    const {textSize} = this.props.textState;

    let storedTextSize = await AsyncStorage.getItem(ASYNC_KEYS.TEXTSIZE);
    setTextSize(storedTextSize !== null ? storedTextSize: textSize);

    let storedLocale = await AsyncStorage.getItem(ASYNC_KEYS.LANGUAGE);
    setLanguage(storedLocale !== null ? storedLocale: getLocaleLang());

    let isFirstLoaded = await AsyncStorage.getItem(ASYNC_KEYS.FIRSTLOGIN);
    if(isFirstLoaded !== null) {
      removeFirstLoad();
    }

    let login = await AsyncStorage.getItem(ASYNC_KEYS.LOGIN);
    this.state.navigator.replace({
      id: (login === null ? '1' : '2')
    });
  };

  _navRenderScreen = (route, navigator) => {
    	_navigator = navigator;
    	switch (route.id) {
        case '0':
          //Initial View is nothing
          return (<View></View>);
        case '1':
          //First page for starting users
          return (<RegistrationView page='3'/>);
        case '2':
          //Logged users will always appear here
          return (<MainApp />);
        case '3':
          //New users will always appear here
          return (<LoginView successPage='2'/>);
     	}
   };

  render() {
    return (
      <Navigator
        initialRoute={{id: '0'}}
        ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
        renderScene={this._navRenderScreen}/>
    );
  }
};

export default connect(state => ({
  textState: state.textSize
  }),
  (dispatch) => ({
    actions: bindActionCreators(storeActions, dispatch)
  })
)(WeddingApp);
