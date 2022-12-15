const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const restaurantData = require('./restaurant.json').results;
const methodOverride = require('method-override') 
const mongoose = require('mongoose') // 載入 mongoose
const ResturantList = require('./models/resturant-list')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })// 設定連線到 mongoDB


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})


app.get('/', async (req, res) => {
    ResturantList.find({})
    .lean()
    .then(restaurantlist=>{
        res.render('index',{restaurantlist});
    })
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase();
    if (!keyword) {
        return res.redirect("/");
    }
    const restaurantlist = restaurantData.filter(res => res.name.toLowerCase().includes(keyword));
    res.render('index', { restaurantlist });
})

app.get('/restaurants/:_id/detail', (req, res) => {
    ResturantList.findById(req.params._id)
    .lean()
    .then((data)=>{
        res.render('show',{restaurantlist : data})
    });
})

app.get('/restaurants/:_id/edit', (req, res) => {
    ResturantList.findById(req.params._id)
    .lean()
    .then((data)=>{
        res.render('addRestaurant',{restaurantlist : data})
    });
})

app.get('/restaurant/add', (req, res) => {
    res.render('addRestaurant');
})

app.post('/restaurant/add/submit', (req, res) => {
    return ResturantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.put('/restaurant/:_id', (req, res) => {
    // console.log(req.body)
    const {name, name_en, id, category, image, location, phone, 
        google_map, rating, description} = req.body;
    return ResturantList.findById(req.params._id)
    .then(restaurantUnit => {
        restaurantUnit.name = name;
        restaurantUnit.name_en = name_en;
        restaurantUnit.id = id;
        restaurantUnit.category = category;
        restaurantUnit.image = image;
        restaurantUnit.location =location;
        restaurantUnit.phone = phone;
        restaurantUnit.google_map = google_map;
        restaurantUnit.rating = rating;
        restaurantUnit.description = description;
        return restaurantUnit.save()
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.delete('/restaurants/:_id',(req,res)=>{
    return ResturantList.findById(req.params._id)
    .then(restaurantUnit => restaurantUnit.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`This project is running on localhost:${port}`)
})
