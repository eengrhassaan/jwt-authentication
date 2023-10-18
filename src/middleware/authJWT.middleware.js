
// Importing JsonWebToken
const JWT = require('jsonwebtoken')

// Importing required items
const model = require("../models")
const sequelize = model.sequelize
const User = model.users

const config = require("dotenv").config().parsed
const response_messages = require("../constants/response.messages.constants.js").respone_messages

const verifyToken = (req, res, next) => {
    try {
        // Check for authorization header and then verify token
        if (req.headers && req.headers.authorization) {
            var token =  req.headers.authorization.split(" ")[1]
            
            JWT.verify(token, config.API_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        error: err.message,
                        message: response_messages.INVALID_TOKEN
                    })
                }
                
                const user = User.findOne({ 
                    where: { id: decoded.user_id }}
                    )
                
                if (user) {
                    next();
                } else {
                    return res.status(401).json({
                        status: 401,
                        message: response_messages.CORRUPTED_TOKEN
                    })
                }
            })
        } else {
            req.user = undefined;
            return res.status(401).json({
                status: 401,
                message: response_messages.INVALID_TOKEN
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            error: error,
            message: response_messages.INTERNAL_SERVER_ERROR
        })
    }
};

// Refresh Token
const refreshToken = (req, res) => {
    
    
    if (req.cookies?.jwt || req.headers.authorization?.bearer) {
  
        // Destructuring refreshToken from cookie
        const refreshToken = req.headers? req.headers.authorization.split(" ")[1] : req.cookies.jwt ;
        console.log(refreshToken)
        console.log("\n\n"+ (JWT.decode(refreshToken).exp))

        // Verifying refresh token
        JWT.verify(refreshToken, config.API_SECRET, 
        (err, decoded) => {
            if (err) { 
                // Wrong Refesh Token
                return res.status(406).json({ 
                    message: response_messages.UNAUTHORIZED 
                });
            }
            else {
                // Correct token we send a new access token
                const accessToken = JWT.sign({
                    user_id: decoded.user_id,
                    email: decoded.email
                }, config.API_SECRET, {
                    expiresIn: '1m'
                });
                return res.json({ accessToken });
            }
        })
    } else {
        return res.status(406).json({ 
            message: respone_messages.UNAUTHORIZED 
        });
    }
};

module.exports = {
    verifyToken,
    refreshToken
}
