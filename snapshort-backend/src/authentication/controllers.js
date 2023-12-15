const path = require('path');
const models = require('./models');
const { asyncErrorHandler, AppError } = require(path.resolve(__dirname, './../snapshort-backend/errorHandlers'));


const getUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await models.User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
    res.jsonResponse(users, 200);
});


const getUser = asyncErrorHandler(async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            id: req.params.userId
        },
        attributes: {
            exclude: ['password']
        }
    });
    res.jsonResponse(user, 200);
});


const createUser = asyncErrorHandler(async (req, res, next) => {
    const user = await models.User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, {
        returning: true,
        attributes: {
            exclude: ['password']
        }
    });
    res.jsonResponse(user, 201);
});


const updateUser = asyncErrorHandler(async (req, res, next) => {
    const user = await models.User.update({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, {
        where: {
            id: req.params.userId
        },
        individualHooks: true,
        returning: true
    });
    if (user[0] === 0) 
        return next(new AppError('Not found', 404));
    res.jsonResponse(user[1], 200);
});


const partialUpdateUser = asyncErrorHandler(async (req, res, next) => {
    let user = await models.User.update({
        ...req.body
    }, {
        where: {
            id: req.params.userId
        },
        individualHooks: true,
        returning: true
    });
    if (user[0] === 0) 
        return next(new AppError('Not found', 404));
    res.jsonResponse(user[1], 200);
});


const destroyUser = asyncErrorHandler(async (req, res, next) => {
    const isDeleted = await models.User.destroy({
        where: {
            id: req.params.userId
        }
    });
    if (!isDeleted)
        return next(new AppError('Not found', 404));
    res.jsonResponse(null, 204);
});


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    partialUpdateUser,
    destroyUser
};
