const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./config/jwtRS256.key');

module.exports = {
    authenticateToken: (reqHeader=false) => {
        const result = {
            status: null,
            message: null,
            data: null
        };
        let jwtToken;
        let decoded;

        if (reqHeader) {
            jwtToken = reqHeader && reqHeader.split(' ')[1];
        } 
        
        if (!jwtToken) {
            result.status = 401;
            result.message = `Please login!`;
            return result;
        }

        try {
            // decoded = jwt.verify(jwtToken, privateKey, {algorithms: "RS256"})
            decoded = jwt.verify(jwtToken, privateKey)
        } catch (err) {
            result.status = 403;
            result.message = `Login Timeout!`;
            return result;
        }

        result.data = decoded;
        return result;
    }
}
