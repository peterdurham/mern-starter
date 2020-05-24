# :trophy: MERN Stack Starter

Full-stack project starter for MongoDB, Express, React, Node (MERN)

This app is deployed [here](https://peaceful-earth-12146.herokuapp.com/) (heroku free tier, ~5-10sec load)

Features:

- Node **Express** server
- React **Webpack** client
- **Authentication** (register, login, logout)
- Messages example: **Create** (private), **Read** (public)

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

## Heroku Setup

Once you've signed up for **Heroku**, login using

```bash
heroku login
```

Next, create a new project with

```bash
heroku create
```

Visit this project on the Heroku platform and head to the **Settings** >> **Reveal Config Vars**. Add the following variables

- **MONGO_URI**: your mongodb connection string
- **NPM_CONFIG_PRODUCTION**: false
- **SECRET_OR_KEY**: secret

## Heroku Deploy

The project is ready to deploy with

```bash
git init
git add .
git commit -m "initial commit"
git push heroku master
```

## Tools

This project:

- was built using **Node** for the server
- uses **Express** for backend routing
- uses **Mongoose** for database connection
- uses **Passport** for Auth/login
- uses **Bcryptjs** for password cryptography
- uses **Validator** for serverside validation
- was built using **React** for the client
- uses **Webpack** for bundling files and assets
- uses **React Router** for frontend routing
- uses **Babel** for transpiling React code
- uses **ESLint** for lint checking
