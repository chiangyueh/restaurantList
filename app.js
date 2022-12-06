const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json')
app.engine('handlebars',exphbs({ defaultLayout : 'main'}));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    const restaurantlist = restaurantList.results;
    res.render('index',{restaurantlist});
})

app.get('/search',(req,res)=>{
    const keyword = req.query.keyword;
    const restaurantlist = restaurantList.results.filter(res=>{
        return res.name.toLowerCase().includes(keyword.toLowerCase())
    });
    res.render('index',{restaurantlist});
})

app.get('/restaurants/:num',(req,res)=>{
    const restaurantlist = restaurantList.results.find(
        res => res.id.toString() === req.params.num
        );
    res.render('show',{restaurantlist});
})
app.listen(port, () => {
    console.log(`This project is running on localhost:${port}`)
})
