# :trophy: MERN Stack Starter

Full-stack project starter for MongoDB, Express, React, Node (MERN)

This app is deployed [here](https://peaceful-earth-12146.herokuapp.com/) (heroku free tier, ~5-10sec load)

Features:

- Node Express backend server connected to MongoDB
- Webpack React frontend client served by backend
- Authentication (register, login, logout)
- Messages example: create (private), read (public)
- Webpack and Express mostly configured for dev + prod

## Instructions

To get started, clone this repository and run

```bash
npm install
```

Next, add a `keys_dev.js` file to the `src/server/config` folder with

```javascript
module.exports = {
  mongoURI: "<MongoDB-URI-Connection-String-Goes-Here>",
  secretOrKey: "secret",
};
```

replacing `mongoURI` above with your connection string for MongoDB (mlab, atlas, etc)

## Run Locally

Start the project on port's 3000 and 8080 with

```
npm run dev
```

## Heroku Deploy

Once you've signed up for **Heroku**, login using

```bash
heroku login
```

Next, create a new project with

```bash
heroku create
```

Head to this project on the Heroku site under **Settings** >> **Reveal Config Vars**. Add the following variables

- **MONGO_URI**: mongodb connection string
- **NPM_CONFIG_PRODUCTION**: false
- **SECRET_OR_KEY**: secret
