const model = require("../models")
const sequelize = model.sequelize
const User = model.users

const bcrypt = require('bcryptjs');
const saltRounds = 10

const response_messages = require('../constants/response.messages.constants.js').response_messages

// Register User
const registerUser = (async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    console.log(req.body)
    try {

        // Validate user input
        if (!(email && password && first_name)) {
            return res.status(400).json({
                status: 400,
                message: response_messages.USER_REGISTER_INPUT
            });
        }

        // Validate if user exist in our database
        const oldUser = await User.findOne({ where: { email: email }});

        // Check if user already exist
        if (oldUser) {
            return res.status(409).json({   
                    status: 409,
                    message: response_messages.USER_ALREADY_EXISTED
                });
        }
        
        // Password Encryption
        encryptedPassword = await bcrypt.hash(password, saltRounds);
        console.log(encryptedPassword)
        
        const result = await sequelize.transaction(async (t) => {
            const user = await User.create({
                first_name: first_name,
                last_name: last_name, 
                email: email,
                password: encryptedPassword
            }, { transaction: t });
            console.log(t)
            return user;        
        });

        console.log(result.dataValues)
        return res.status(200).json({
            status: 200,
            message: response_messages.USER_CREATED,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

module.exports = {
    registerUser
}