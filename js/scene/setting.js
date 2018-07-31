'use strict';

import React, {Component, PropTypes} from 'react';

import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ASYNC_KEYS, LOCALES, TEXTSIZES} from '../action/storeTypes';
import * as storeActions from '../action/storeActions';
import { Button, Card, Subheader, Icon, COLOR, TYPO, THEME_NAME } from 'react-native-material-design';

class SettingView extends Component {
  static contextTypes = {
      galleryloader: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  saveLocale = (locale) => {
    this.changeLocale(locale).done();
  };

  saveTextSize = (textSize) => {
    this.changeTextSize(textSize).done();
  };

  clearData = () => {
    const { galleryloader } = this.context;
    galleryloader.clearImagesLoaded();
  };

  async changeLocale(locale) {
    const {setLanguage} = this.props.actions;
    setLanguage(locale);
    try {
  		await AsyncStorage.setItem(ASYNC_KEYS.LANGUAGE, locale);
  	} catch (error) {
  		console.warn("Error saving" + error.message);
  	}
  }

  async changeTextSize(textSize) {
    const {setTextSize} = this.props.actions;
    setTextSize(textSize);
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.TEXTSIZE, textSize);
    } catch (error) {
      console.warn("Error saving" + error.message);
    }
  }

  render() {
    const {locale, translate} = this.props.state;
    const {textSize} = this.props.textState;

    var languageRow = [], textSizeRow = [];
    for(var key in LOCALES) {
      languageRow.push(<LanguageSelector
                    saveLanguage={this.saveLocale}
                    languageKey={key}
                    languageValue={LOCALES[key]}
                    currentlocale={locale}
                    key={key}/>);
    }
    for(var key in TEXTSIZES) {
      textSizeRow.push(<TextSizeSelector
          currentTextSize={textSize}
          textSizeKey={key}
          textFontSize={TEXTSIZES[key]}
          textSizeText={translate['setting.textSize.'+key]}
          saveTextSize={this.saveTextSize}
          key={key}/>);
    }
    return(
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView]}>
          <View style={styles.container}>
            <Card>
              <Card.Body>
                <View style={styles.header}>
                   <Text style={styles.headerTitle}><Icon name="language" size={15} color="#2196F3"/> {translate['setting.languageTitle']}</Text>
                </View>
                <View>
                    {languageRow}
                </View>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}><Icon name="font-download" size={15} color="#2196F3"/> {translate['setting.textSizeTitle']}</Text>
                </View>
                <View>
                    {textSizeRow}
                </View>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <View style={styles.header}>
                   <Text style={styles.headerTitle}><Icon name="cached" size={15} color="#2196F3"/> {translate['setting.clearDataTitle']}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.galleryContainer}>{translate['setting.clearData']}</Text>
                    <Button theme={THEME_NAME[1]} text={translate['setting.clearDataBtn']} value="Clear" raised={true} onPress={this.clearData} primary = {'paperPink'}/>
                </View>
              </Card.Body>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class LanguageSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={()=>this.props.saveLanguage(this.props.languageKey)} underlayColor="#efefef">
        <View style={styles.selectionContainer}>
          <Text style={[styles.selectionText, this.props.currentlocale === this.props.languageKey && styles.selected]}>+ {this.props.languageValue}</Text>
          <Text style={styles.selectionIcon}>
          {
            this.props.currentlocale === this.props.languageKey && <Icon name="check" color="#E91E63"/>
          }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class TextSizeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {textSizeText, textFontSize, currentTextSize, textSizeKey} = this.props;
    return (
      <TouchableHighlight onPress={()=>this.props.saveTextSize(textSizeKey)} underlayColor="#efefef">
        <View style={styles.selectionContainer}>
          <Text style={[styles.selectionText, currentTextSize === textSizeKey && styles.selected]}>
              + <Text style={{fontSize:textFontSize}}>{textSizeText}</Text>
          </Text>
          <Text style={styles.selectionIcon}>
          {
            currentTextSize === textSizeKey && <Icon name="check" color="#E91E63"/>
          }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingBottom: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  headerTitle: {
    color: '#C2185B',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
  },
  selectionText: {
    flex: 2,
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
    padding: 2
  },
  selectionIcon: {
    flex: 3,
    fontSize: 16,
    marginLeft: 10
  },
  selectionContainer: {
    flex: 5,
    flexDirection: 'row',
    marginTop: 5
  },
  galleryContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  selected: {
    color: '#E91E63'
  }
});

export default connect(state => ({
  state: state.translate,
  textState: state.textSize
  }),
  (dispatch) => ({
    actions: bindActionCreators(storeActions, dispatch)
  })
)(SettingView);
