const mongoose = require('mongoose')
const ResturantList = require('../resturant-list') // 載入 resturant model
const defaultRestaurantList = require('../../restaurant.json').results;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    defaultRestaurantList.forEach(element => {
        ResturantList.create(element)
    });
    console.log('done')
})