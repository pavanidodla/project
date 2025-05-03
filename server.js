const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb+srv://dodlapavani511:pavani123@cluster0.tx0ojnp.mongodb.net/')
.then(()=>console.log("Mongodb connected sucessfully"))
.catch((error)=>console.log("error"));


  app.use('/api/favorites', require('./routes/favourites'));
  const path = require('path');
app.use('/image', express.static(path.join(__dirname, 'public/image')));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
