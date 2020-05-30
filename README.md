The coding challenge for interview implemented in Polymer 3.

In this branch Polymer dependencies are served from ESM CDN 
https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/

[Check it live!](http://simulationlabs.com/lunchtime/js/)

# Setup
      
      there is no need for `npm install` as library is read from CDN.
      
## Run locally
* replace `/lunchtime/js/` with `/` in [index.html](index.html)
* then run 
         
      polymer serve --open

### Setup

##### Prerequisites

Install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) ( assuming you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli@next

### Build
is not covered in this branch, look into master branch.

Deployment is a simple copy of project to `/lunchtime/js/` folder on web server.
