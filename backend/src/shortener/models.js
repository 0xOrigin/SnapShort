const { Sequelize, Model, DataTypes } = require('sequelize');
const { db } = require('../config/databases');
const shortid = require('shortid');


class Url extends Model {}

Url.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notNull: true,
        notEmpty: true,
      },
    },
    urlCode: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate,
      unique: true,
      allowNull: false,
    },
    clicks: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Url',
    paranoid: true,
  },
);

Url.belongsTo(db.models.User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});

db.models.User.hasMany(Url, {
  foreignKey: 'userId',
  as: 'urls',
});


module.exports = {
  Url,
};
