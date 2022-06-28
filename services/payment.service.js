const Payment = require('../models/Payment');

Payment.sync().then((data) => {
    console.log("Table & model synced successfully");
}).catch((err) => {
    console.log("Error syncing Table & model");
});

module.exports = {
    insertPayment: async (role, paymentJson) => {
        const result = {
            status: null,
            message: null,
            data: null
        }

        if (role != 'admin') {
            result.status = 401;
            result.message = `Unauthorized access`;
            return result;
        }

        try {
            const newPayment = await Payment.create({
                userid: paymentJson.userid,
                stripeid: paymentJson.stripeid
            });

            await newPayment.save();
            result.status = 200;
            result.message = `Record insert successfully`;
            result.data = newPayment;
            return result;

        } catch (err) {
            result.status = 403;
            result.message = `Insertion Failure!`;
            result.data = err.name;
            return result;
        }
    }
}