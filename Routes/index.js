
const express = require('express');
const route = express.Router();

route.use('/about', require('./aboutUs'));
route.use('/admin', require('./AdminRoutes'));
route.use('/banner', require('./BannerRoutes'));
route.use('/blog', require('./BlogRoutes'));
route.use('/category', require('./CategoryRoutes'));
route.use('/feedback', require('./feedback'));
route.use('/help', require('./helpandSupport'));
route.use('/subCategory', require('./subcategory'));
route.use('/privacy', require('./privacy'))
route.use('/terms', require('./terms'));

module.exports = route
