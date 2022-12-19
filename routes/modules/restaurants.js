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
        res.status(410).render('errorPage',{message : '該筆資料不存在或已被刪除'})
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
        res.status(410).render('errorPage',{message : '該筆資料不存在或已被刪除'})
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
        res.status(500).render('errorPage',{message : '哎呀！您的操作出錯了～'})
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
        res.status(500).render('errorPage',{message : '修改失敗，請聯繫管理員'})
    })
})

router.delete('/:_id',(req,res)=>{
    return Restaurant.findById(req.params._id)
    .then(restaurantUnit => restaurantUnit.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
        console.log(error);
        res.status(410).render('errorPage',{message : '該筆資料已被刪除'})
    })
})

module.exports = router