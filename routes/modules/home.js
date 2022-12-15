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

router.post('/',(req,res)=>{
	let sortMethod;
    switch(req.body.mySelect){
        case '0' :
			sortMethod = {name_en : 'asc'};
            break;
        case '1' :
            sortMethod = {name_en : 'desc'};
            break;
        case '2' : 
        	sortMethod = {category : 'asc'};
            break;
        case '3' :
            sortMethod = {location : 'asc'};
            break;
    }
    Restaurant.find().sort(sortMethod).lean().then(
        restaurantlist =>{
            restaurantlist.mySelect = req.body.mySelect;
            res.render('index',{restaurantlist})
        }
    )
})
module.exports = router
