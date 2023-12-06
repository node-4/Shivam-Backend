
const express = require('express');
const route = express.Router();

route.use('/admin', require('./AdminRoutes'));
route.use('/category', require('./CategoryRoutes'));
route.use('/subCategory', require('./subcategory'));

module.exports = route
