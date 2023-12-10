const app = require('./app');

module.exports = {
    app,
    ...require('./databases'),
    ...require('./errorHandlers'),
    ...require('./jsonResponse')
};
