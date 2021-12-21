const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const path = require('path');
const handlebars = require('express-handlebars')
const hbs = handlebars.create({ /* config */ });
const route = require('./app/routes/index.route.js')

// db connect
const db = require('./config/db/index.js')
db.connect();
// method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// use express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')
// http logger
app.use(morgan('combined'))
// path
app.set('views',path.join(__dirname,'resources/views'))
// Cấu hình sử dụng file tĩnh
app.use(express.static(path.join(__dirname,'public')))
// GET DATA FROM REQ.BODY
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
route(app);







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})