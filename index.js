// http://localhost/phpmyadmin
const express = require('express');
const app = express();
const db = require('./config/db');
const routes = require('./routes/index');
require('dotenv').config();


// Handle errors
app.use((err, req, res, next) => {
  if (!err) return next();

  res.status(500);
  res.send('500: Internal server error');
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    'Server started at :' + port
  );
});