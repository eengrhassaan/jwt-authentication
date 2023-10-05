const redis = require('redis');
const redisClient = redis.createClient();

// Importing JsonWebToken
const JWT = require('jsonwebtoken')

// Importing App configs
const app_configs = require('../config/app.config.js');
const { respone_messages } = require('../constants/response.messages.constants');

function initRedisClient() {
    redisClient.on('connect', function() {
        try {
            console.log('Connected!');
            next();
        } catch(error) {
            console.log("ERROR")
        }
    });
}


const getTokenFromCache = async(req, res, next) => {
    try {
        initRedisClient()
        await redisClient.set(app_configs.prefix_blacklist, '2','EX', 60 * 60 * 24);

        console.log(redisClient.get(app_configs.prefix_blacklist))
        if (req.headers.authorization) {
            const auth_token = req.headers.authorization.split(" ")[1]
            const token_status = await redisClient.GET(app_configs.prefix_blacklist + auth_token);
    
            if (token_status) {
                return res.status(401).json({
                    status: 401,
                    message: respone_messages.REFRESH_TOKEN_UTILIZED
                })
            } 
        }

        if (req.cookies.jwt) {
            token_status = await redisClient.GET(app_configs.prefix_blacklist + req.cookies.jwt + 'test')

            if (token_status) {
                return res.status(401).json({
                    status: 401,
                    message: respone_messages.REFRESH_TOKEN_UTILIZED
                })
            } 
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
                status: 401,
                message: respone_messages.REFRESH_TOKEN_UTILIZED,
                error: error
        })     
    }
}

const setTokenInCache = async(req, res, next) => {
    try {
        initRedisClient()
        var black_listed_token = []
        // Add Access token to black list
        if (req.headers && req.headers.authorization) {
            const auth_token =  req.headers.authorization.split(" ")[1]
            black_listed_token.push({
                auth_token: auth_token,
                auth_token_expiry: JWT.decode(auth_token).exp
            })
        }

        // Add refresh token to Blacklist if enabled in app.configs and based on refresh call
        if (app_configs.enable_refresh_token_expiry && req.cookies.jwt) {
            const auth_token = req.cookies.jwt;
            black_listed_token.push({
                auth_token: auth_token,
                auth_token_expiry: JWT.decode(auth_token).exp
            })
        }

        black_listed_token.forEach(async (item)=> {
            redisClient.set(app_configs.prefix_blacklist + item.auth_token, item.auth_token);
            redisClient.expireAt(app_configs.prefix_blacklist + item.auth_token, item.auth_token_expiry);
        })
        next()
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error,
            message: respone_messages.INTERNAL_SERVER_ERROR
        })
    }
}
module.exports = {
    setTokenInCache,
    getTokenFromCache
}