const express = require('express');//獲取應用程式伺服器
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');//獲取樣板引擎
const methodOverride = require('method-override') //實現語意化路由
const routes = require('./routes');
const timeout = require('connect-timeout');
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));//新增一個樣板引擎
app.set('view engine', 'handlebars')//告訴express使用哪個樣板引擎
app.use(express.urlencoded({ extended : true}));//body-parser，使express可以接收post傳來的數據 req.body 或express.json()
app.use(express.static('public'));//使用public中的靜態文件
app.use(methodOverride('_method'))//使用methodoverride標示為?後的_method=PUT...
app.use(routes)

app.use(timeout('5s'));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
  console.log(123)
}


app.listen(port, () => {
    console.log(`This project is now running on localhost:${port}`)
})