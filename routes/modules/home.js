const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/resturant-list')

router.get('/', (req, res) => {
    Restaurant.find({})
        .lean()
        .then(restaurantlist => {
            res.render('index', { restaurantlist });
        })
        .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim();
    const keywordRegExp = new RegExp(keyword, 'i');
    Restaurant.find({
        $or: [{
            name: {
                $regex: keywordRegExp
            }
        }, {
            category: {
                $regex: keywordRegExp
            }
        }]
    }).lean().then((restaurantlist) => {
        res.render('index', { restaurantlist })
    })
})
module.exports = router
