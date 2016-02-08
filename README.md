react-nodeapp-starter
=====================

## Boilerplate for developing React apps on Node.js (Express), with Webpack/ES6+

### Runs on Express Server
* Responds with `index.html` to *all* GET requests (expand as needed)
* When run locally, Webpack serves styles and assets dynamically, applies hot-loading
* When run on prod, serves bundled JS & CSS files and static assets (images, fonts)
* Supports CSS and Sass (with Autoprefixer)
* Small images are inlined, larger images are served via URLs
* Portions adapted from  [webpack-express-boilerlate](https://github.com/christianalfoni/webpack-express-boilerplate)


### Run it locally
```
npm start
open http://localhost:8080
```
* Express server: `server.js`
* App entry-point file: `src/index.js`


### Bundle & minify for prod
```
npm run build
```
* All generated static files are saved into `public/`
* The *build* script deletes and re-creates the folder anew each time
* A unique hash is appended to static assets (avoids cached files)


### How to deploy to Digital Ocean's Droplet
* [Set up an Ubuntu Droplet](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps) with Node & PM2
* [Install Git](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) for automatic deployment, create a bare remote repo
* Bundle for prod, commit, and push to your Droplet's remote repo
* Launch `server.js` in your server folder (either directly, or via PM2)
* *NOTE 1: Be sure to set up a *post-receive* hook to transfer the files from your repo to your server folder*
* *NOTE 2: Be sure to first run `npm install` in your server folder (on first push, and whenever you change any of your `package.json` dependencies)*
* *NOTE 3: Make sure your `NODE_ENV` environment var is set to `production` (you can set it in your `~/.profile` file)*
