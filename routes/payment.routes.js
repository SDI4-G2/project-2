const express = require('express');
const router = express.Router();
const validator = require('../middleware/jwt.middleware');

const PaymentController = require('../controllers/payment.controller');
const PaymentController = new PaymentController();

router.use('/', (req, res, next) => {
    const result = validator.authenticateToken(req.headers['authorization']);
    if (result.status) {
        res.status(result.status);
        return res.json(result.message);
    }
    res.locals.user = result.data;
          
    next();
})

router.post('/payment', PaymentController.insertPayment);

module.exports = router;