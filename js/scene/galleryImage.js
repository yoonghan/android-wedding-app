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
import GalleryGlider from '../component/android/galleryGlider';
import LoadingMessage from '../component/shared/loader';
import photosetting from '../stores/photosettings';

class GalleryImageView extends Component {
  static contextTypes = {
      galleryloader: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      mediaData: null,
      images: "{images:{}}"
    };
  }

  componentDidMount(){
    const { feedPath } = this.props;
    const { galleryloader } = this.context;
    const {translate} = this.props.state;

    galleryloader.getImages(feedPath)
    .then((responseData) => {
      this.setState({
        images: JSON.stringify({images : responseData})
      });
    })
    .catch((error) => {
      console.warn(error);
      ToastAndroid.show(translate['gallery.image.error.noconnection'], ToastAndroid.SHORT);
    })
    .done();
  };

  componentWillUnmount() {
    const { galleryloader } = this.context;
    galleryloader.terminate();
  };

  render() {
    const { feedPath } = this.props;
    const { galleryloader } = this.context;
    const {translate} = this.props.state;
    return(
      <Image source={require('../../img/gallerybg.jpg')}  style={styles.container} resizeMode={'contain'}>
        {
          !galleryloader.isImageLoaded(feedPath) && <LoadingMessage message={translate['gallery.image.loading.message']}/>
        }
        {
          galleryloader.isImageLoaded(feedPath) && <GalleryGlider imagesAsJsonString={ this.state.images } loadingColor={'#D81B60'}/>
        }
      </Image>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    height: null,
    width: null
  }
});

export default connect(state => ({
  state: state.translate
  })
)(GalleryImageView);
