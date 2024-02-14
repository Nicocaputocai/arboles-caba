const express = require('express');
const App = express();
const path = require('path');
const mapRouter = require('./router/map.js')
const cors = require('cors');

App.set('views', path.join(__dirname, 'views'));
App.set("view engine", "ejs")
App.use(express.static(path.join(__dirname, 'public')))
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors());
App.get('/', mapRouter)


module.exports = App