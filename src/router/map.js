const express = require('express');
const mapController = require('../Controllers/mapController');
const Router = express.Router();

Router.get('/', mapController.map)

module.exports = Router