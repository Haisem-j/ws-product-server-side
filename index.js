const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
var redis = require('redis')
const pg = require('pg')
const app = express()
const apiLimitChecker = require("./APIChecker/apiLimitChecker");

dotenv.config();


// Import routes
const eventRoute = require('./routes/events');
const statRoute = require('./routes/stats');
const poiRoute = require('./routes/poi');


// Middleware
app.use(express.json());
app.use(cors());
app.use(apiLimitChecker); // Api Limit checker

app.use('/events', eventRoute);
app.use('/stats', statRoute);
app.use('/poi', poiRoute);


app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})