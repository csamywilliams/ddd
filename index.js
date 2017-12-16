const express = require("express");
const app = express();
//const router = express.Router();
let router = require('express').Router();

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


var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

router.get('/', function(req, res, next) {
	let siteInfo = getConfig('config.json');
	let sponsorInfo = getConfig('sponsors.json');
	//console.log(siteInfo); //used to debug and see config being sent
  res.render('pages/index', { ddd: siteInfo, sponsors: sponsorInfo });
});

module.exports = router;


router.post('/form', function(req, res) {
  console.log(req.body.fullname);
  console.log(req.body.email);
  console.log(req.body.message);
});

router.get('/:client', (req, res) => {
    let client = req.params.client;
	let siteInfo = getConfig('config.json');
	let sponsorInfo = getConfig('sponsors.json');
	//console.log(sponsorInfo);
    res.render('pages/' + client, { ddd: siteInfo, sponsors: sponsorInfo });
});
  
app.use("/", router);

app.use('*', (req, res) => {
  res.sendFile(path + "404.html");
});

app.listen(3000, () => {
  console.log("Live at Port 3000");
});

