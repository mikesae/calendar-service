const mongoose = require('mongoose');
const Meals = mongoose.model('Meals');

exports.list = (request, response) => {
    Meals.find({}, (error, task) => {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

exports.create = (request, response) => {
    const newTask = new Meals(request.body);
    newTask.save((error, task) => {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

exports.get = (request, response) => {
    Meals.findById(request.params.id, (error, task) => {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

exports.update = (request, response) => {
    Meals.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (error, task) => {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

exports.remove = (request, response) => {
    Meals.remove({
        _id: request.params.id
    }, function (error) {
        if (error) {
            response.send(error);
        }
        response.json({message: 'Task successfully deleted'});
    });
};