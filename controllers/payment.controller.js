const paymentService = require('../services/payment.service');

const PUBLISHABLE_KEY = "pk_test_51LEjuRAfZxkm95kPjgIpndtLpAKOkhmJQJg2pf9iAglCHxqlLg20DPosvYrcgydkHTCr5tPECLzPalnjHRnEtBdE00oK5ZHOmO";
const SECRET_KEY = "sk_test_51LEjuRAfZxkm95kPGxK6yaYR2VKhIeZwkYXhLGGc1q75E5G4hjcTLHV3lrr3cdyViQ1OD2GpwDbT6RhHdfht0Dns00DLi0jihC";
const Stripe = require('stripe');

//Confirm the API version from stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

class PaymentController {
    async createPaymentIntent(req, res) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
              amount: 1099, //lowest denomination of particular currency
              currency: "usd",
              payment_method_types: ["card"], //by default
            });
        
            const clientSecret = paymentIntent.client_secret;
        
            res.json({
              clientSecret: clientSecret,
            });
        } catch (e) {
            res.json({ error: e.message });
        }
    }

    async insertPayment(req, res) {
        const paymentJson = req.body;
        
        if (!req.body.userid && !req.body.stripeid) {
            return res.status(400).json({msg: 'Enter values for user id and payment id'});
        }

        if (!req.body.userid) {
            return res.status(400).json({msg: 'Enter values for user id'});
        }

        if (!req.body.stripeid) {
            return res.status(400).json({msg: 'Enter values for stripe id'});
        }

        const result = await paymentService.insertPayment(paymentJson)

        res.status(result.status);
        res.json({message: result.message, data: result.data});
    }
}

module.exports = PaymentController;