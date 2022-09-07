const express = require('express');
const dotenv = require('dotenv');
const mongodbConnection = require('./dbConnection');
const router = require('./router');

//initialize env variables;
dotenv.config();

//connec to database
mongodbConnection();

const app = express();
app.use(express.json());

app.use('/', router);


app.listen(process.env.PORT,()=>{console.log('server running on '+process.env.PORT)})