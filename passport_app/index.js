const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('node:path');
const app = express();
require('./strategy/local');

app.use(
  session({
    secret: 'SOME SECRET', // secret key to sign our session
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // TTL for the session
    },
  })
);
// initialize passport package
app.use(passport.initialize());
// initialize a session with passport that authenticates the sessions from express-session
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // Require static assets from public folder
app.set('views', path.join(__dirname, 'views')); // Set 'views' directory for any views being rendered res.render()
app.engine('html', require('ejs').renderFile); // Set view engine as EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  if (!req.user) {
    res.render('authenticate');
  } else {
    res.render('index', { user: req.user });
  }
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

app.post('/log-out', (req, res) => {
  req.logOut((err) => {
    if (err) {
      res.send('something went wrong');
    }

    res.redirect('/');
  });
});

app.use('*', (req, res) => res.redirect('/'));

app.listen(3000, () => console.log('server is running on port 3000'));
