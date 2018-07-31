'use strict';

import React, {PropTypes, Component} from 'react';

import {
  AsyncStorage,
  BackAndroid,
  Image,
  Modal,
  NetInfo,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native' ;

import { connect } from 'react-redux';
import {ASYNC_KEYS} from '../../action/storeTypes';
import LoadingMessage from '../../component/shared/loader';
import {startBarcodeScanner} from '../../component/android/barcodeScanner';
import { Card, Button, COLOR, TYPO, THEME_NAME } from 'react-native-material-design';

class LoginView extends Component {
  static contextTypes = {
      navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      checkScan: false,
      showModal: false,
      modalTitle: '',
      modalMessage: '',
    };
  };

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress);
  };

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  };

  _hardwareBackPress = () => {
    const { navigator } = this.context;
    navigator.pop();
    return true;
  };

  verifyConnection = (resultCode, data) => {
    const _resultCode = resultCode;
    const _data = data;
    NetInfo.fetch().done(
        (connectionInfo) => {
          if(connectionInfo.indexOf('MOBILE') > -1 || connectionInfo.indexOf('WIFI') > -1) {
            this.verifyCodex(_resultCode, _data);
          }
          else {
            this._showMessage('noConnection');
          }
        }
    );
  };

  async saveResult() {
    const { navigator } = this.context;
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.LOGIN, 'ok');
      navigator.resetTo({
        id: this.props.successPage
      });
    } catch (error) {
      this._showMessage('unknown');
    }
  }

  verifyCodex = (resultCode, data) => {
    if(data.indexOf('?xcode=')) {
      data = data.replace(/.+\?xcode=([\w]+)/, '$1');
    } else {
      resultCode == 0;
    }

    console.warn("I am getting data:"+data);
    if(resultCode == 2) {
      this._checkState(true);
      let requestBody = {'codex': data};
      // fetch('http://scala.walcron.com/service/wedding/register',
      //     {
      //       method: 'post',
      //       headers: new Headers({
      //         'Content-Type' : 'application/json'
      //       }),
      //       body: JSON.stringify(requestBody)
      //     })
      // .then((response) => {
      //   if(response.ok) {
      //     this.saveResult().done();
      //   }
      //   else {
      //     this._showMessage('invalidQR');
      //     this._checkState(false);
      //   }
      // })
      // .catch((error) => {
      //   this._showMessage('unknown');
      //   this._checkState(false);
      // })
      /** Consider this connection has been made **/
      this.saveResult().done();
    } else {
      this._showMessage('invalidQR');
      this._checkState(false);
    }
  };

  _showMessage = (type) => {
    const {translate} = this.props.state;
    switch(type) {
      case 'noConnection':
        this.setState({
          showModal: true,
          modalTitle: translate['login.noConnectionTitle'],
          modalMessage: translate['login.noConnectionMessage']
        });
        break;
      case 'invalidQR':
        this.setState({
          showModal: true,
          modalTitle: translate['login.invalidQRTitle'],
          modalMessage: translate['login.invalidQRMessage']
        });
        break;
      default:
        this.setState({
          showModal: true,
          modalTitle: translate['login.unknownTitle'],
          modalMessage: translate['login.unknownMessage']
        });
    }
  };

  _checkState = (status) => {
    this.setState({
      checkScan: status
    });
  };

  scan = () => {
    startBarcodeScanner()
    .then(
      function(result) {
        if(result.resultCode != 0) {
          this.verifyConnection(result.resultCode, result.data);
        }
      }.bind(this)
    ).done();
  };

  _closeMessageDialog = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const {checkScan, showModal, modalTitle, modalMessage} = this.state;
    const {translate} = this.props.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={showModal}
          onRequestClose={() => {this._closeMessageDialog()}}
          >
          <View style={styles.modalContainer}>
            <View style={styles.containerModal}>
              <Text style={[TYPO.paperFontHeadline, COLOR.paperPink400]}>{modalTitle}</Text>
              <View style={styles.containerModalMessage}>
                <Text>{modalMessage}</Text>
              </View>
              <View style={styles.btnContainer}>
                <Button theme={THEME_NAME[1]} raised={true} text={translate['login.close']} onPress={() => this._closeMessageDialog()}/>
              </View>
            </View>
          </View>
        </Modal>
        {!checkScan &&
          <View style={styles.instructionContainer}>
            <View style={styles.containerSection}>
              <Text style={[TYPO.paperFontHeadline, COLOR.paperBlue400]}>{translate['login.instruction']}</Text>
              <Image style={[styles.imageContainer]} source={require('../../../img/scanning.png')} resizeMode={'contain'}></Image>
              <Text style={styles.txtDistance}>{'1. ' + translate['login.step1']}</Text>
              <Text style={styles.txtDistance}>{'2. ' + translate['login.step2']}</Text>
              <Text style={styles.txtDistance}>{'3. ' + translate['login.step3']}</Text>
              <Text style={styles.txtDistance}>{'4. ' + translate['login.step4']}</Text>
              <View style={styles.btnContainer}>
                <Button theme={THEME_NAME[1]} text={translate['login.btnScan']} raised={true} onPress={this.scan} />
              </View>
            </View>
          </View>
        }
        {checkScan &&
          <LoadingMessage message={translate['login.loading']}/>
        }
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  instructionContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 30
  },
  containerSection: {
    flex:1
  },
  imageContainer: {
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 20
  },
  btnContainer: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30
  },
  txtDistance: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  containerModalMessage: {
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopColor: '#888',
    borderTopWidth: 3
  },
  containerModal: {
    backgroundColor: '#FFF',
    padding: 30
  }
});

export default connect(state => ({
  state: state.translate
  })
)(LoginView);
