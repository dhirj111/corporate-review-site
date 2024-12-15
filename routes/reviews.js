const path = require('path');

const express = require('express');
const bodyParser = require('body-parser'); 
const adminController = require('../controllers/reviews');

const router = express.Router();

console.log('route is about to hit')
router.get('/', adminController.baseroot);

router.post('/userDetails', adminController.postdetails)
module.exports = router;