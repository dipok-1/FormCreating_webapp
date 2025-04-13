const express = require('express')
const mongodb = require('./config/db')
require('dotenv').config()
mongodb();
const cors = require('cors')
const app  = express();
app.use(cors());
app.use(express.json())

//import routes
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');
const deleteRoutes = require('./routes/deleteRoutes');
// use routes
app.use('/api/users',userRoutes);
app.use('/api/forms',formRoutes);
app.use('/api',responseRoutes);
app.use('/api',deleteRoutes);

app.get('/',(req,res)=>{
    res.send('API IS RUNNING')
})
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log('server is running at port 4000..')
})