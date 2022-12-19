const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/resturant-list')

const sortParam = {
    '0' : {name_en : 'asc'},
    '1' : {name_en : 'desc'},
    '2' : {category : 'asc'},
    '3' : {location : 'asc'}
}

router.get('/', (req, res) => {

    Restaurant.find({})
        .lean()
        .then(restaurantlist => {
            res.render('index', { restaurantlist });
        })
        .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
    let keyword = '';
    req.query.keyword? keyword = req.query.keyword.trim() : '';
    const keywordRegExp = new RegExp(keyword, 'i');
    let sortMethod;
    if(req.query.mySelect){
        let {mySelect} = req.query;
        for(let key in sortParam){
            key === mySelect? sortMethod = sortParam[key]: '';
        }
    }

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
    })
    .sort(sortMethod)
    .lean()
    .then((restaurantlist) => {
        res.render('index', { restaurantlist })
    })
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    })
})

module.exports = router
