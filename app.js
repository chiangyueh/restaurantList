const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const methodOverride = require('method-override') 
const routes = require('./routes')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(routes)




app.listen(port, () => {
    console.log(`This project is now running on localhost:${port}`)
})