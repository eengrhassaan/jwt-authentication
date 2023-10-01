const model = require("../models")
const sequelize = model.sequelize
const User = model.users

const bcrypt = require('bcryptjs');
const saltRounds = 10

// Register User
const registerUser = (async (req, res) => {
    console.log("CALLED: " + "/register")
    const { name, email, password } = req.body
    console.log(req.body)
    try {

        // Validate user input
        if (!(email && password && name)) {
            return res.status(400).json({
                status: 400,
                message: "All inputs are required"
            });
        }

        // Validate if user exist in our database
        const oldUser = await User.findOne({ where: { email: email }});

        // Check if user already exist
        if (oldUser) {
            return res.status(409).json({   
                    status: 409,
                    message: "User Already Exist. Please Login"
                });
        }
        
        // Password Encryption
        encryptedPassword = await bcrypt.hash(password, saltRounds);
        console.log(encryptedPassword)
        
        const result = await sequelize.transaction(async (t) => {
            const user = await User.create({
                name: name, 
                email: email, 
                password: encryptedPassword
            }, { transaction: t });
            console.log(t)
            return user;        
        });

        console.log(result.dataValues)
        return res.status(200).json({
            status: 200,
            message: `User ${result.dataValues.name} created Successfully`
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

module.exports = {
    registerUser
}