const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
// const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
// const loginRouter = require('./routes/login');
const { sequelize } = require('./models')

const app = express();
app.set('port', process.env.PORT || 8880);

//table 바꿀려면 force: true 데이터는 날아간다
sequelize.sync({force: false})
  .then(()=>{
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.error(err);
  })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// app.use('/', loginRouter);

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/login.html'))
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/join.html'))
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/find.html'))
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'static/mainpage_html/mainpage.html')
});


app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기 중');
})