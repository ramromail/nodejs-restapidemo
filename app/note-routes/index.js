const noteRoutes = require('./noteRoutes');

module.exports = (app, db) => {
    noteRoutes(app, db);
}