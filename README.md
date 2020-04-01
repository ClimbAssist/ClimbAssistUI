# ClimbAssistUI

Web App for Climb Assist
------------------------

Welcome to the Climb Assist UI or the front end of the Climb Assist Site [climbassist.com](https://climbassist.com)!

This project is built on the [Vue](https://vuejs.org/) and [Nuxt](https://nuxtjs.org/) Frameworks.

It also uses the [Vuetify](https://vuetifyjs.com/) Material Library and [Three.js](https://threejs.org/) Library for WebGL.

Project Structure
-----------------
The general setup is that the Layout folder contains the layout for entire app with the Pages folder containing the layouts for all the routes. The pages and layouts may be made up of various components imported from the Components folder.
Hierarchy: Layout > Page > Component

The project uses a central store [Vuex Store](https://vuex.vuejs.org/) in the store folder to maintain a common state across the entire application

For detailed explanation on the project structure and configuration, checkout [Nuxt.js docs](https://nuxtjs.org).

If you have any questions or concerns, reach out to the development team at
[dev@climbassist.com](mailto:dev@climbassist.com).

For information on contributing see the [Contributing Guidelines](CONTRIBUTING.md)

## Build Setup

The Front End requires node and npm to be installed. If it is not already installed, [install npm](https://github.com/npm/cli)

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# Unit testing with jest
$ npm run test
```

## Build for use with ClimbAssistService

For information see the service repository

```bash
$ npm install
$ npm run build
$ mv dist/static/static/* dist/static
$ rm -r dist/static/static
```
