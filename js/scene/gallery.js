'use strict';

import React, {Component, PropTypes} from 'react';

import {
  Image,
  NetInfo,
  ListView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View
}
from 'react-native';

import { connect } from 'react-redux';
import { Button } from 'react-native-material-design';
import LoadingMessage from '../component/shared/loader';
import photosetting from '../stores/photosettings';

class GalleryView extends Component {
  static contextTypes = {
      navigator: PropTypes.object.isRequired,
      galleryloader: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      connectionInfo: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      lostConnection: false
    };
  };

  componentDidMount(){
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
    NetInfo.fetch().done(
        (connectionInfo) => {
          this.setState({connectionInfo});

          if(connectionInfo.indexOf('MOBILE') > -1 || connectionInfo.indexOf('WIFI') > -1) {
            this.fetchData(connectionInfo);
          }
          else {
            this.setState({
              lostConnection: true
            });
          }
        }
    );
  };

  fetchData(connectionInfo) {
    const { galleryloader } = this.context;
    const { translate } = this.props.state;

    if(connectionInfo.indexOf('MOBILE') > -1 && !galleryloader.isAlbumLoaded()) {
      ToastAndroid.show(translate['gallery.image.connection.warning'], ToastAndroid.SHORT);
    }

    galleryloader.getAlbumImages().then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData)
      });
    })
    .catch((error) => {
      console.warn(error);
      this.setState({
        lostConnection: true
      });
    })
    .done();
  }

  componentWillUnmount() {
    const { galleryloader } = this.context;
    galleryloader.terminate();
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  };

  _handleConnectionInfoChange = (connectionInfo) => {
    this.setState({
      connectionInfo,
    });
  };

  _onPressImage = (feedPath) => {
    const { navigator } = this.context;
    navigator.to('gallery.galleryImage', {feedPath: feedPath});
  };

  _trimTitle = (title) => {
    if(title.indexOf("(") > -1) {
      title = title.substring(0, title.indexOf("("));
    }
    title = title.length > 14 ? (title.substring(0,11) + '...'): title;
    return title;
  };

  renderListData = (rowData) => {
    const {translate} = this.props.state;

    return(
        <TouchableHighlight onPress={() => this._onPressImage(rowData.link[0].href)} underlayColor={'#FFFFFF'}>
          <View style={{paddingBottom: 10}}>
          <View style={styles.listContainer}>
            <Image style={styles.imageList} source={{uri:rowData.media$group.media$thumbnail[0].url}} />
            <View style={styles.messageList}>
                <Text style={styles.titleList}>{this._trimTitle(rowData.title.$t)}</Text>
                <Text style={styles.summaryList}>{translate['gallery.image.count']} ({rowData.gphoto$numphotos.$t})</Text>
            </View>
          </View>
          </View>
        </TouchableHighlight>
    )
  };

  render() {
    let _listView: ListView;
    const { translate } = this.props.state;
    const { galleryloader } = this.context;
    return (
      <Image source={require('../../img/gallerybg.jpg')}  style={styles.imageContainer} resizeMode={'contain'}>
        {
          !galleryloader.isAlbumLoaded() && !this.state.lostConnection &&
          <LoadingMessage message={translate['gallery.loading.message']}/>
        }
        {
          !this.state.lostConnection && galleryloader.isAlbumLoaded() &&
          <ListView
            ref={(listView) => { _listView = listView; }}
            dataSource={this.state.dataSource}
            renderRow={this.renderListData}/>
        }
        {
          this.state.lostConnection &&
          <ErrorMessage translate={translate}/>
        }
      </Image>
    );
  }
};

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {translate} = this.props;
    return(
      <View style={styles.connectionContainer}>
        <View style={[styles.messageBoxContainer, styles.messageBoxContainerAlert]}>
          <View>
            <Text style={styles.messageBoxTitleText}>{translate['gallery.error.notice']}</Text>
          </View>
          <View>
            <Text style={styles.messageBoxBodyText}>{translate['gallery.error.notice.message']}</Text>
          </View>
        </View>
      </View>);
  }
};

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems:'stretch',
    backgroundColor: '#FFFFFF',
    width: null,
    height: null
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems:'stretch'
  },
  connectionContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    paddingTop: 30
  },
  listContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#D81B60',
    elevation: 4,
    height: 160,
    marginTop: 10,
    padding: 5
  },
  imageList: {
    flex: 1,
    alignSelf: 'stretch',
  },
  messageList: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 18,
    backgroundColor: '#D81B60',
  },
  summaryList: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5
  },
  titleList: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 44,
    textAlign: 'left'
  },
  messageBoxContainerAlert: {
    backgroundColor:'#d32F2f'
  },
  messageBoxTitleNotice: {
    color:'#707070'
  },
  messageBoxContainer:{
    width:320,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10
  },
  messageBoxTitleText:{
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center',
    fontSize:20,
    marginBottom:10
  },
  messageBoxBodyText:{
    color:'#fff',
    fontSize:16
  }
});

export default connect(state => ({
  state: state.translate
  })
)(GalleryView);
