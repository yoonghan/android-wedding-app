'use strict';

import React, {Component, PropTypes} from 'react';

import {
  requireNativeComponent,
  Text,
  StyleSheet,
  View
} from 'react-native' ;

export default class GalleryGlider extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <RNGallery style={styles.container} {...this.props}/>
    )
  }
};

GalleryGlider.propTypes = {
  imagesAsJsonString: PropTypes.string.isRequired,
  loadingColor: PropTypes.string.isRequired
}

const RNGallery = requireNativeComponent(
  'RNGallery', null
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
