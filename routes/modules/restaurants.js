const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/resturant-list')

router.get('/:_id/detail', (req, res) => {
    Restaurant.findById(req.params._id)
    .lean()
    .then((restaurantlist)=>{
        res.render('show',{restaurantlist})
    });
})

router.get('/:_id/edit', (req, res) => {
    Restaurant.findById(req.params._id)
    .lean()
    .then((restaurantlist)=>{
        res.render('addRestaurant',{restaurantlist})
    });
})

router.get('/add', (req, res) => {
    res.render('addRestaurant');
})

router.post('/add/submit', (req, res) => {
    return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
    return Restaurant.findById(req.params._id)
    .then(restaurantUnit => {
        Object.assign(restaurantUnit, req.body);
        return restaurantUnit.save()
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.delete('/:_id',(req,res)=>{
    return Restaurant.findById(req.params._id)
    .then(restaurantUnit => restaurantUnit.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router