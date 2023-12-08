const sequelize = require('sequelize');
const shortid = require('shortid');
const { db } = require('../../snapshort-backend/config');


module.exports.Url = db.define('Url', {
    id: {
        type: sequelize.UUIDV4,
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
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['urlCode']
        }
    ]
});
