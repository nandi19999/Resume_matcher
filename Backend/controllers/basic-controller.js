const readable = require('stream').Readable;
const fs = require('fs');
var multer = require('multer');
var upload = multer();
var axios = require('axios');
var FormData = require('form-data');
var exportdatfromPdf = require('C:/Users/sayan/OneDrive/Documents/Resume-match/PDFServicesSDK-Node.jsSamples/adobe-dc-pdf-services-sdk-node/src/extractpdf/extract-text-info-from-pdf.js');
const AdmZip = require("adm-zip");

const saveAsPdflocal = async (req) => {
    let baseval = req.body.pdf;
    let len = baseval.length;
    let ind = baseval.indexOf(",");
    ind++;
    let base64val = baseval.substring(ind, len - ind);
    const fileBuffer = Buffer.from(base64val,'base64');
    const stream = new readable();
    stream.push(fileBuffer);
    stream.push(null);
    try {
        stream.pipe(fs.createWriteStream("./tmp/test2.pdf"));
    } catch(e) {
        console.log(e.msg);
    }
    //next(send_pdf_to_api);
}

const send_pdf_to_api = async () => {
    await exportdatfromPdf.fun();
}

const extractziptolocal = async (path) => {
    const zip = new AdmZip(path);
    zip.extractAllTo("extracted");
}

const exec = ((req, res) => {
    let percentagematching = 0.00;
    saveAsPdflocal(req)
    .then(send_pdf_to_api()
    .then((path) => extractziptolocal(path)
    .then(() => {
        var data = require('C:/Users/sayan/OneDrive/Documents/Resume-match/Backend/extracted/structuredData.json');
        console.log(data);
    })
    // .then((data) => {
    //     comPareData(data).then((dat) => {percentagematching = dat});
    // })
    )
    )
    

    res.status(200).json({msg: 'succesful',
                          matchingAmount: percentagematching
    });
})

module.exports = {exec};