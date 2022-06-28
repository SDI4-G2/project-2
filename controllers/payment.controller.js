const paymentService = require('../services/payment.service');

class PaymentController {
    async insertPayment(req, res) {
        const paymentJson = req.body;
        const role = res.locals.user.role;

        if (!req.body.userid && !req.body.stripeid) {
            return res.status(400).json({msg: 'Enter values for user id and payment id'});
        }

        if (!req.body.userid) {
            return res.status(400).json({msg: 'Enter values for user id'});
        }

        if (!req.body.stripeid) {
            return res.status(400).json({msg: 'Enter values for stripe id'});
        }

        const result = await paymentService.insertPayment(role, paymentJson)

        res.status(result.status);
        res.json({message: result.message, data: result.data});
    }
}

module.exports = PaymentController;