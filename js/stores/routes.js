export default {
  welcome: {
    initialRoute: true,
    title: 'Welcome',
    component: require('../scene/welcome').default
  },
  about: {
    title: 'About',
    component: require('../scene/about').default
  },
  gallery: {
    title: 'Gallery',
    component: require('../scene/gallery').default,
    children: {
      galleryImage: {
        title: 'Images',
        component: require('../scene/galleryImage').default
      }
    }
  },
  arrangements: {
    title: 'Arrangements',
    component: require('../scene/tblarrangement').default
  },
  setting: {
    title: 'Settings',
    component: require('../scene/setting').default
  },
  venue: {
    title: 'Venue',
    component: require('../scene/venue').default,
    children: {
      venueMap: {
        title: 'Map',
        component: require('../scene/venuemap').default
      }
    }
  }
}
