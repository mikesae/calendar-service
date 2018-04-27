const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./api/models/list-model');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Chefdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//register the routes
const routes = require('./api/routes/routes');
routes(app);


app.listen(port);

app.use((req, res) => res.status(404).send({url: req.originalUrl + ' not found'}));

console.log(`Meals RESTful API server started on: http://localhost:${port}`);