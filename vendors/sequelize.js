const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Object with Sequelize and sequelize instances (Singleton)
let db = {
    Sequelize: null,
    sequelize: null,
}

// Object with domain/model loaded
let models = {};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: false,
  pool: {
    max: 20,
    min: 0
  },

  // SQLite only
  storage: 'database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

/**
 * Load models in 'model' folder
 */
fs.readdirSync('./model/').forEach((filename) => {
    // Prevent Mac OS .DS_Store filesystem issue
    if (file != '.DS_Store') {
        var model = {};
        model.path = 'model/' + filename;
        model.name = filename.replace(/\.[^/.]+$/, "");
        model = sequelize.import(model.path);
        //model.service = epilogue.resource({model: model.resource});
        models[model.name] = model;	
    }
});

sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
    // Sincronizamos los esquemas
    sequelize.sync({ force: false }).then(() => {
    }).catch(function(err) {
        logger.log('error', 'ERROR creando tablas: ' + err);
    });
}).catch((err) => {
    logger.error('Unable to connect to the database:', err.message);
});

// Load Sequelize and sequelize on db Object
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = models;

// Exports db object
module.exports = db;