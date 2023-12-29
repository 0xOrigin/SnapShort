const sequelize = require('sequelize');
const shortid = require('shortid');
const { User } = require('../authentication/models');
const { db } = require('../config/databases');


const Url = db.define('Url', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: sequelize.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: true
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
        },
        {
            fields: ['userId']
        }
    ],
});

Url.sync({ alter: true }).then(() => {
    console.log('Url table created');
}).catch((error) => {
    console.log(error);
});

module.exports.Url = Url;
