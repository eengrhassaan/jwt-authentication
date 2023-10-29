const models = require('./models/index.js'); //By default load index.js inside /app/models

console.log(models)
const init_BDD = async () => {
    // try {
    //     await models.sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //     const created =  models.sequelize.sync({force: true});

    //     if(created) {
    //         console.log("==> TABLE DONE !");
    //     }

    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }
}

init_BDD();