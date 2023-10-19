// Importing TokensUtilization model
const model = require("../models")
const AppUserToken = model.appusertoken
const sequelize = model.sequelize

// Importing config
const config = require("dotenv").config().parsed

// Importing JsonWebToken
const JWT = require('jsonwebtoken')

// Importing messages constants
const { response_messages, errors_messages } = require('../constants/response.messages.constants');

const getTokenFromDB = async (req, res, next) => {
    try {
        // Check if token found in Authorization header
        if (req.cookies.jwt || req.headers.authorization) {
            var token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt
            if (token) {
                const isUtilized = await AppUserToken.findOne({ attributes: ["utilized"], where: { token: token }});
                //Check for Token Utilizations
                if (isUtilized) {
                    return res.status(401).json({
                        status: 401,
                        error: errors_messages.REFRESH_TOKEN_UTILIZED,
                        message: response_messages.TOKEN_UTILIZED
                    })
                }
            }
        } else {
            return res.status(401).json({
                status: 401,
                error: errors_messages.TOKEN_MISSING,
                message: response_messages.TOKEN_MISSING
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
                status: 401,
                error: errors_messages.UNKNOWN_ERROR,
                message: response_messages.UNKNOWN_ERROR,
        })     
    }
}

// Set Token in DB
const setTokenInDB = async (req, res, next) => {
    try {
        if (req.cookies.jwt || req.headers.authorization) {
            var token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt 
            if (token) {
                JWT.verify(token, config.API_SECRET, async (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            status: 401,
                            error: err.message,
                            message: response_messages.INVALID_TOKEN
                        })
                    } else {
                        const expiry = decoded.exp;
                        const result = await sequelize.transaction(async (t) => {
                            const token_transaction = await AppUserToken.create({
                                token: token,
                                appuserid: decoded.user_id,
                                utilized: true,
                                expiredon: expiry,
                                tokentype: 'refresh'
                            }, { transaction: t });
                            
                            return token_transaction;        
                        });
                        // console.log(result.dataValues)
                        next()
                    }
                })
            } else {
                res.status(401).json({
                    status: 401,
                    error: errors_messages.INVALID_TOKEN
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: 401,
            error: errors_messages.SET_TOKEN_ERROR
        })
    }
}

// Exporting modules
module.exports = {
    getTokenFromDB,
    setTokenInDB
}