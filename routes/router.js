const express = require('express');

const controller = require('../controller/mainController');

const router = express();

router.get('/home',controller.userRegistration);

router.post('/submit',controller.submitData);

router.post('/viewSingleData',controller.viewSingleData);

router.post('/updateCustomerData',controller.updateCustomerData);

router.delete('/deleteCustomerData/:user',controller.deleteCustomerData);

router.post('/updated',controller.updated);

router.post('/logout',controller.logout);

router.get('/getData',controller.getData);

module.exports = router;