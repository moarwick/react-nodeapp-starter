react-nodeapp-starter
=====================

## Boilerplate for developing React apps on Node.js (Express), with Webpack/ES6+

### Runs on Express Server
* Write your server and client-side code in ES-2015+ (transpiled with Babel)
* Server responds with `index.html` to *all* GET requests (expand as needed)
* When run locally, applies Webpack middleware with hot-loading
* When built and run on prod, serves bundled static files from `public/`
* Supports CSS and Sass (with Autoprefixer)
* Small images are inlined, larger images are served via URLs
* Portions adapted from  [webpack-express-boilerlate](https://github.com/christianalfoni/webpack-express-boilerplate)


### Run it locally
```
npm start
open http://localhost:8080
```
* Express server file: `server-es6.js`
* App entry-point file: `src/index.js`


### Bundle & minify for prod
```
npm run build
```
* Server is transpiled to `server.js`, static files are saved into `public/`
* The *build* script nukes and re-creates `public/` anew each time
* A unique hash is appended to static assets (solves cached files problems)


### How to deploy to Digital Ocean's Droplet
* [Set up an Ubuntu Droplet](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps) with Node & PM2
* [Install Git](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) for automatic deployment, create a bare remote repo
* Build for prod, commit, and push to your Droplet's remote repo
* Launch `server.js` in your server folder (either directly, or via PM2)
* *NOTE: Remember to set up a `post-receive` hook to transfer the files from your repo to your server folder*
* *NOTE: Run `npm install` in your server folder (on first push, and whenever you change any of your `package.json` dependencies)*
* *NOTE: Whenever (re)launching your server, be sure the `NODE_ENV` environment var is set to `production`, e.g. `NODE_ENV=production pm2 start server.js`*
