// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
router.use('/', home)

const restaurants = require('./modules/restaurants') 
router.use('/restaurants', restaurants)

router.get('*',(req,res)=>{
    res.status(404).render({message : '您的頁面飛到火星啦~'})
})

// 匯出路由器
module.exports = router