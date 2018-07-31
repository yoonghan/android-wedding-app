'use strict'

let routes = null;

try {
  routes = require('../stores/routes').default;
} catch (e) {
  console.warn(e);
}

export default class Navigate {

  constructor(navigator) {
    this.navigator = navigator;
    this.currentRoute = null;
    this.previousRoute = null;
    this.isChild = false;
  };

  static getInitialRoute = (path, customRoutes) => {
    let initial;
    for (const route in routes) {
			if (routes[route].initialRoute) {
				initial = {path: route, ...routes[route]};
				break;
			}
		}
    return initial;
  };

  to = (path, props, title) => {
		if (!path) {
			console.warn(`[Navigate.to(undefined)] A route path is required to navigate to`);
		} else {
			const obj = this._getRouteObject(path);

			if (!obj || !obj.component) {
				console.warn(`[Navigate.to(${path})] No component exists at this path`);
			} else {
				this.isChild = path.split('.').length > 1;
				const route = {
					title: title ? title : (obj.title ? obj.title : path),
					path,
					component: obj.component,
					props
				};
        this.currentRoute = route;
        this.previousRoute = this.currentRoute;
				this.navigator.replace(route);
			}
		}
	};

  /**
  * Deep get an object without passing in the 'children' key
  * @param path
  * @returns object
  * @private
  */
  _getRouteObject = (path) => {
    let obj = routes;
    const properties = path.replace(/\./g, '.children.').split('.');
    if (properties.length === 1) return obj[path];
    properties.forEach(function (key) {
      if (!obj || !hasOwnProperty.call(obj, key)) {
        obj = undefined;
        return;
      }
      obj = obj[key];
    });
    return obj;
  };

  /**
  	* Go back to the parent of the current component
  	* @param title
  	* @param props
  	*/
  back = (title, props) => {
    if(!this.isChild) {
      let route = Navigate.getInitialRoute();
			this.currentRoute = route;
			this.navigator.replace(route);
    }
    else {
    	const current = this.navigator.getCurrentRoutes()[0].path;
    	const path = current.substr(0, current.lastIndexOf('.'));
    	const obj = this._getRouteObject(path);

    	if (!obj) {
    		console.warn(`[Navigate.back()] No component exists for the parent of ${current}`);
    	} else {
    		this.isChild = path.split('.').length > 1;
    		const route = {
    			// title: title ? title : (obj.title || this._getPathPrettyName(path)),
    			title: title ? title : (this.previousRoute ? this.previousRoute.title : (obj.title || this._getPathPrettyName(path))),
    			path,
    			component: obj.component,
    			props
    		};

    		this.currentRoute = route;
    		this.navigator.replace(route);
    	}
    }
	}

  /**
   * Check if the current page is still the main page. If it is, exit.
   */
  isMain = () => {
    return this.navigator.getCurrentRoutes()[0].path === Navigate.getInitialRoute().path;
  }
};
