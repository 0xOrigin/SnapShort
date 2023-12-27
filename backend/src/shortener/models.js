const path = require('path');
const sequelize = require('sequelize');
const shortid = require('shortid');
const { db } = require(path.resolve(__dirname, './../config/databases'));


const Url = db.define('Url', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    url: {
        type: sequelize.STRING,
        allowNull: false,
        validator: {
            isUrl: true
        }
    },
    urlCode: {
        type: sequelize.STRING,
        defaultValue: shortid.generate,
        unique: true,
        allowNull: false
    },
    clicks: {
        type: sequelize.BIGINT,
        defaultValue: 0
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: sequelize.DATE,
        allowNull: true
    },
    deletedAt: {
        type: sequelize.DATE,
        allowNull: true
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['urlCode']
        }
    ],
});

Url.sync({ alter: true }).then(() => {
    console.log('Url table created');
}).catch((error) => {
    console.log(error);
});

module.exports.Url = Url;
