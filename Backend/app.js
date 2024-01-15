const express = require('express');
const cors = require("cors");
const route = require('./routers/router.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array()); 

app.use(cors());

app.use(express.json());
app.use('/', route);



app.listen(3000);