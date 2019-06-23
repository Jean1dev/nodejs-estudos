let express = require(`express`)
  , load = require(`express-load`)
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , error = require('./middlewares/error')
  , app = express()
  , server = require(`http`).createServer(app)
  , io = require(`socket.io`).listen(server)
  , config = require(`./config.json`)
  , cookie = cookieParser(config.SECRET)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(cookie)
app.use(expressSession({
  secret: config.SECRET,
  name: config.KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))

io.set(`authorization`, (data, accept) => {
  cookie(data, {}, (err) => {
    let sessionID = data.signedCookies[config.KEY]
    //continuar
  })
})

load(`models`)
  .then(`controllers`)
  .then(`routes`)
  .into(app)
  
load(`sockets`).into(io)

app.use(error.notFound)
app.use(error.serverError)

app.listen(3000, () => {
  console.log(`ntalk no ar porta 3000`)
})