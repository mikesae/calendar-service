const meals = require('../controllers/list-controller');

module.exports = function(app) {
    app.route('/meals')
        .get(meals.list)
        .post(meals.create);

    app.route('/meals/:id')
        .get(meals.get)
        .put(meals.update)
        .delete(meals.remove);
};