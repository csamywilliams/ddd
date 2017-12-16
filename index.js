const express = require("express");
const app = express();
const router = express.Router();
const favicon = require('serve-favicon')
const path = __dirname + '/views/pages/';
const route = require('path')

const bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(favicon(route.join(__dirname, '/public/images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use('/:client', (req,res,next) => {
  next();
});

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.post('/form', function(req, res) {
  console.log(req.body.fullname);
  console.log(req.body.email);
  console.log(req.body.message);
});

router.get('/:client', (req, res) => {
    let client = req.params.client;
    res.render('pages/' + client);
});
  
app.use("/", router);

app.use('*', (req, res) => {
  res.sendFile(path + "404.html");
});

app.listen(3000, () => {
  console.log("Live at Port 3000");
});

