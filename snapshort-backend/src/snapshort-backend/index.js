const app = require('./app');

module.exports = {
    app,
    ...require('./config'),
    ...require('./errorHandlers'),
    ...require('./jsonResponse')
};
