// const redis = require('redis');
// const redisClient = redis.createClient();

const Redis = require('ioredis');

var redisClient

// Importing JsonWebToken
const JWT = require('jsonwebtoken')

// Importing App configs
const app_configs = require('../config/app.config.js');
const { respone_messages, errors_messages } = require('../constants/response.messages.constants');

// Intialize Redis Client
function initRedisClient() {
    try {
        redisClient = new Redis({
            host: '127.0.0.1',
            port: 6379
        });  
    } catch(error) {
        console.log("ERROR")
    }
}

// Get Value From Redis Using Key
async function getValueFormKeyRedis (key) {
    const value_in_cache = await redisClient.get(key)
    // console.log("========== KEY ==============")
    // console.log(value_in_cache)
    // console.log("========== KEY ==============")

    return value_in_cache
}

// Get Token from Redis Cache
const getTokenFromCache = async (req, res, next) => {
    try {
        initRedisClient()
        var token_status = ''

        // Check for any token in authorization header
        if (req.headers.authorization) {
            const auth_token = req.headers.authorization.split(" ")[1]
            token_status = await getValueFormKeyRedis(app_configs.prefix_blacklist + auth_token)
            
            if (token_status == auth_token) {
                return res.status(401).json({
                    status: 401,
                    error: errors_messages.REFRESH_TOKEN_UTILIZED,
                    message: respone_messages.REFRESH_TOKEN_UTILIZED
                })
            }
        }

        // Check for token in cookies
        if (req.cookies.jwt) {
            const auth_token = req.cookies.jwt
            token_status = await getValueFormKeyRedis(app_configs.prefix_blacklist + auth_token)

            if (token_status == auth_token) {
                return res.status(401).json({
                    status: 401,
                    error: errors_messages.REFRESH_TOKEN_UTILIZED,
                    message: respone_messages.REFRESH_TOKEN_UTILIZED
                })
            }
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
                status: 401,
                error: errors_messages.UNKNOWN_ERROR,
                message: respone_messages.UNKNOWN_ERROR,
        })     
    }
}

// Set Token in Redis Cache
const setTokenInCache = async(req, res, next) => {
    try {
        initRedisClient()
        var black_listed_token = []

        // Add Access token to black list
        
        // Check for token authorization headers
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
            redisClient.expireat(app_configs.prefix_blacklist + item.auth_token, item.auth_token_expiry);
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