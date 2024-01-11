const express = require('express');
const fs = require('fs');
const cors = require("cors");
const readable = require('stream').Readable;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array()); 

app.use(cors());

app.post('/getMessage', (req, res) => {
    //console.log(req.body.pdf);
    let baseval = req.body.pdf;
    let len = baseval.length;
    let ind = baseval.indexOf(",");
    ind++;
    base64val = baseval.substring(ind, len - ind);
    const fileBuffer = Buffer.from(base64val,'base64');
    const stream = new readable();
    stream.push(fileBuffer);
    stream.push(null);
    try {
        stream.pipe(fs.createWriteStream("./tmp/test.pdf"));
    } catch(e) {
        console.log(e.msg);
    }
    res.send({msg: 'succesful'});
    
    
})

app.get('/', (req, res) => {
    res.send('Hello')
})



app.listen(9000);