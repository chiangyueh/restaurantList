const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const restaurantData = require('./restaurant.json').results;

app.engine('handlebars',exphbs({ defaultLayout : 'main'}));
app.set('view engine','handlebars');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index',{restaurantlist : restaurantData});
})

app.get('/search',(req,res)=>{
    const keyword = req.query.keyword.trim().toLowerCase();
    if(!keyword){
        return res.redirect("/");
    }
    const restaurantlist = restaurantData.filter(res=>res.name.toLowerCase().includes(keyword));
    res.render('index',{restaurantlist});
})

app.get('/restaurants/:num',(req,res)=>{
    const restaurantlist = restaurantData.find(
        res => res.id.toString() === req.params.num
        );
    res.render('show',{restaurantlist});
})
app.listen(port, () => {
    console.log(`This project is running on localhost:${port}`)
})
