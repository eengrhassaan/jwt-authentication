// Importing required items
const model = require("../models")
const sequelize = model.sequelize
const User = model.users

const config = require('dotenv').config().parsed;

const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const saltRounds = 10

const response_messages = require("../constants/response.messages.constants.js").respone_messages
const error_messages = require("../constants/response.messages.constants.js").errors_messages


// Login User Function
const loginUser = (async (req, res) => {
    const { email, password } = req.body
    try {
        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({
                status: 400,
                error: error_messages.INPUT_FIELDS_MISSING,
                message: response_messages.INPUT_FIELDS_REQUIRED
            });
        }

        // Validate if user exist in our database
        const user = await User.findOne({ where: { email: email }});
        
        // if user found then check for email
        if (user) {
            if (email && (await bcrypt.compare(password, user.password))) {
            
                // Create token
                const token = jwt.sign({ 
                    user_id: user.id, 
                    email: user.email,
                    first_name: user.first_name
                    },
                    config.API_SECRET,
                    { expiresIn: "1m", }
                );

                // Creating Refresh Token and send it in cookie
                const refreshToken = jwt.sign({
                    user_id: user.id, 
                    email: user.email,
                    first_name: user.first_name
                },
                config.API_SECRET, 
                { expiresIn: '1d'});
          
                // Assigning refresh token in http-only cookie 
                res.cookie('jwt', refreshToken, { httpOnly: true, 
                    sameSite: 'None', secure: true, 
                    maxAge: 24 * 60 * 60 * 1000 });
                
                // Return user with authToken
                return res.status(200).json({
                    status: 200,
                    user: user.name,
                    authToken: token,
                    refreshToken : refreshToken
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: error_messages.INVALID_CREDS,
                    message: response_messages.INVALID_CREDENTIALS
                });
            }    
        } else {
            return res.status(400).json({
                status: 400,
                error: error_messages.USER_NOT_FOUND,
                message: response_messages.USER_NOT_FOUND
            });
        }

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            error: error,
            message: response_messages.INTERNAL_SERVER_ERROR
        });
    }
})


// Exporting Router
module.exports = {
    loginUser
}