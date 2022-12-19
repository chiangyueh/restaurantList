const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/resturant-list')

router.get('/:_id/detail', (req, res) => {
    Restaurant.findById(req.params._id)
    .lean()
    .then((restaurantlist)=>{
        res.render('show',{restaurantlist})
    })
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    });
})

router.get('/:_id/edit', (req, res) => {
    Restaurant.findById(req.params._id)
    .lean()
    .then((restaurantlist)=>{
        res.render('addRestaurant',{restaurantlist})
    })
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    });
})

router.get('/add', (req, res) => {
    res.render('addRestaurant');
})

router.post('/add', (req, res) => {
    return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    })
})

router.put('/:_id', (req, res) => {
    return Restaurant.findById(req.params._id)
    .then(restaurantUnit => {
        Object.assign(restaurantUnit, req.body);
        return restaurantUnit.save()
    })
    .then(()=>{
        res.redirect(`/restaurants/${req.params._id}/edit`)
    })
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    })
})

router.delete('/:_id',(req,res)=>{
    return Restaurant.findById(req.params._id)
    .then(restaurantUnit => restaurantUnit.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
        console.log(error);
        res.status(404).render('errorPage')
    })
})

module.exports = router