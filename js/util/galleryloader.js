'use strict'

import photosetting from '../stores/photosettings';

export default class GalleryLoader {

  constructor() {
    this._init();
  };

  /**
   * Make sure the response returned are always asynchronous.
   */
  async getAlbumImages() {
    let promiseVal = null;

    if(this.albumLoaded && this.albumResponse != null) {
      promiseVal = new Promise ((resolve, reject) => {
        resolve(this.albumResponse);
      });
    }
    else {
      promiseVal = fetch(photosetting.photo.url)
      .then((response) => {
        this.albumLoaded = true;
        return response.json();
      })
      .then((responseData) => responseData.feed.entry.filter((entry) => {
        for(let count=0; count<photosetting.photo.albums.length; count++) {
          if(photosetting.photo.matching === 'P'){
            if(entry.title.$t.indexOf(photosetting.photo.albums[count]) > -1) {
              return true;
            }
          }
          else {
            return entry.title.$t === photosetting.photo.albums[count]
          }
        }
        return false;
      }))
      .then((responseData) => {
        this.albumResponse = responseData;
        return this.albumResponse;
      })
    }

    this.albumPromise = promiseVal;
    return this.albumPromise;
  }

  async getImages(feedPath) {
    let promiseVal = null;

    if(this.feedImages[feedPath] && this.feedImages[feedPath].imageLoaded && this.feedImages[feedPath].imageResponse) {
      promiseVal = new Promise ((resolve, reject) => {
        resolve(this.feedImages[feedPath].imageResponse);
      });
    }
    else {
      this.feedImages[feedPath] = {
        imageLoaded: false,
        imageResponse: null,
        imagePromise: null
      };

      promiseVal = fetch(feedPath + "&imgmax=" + photosetting.photo.fullViewSize)
      .then((response) => {
        this.feedImages[feedPath].imageLoaded = true;
        return response.json();
      })
      .then((responseData) => responseData.feed.entry.map((entry) => {
        return { name: entry.media$group.media$title.$t,
                 timestamp: entry.published.$t,
                 url: {
                  medium: entry.media$group.media$thumbnail[2].url,
                  large: entry.media$group.media$content[0].url
                 }
               }
      }))
      .then((responseData) => {
        this.feedImages[feedPath].imageResponse = responseData;
        return this.feedImages[feedPath].imageResponse;
      })
    }

    this.feedImages[feedPath].imagePromise = promiseVal;
    return this.feedImages[feedPath].imagePromise;
  }

  terminate() {
    // if(this.albumPromise && !this.albumLoaded) {
    //   this.albumPromise.abort();
    // }
    // for(let imageFeed in this.feedImages) {
    //   if(imageFeed.imagePromise && !imageFeed.imageLoaded) {
    //     imageFeed.imagePromise.abort();
    //   }
    // }
  }

  setAlbumLoaded(state) {
    this.albumLoaded = state;
  }

  isAlbumLoaded() {
    return this.albumLoaded;
  }

  setImageLoaded(feedPath,state) {
    if(this.feedImages[feedPath]) {
      this.feedImages[feedPath].imageLoaded = state;
    }
  }

  isImageLoaded(feedPath) {
    return this.feedImages[feedPath] && this.feedImages[feedPath].imageLoaded;
  }

  clearImagesLoaded() {
    this._init();
  }

  _init() {
    this.albumLoaded = false;
    this.albumResponse = null;
    this.albumPromise = null;
    this.feedImages = {};
  }
}
