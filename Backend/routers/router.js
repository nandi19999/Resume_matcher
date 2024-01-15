const express = require('express');
const controller = require('../controllers/basic-controller.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({msg: 'inside app'});
});

// router.post('/', (req, res) => {
//     res.send({msg: 'inside app'});
// });

router.post('/getMessage', controller.exec);

module.exports = router;