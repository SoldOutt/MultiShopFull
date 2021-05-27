const express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
var cookieParser = require('cookie-parser')
const session = require('express-session')
const port = 3000;
const app = express();
const db = require('./config/db')
var methodOverride = require('method-override') //cho phep form gui di voi cac method  khacs nhu PUT,PATH,...
// cấu hình handlebars
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'resources/views'));
// thiết lập đường dẫn static
app.use(express.static(path.join(__dirname,'/public'))) 
const x =10
//Hỗ trợ xử lí form submit
app.use(express.urlencoded({
    extended:true
  })) // xử lí dữ liệu từ form submit dưới phương thức post( nếu k có cái này trả về undefine)
app.use(express.json())  // hỗ trợ xử lí gửi dữ liệu từ js ví dụ XMLHttp,fetch, axios,..

//Su dung methodOverride
app.use(methodOverride('_method'))

//sử dụng morgan xem các request logger
app.use(morgan('tiny'))


app.use(cookieParser())

//cai dat session
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 6000000 }// thời gian sống của 1 cookie
}));

const route = require('./routes')
route(app)
app.listen(port,()=>console.log(`Multi Shop listening at http://localhost:${port}`))
