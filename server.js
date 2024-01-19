require('dotenv').config()

const express = require('express')
const app =express()
const mongoose = require('mongoose')
const PORT =  5000;
console.log(process.env.DATABASE_URL)

const debug = require('debug')('app');

// Middleware for API key authentication
function authenticateAPIKey(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      const apiKey = auth[1];
      if (apiKey === process.env.API_KEY) {
        next();
      } else {
        res.status(403).json({ message: 'Invalid API key' });
      }
    } else {
      res.status(401).json({ message: 'No API key provided' });
    }
  }


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log('Connected to mongoose database'))


app.use(express.json())
app.use(authenticateAPIKey);

// define SPI route files
const dealershipRoutes = require('./routes/dealerships')
//const subscriberRoutes = require('./routes/subscribers')
const reviewRoutes = require('./routes/reviews')

app.use('/dealerships', dealershipRoutes);
app.use('/reviews', reviewRoutes);

//app.use('/subscribers', subscriberRoutes);


    
app.listen(PORT,
    () => console.log(` server.js started at http:localhost:${PORT}`))


