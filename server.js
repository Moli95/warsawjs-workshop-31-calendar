const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const { PORT, SESSION_OPTIONS } = require('./constants');
const rootRouter = require('./rootRouter')

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize())
app.use(passport.session());

app.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/github');
  }
});

app.use(express.static('public'));
app.use(rootRouter);

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});

