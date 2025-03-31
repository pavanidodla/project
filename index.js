const express=require('express');
const mongoose=require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const dotEnv = require('dotenv');
const cors = require('cors');
const path = require('path')

dotEnv.config()


const app=express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

const port=process.env.port || 3008;
app.use(express.json())
app.use(cors())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(port,()=>{
    console.log("Server is running at 3008")
})