
// Importing JsonWebToken
const JWT = require('jsonwebtoken')

// Importing required items
const model = require("../models")
const sequelize = model.sequelize
const User = model.users

const config = require("dotenv").config().parsed

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
                        message: "Invalid Token, please sign-in again or use refresh token call"
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
                        message: "Courrupted User/Token"
                    })
                }
            })
        } else {
            req.user = undefined;
            return res.status(401).json({
                status: 401,
                message: "Invalid Token, please sign-in again or use refresh token call"
            })
        }
    } catch (error) {
        console.log(error)
    }
};

// Refresh Token
const refreshToken = (req, res) => {
    console.log(req.cookie)
    if (req.cookies?.jwt) {
  
        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;
  
        // Verifying refresh token
        JWT.verify(refreshToken, config.API_SECRET, 
        (err, decoded) => {
            if (err) { 
                // Wrong Refesh Token
                return res.status(406).json({ message: 'Unauthorized' });
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
        return res.status(406).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    verifyToken,
    refreshToken
}
