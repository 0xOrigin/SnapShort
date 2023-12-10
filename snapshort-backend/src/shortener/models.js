const path = require('path');
const sequelize = require('sequelize');
const shortid = require('shortid');
const { db } = require(path.resolve(__dirname, '../snapshort-backend'));


module.exports.Url = db.define('Url', {
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
        allowNull: true,
        defaultValue: new Date()
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
