const Sequelize = require('sequelize');


module.exports.db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    timezone: process.env.DB_TIME_ZONE || '+00:00',
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    sync: { alter: true },
    define: {
        charset: process.env.DB_CHARSET,
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    }
});

