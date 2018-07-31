'use strict';

import React, {PropTypes, Component} from 'react';

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native' ;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Button, TYPO, COLOR, THEME_NAME } from 'react-native-material-design';

class RegistrationView extends Component {

  static contextTypes = {
      navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  };

  login = () => {
    const { navigator } = this.context;
    navigator.push({
      id: this.props.page
    })
  };

  _setModalVisible = (isShown) => {
    this.setState({
      modalVisible: isShown
    });
  };

  render() {
    const {modalVisible} = this.state;
    const {translate} = this.props.state;

    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={styles.modalContainer}>
            <View style={styles.containerModal}>
              <Text style={[TYPO.paperFontHeadline, COLOR.paperBlue400]}>{translate['registration.about']}</Text>
              <View style={styles.containerModalMessage}>
                <Text>{translate['registration.aboutMessage']}</Text>
                <Text style={styles.txtSignature}>{translate['registration.signature']}</Text>
              </View>
              <View style={styles.btnContainer}>
                <Button theme={THEME_NAME[1]} raised={true} text={translate['registration.close']} onPress={() => this._setModalVisible(false)}/>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.mainContainer}>
          <View style={styles.containerTitle}>
            <View style={styles.titleContainer}>
              <Text style={[TYPO.paperFontHeadline, styles.titleSection]}>{translate['registration.title1']}</Text>
              <Text style={[TYPO.paperFontHeadline, styles.titleSection]}>{translate['registration.title2']}</Text>
            </View>
          </View>
          <Image style={styles.containerImage} source={require('../../../img/main.png')} resizeMode={'contain'}></Image>
          <View style={styles.containerMessage}>
            <View style={styles.btnContainer}>
              <Button theme={THEME_NAME[1]} text={translate['registration.loginButton']} raised={true} onPress={this.login} />
            </View>
            <Button text={translate['registration.whatabout']} onPress={() => this._setModalVisible(true)}/>
          </View>
        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  mainContainer: {
    flex:7,
    flexDirection: 'column',
    backgroundColor: '#FFF'
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
  },
  containerTitle: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  containerImage: {
    flex: 3,
    alignSelf: 'stretch',
    width: null,
    height: null,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  },
  imgSection: {
    flex:1,
    alignSelf: 'stretch'
  },
  containerMessage: {
    flex:2,
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15
  },
  txtSignature: {
    marginTop: 20,
    textAlign: 'right'
  },
  titleSection: {
    textAlign: 'center'
  },
  txtSection: {
    color: '#000',
    marginBottom: 15,
    textAlign: 'justify'
  },
  btnContainer: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30
  }
});

export default connect(state => ({
  state: state.translate
  })
)(RegistrationView);
