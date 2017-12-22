const express = require("express");
const app = express();
let router = require('express').Router();
global.dddwales = {};

const favicon = require('serve-favicon');
const path = __dirname + '/views/pages/';
const route = require('path');

const mail = require('./mail');
const bodyParser = require('body-parser');

const dbconn = require('./connect');
const contact = require('./contactform');

const sponsors = dbconn.getSponsors();

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

function getSiteInfo() {
    dddwales['siteInfo'] = getConfig('config.json');
}

router.get('/', function(req, res, next) {

    getSiteInfo();
     res.render('pages/index', { ddd: dddwales.siteInfo, sponsors: dddwales.sponsors });
});

module.exports = router;


router.post('/form', function(req, res) {
    getSiteInfo();

    mail.sendMail(req.body, res, { ddd: dddwales.siteInfo, sponsors: dddwales.sponsors });
});

router.get('/sponsors', (req, res) => {
    let client = req.params.client;

    getSiteInfo();

    res.render('pages/sponsors', { ddd: dddwales.siteInfo, sponsors: dddwales.sponsors });
});

router.get('/:client', (req, res) => {
    let client = req.params.client;
    
    getSiteInfo();

    res.render('pages/' + client, { ddd: dddwales.siteInfo, sponsors: dddwales.sponsors});
});
  
app.use("/", router);

app.use((err, req, res, next) => {
    getSiteInfo();
    res.render('pages/404', { ddd: dddwales.siteInfo});
});

app.listen(3000, () => {
  console.log("Live at Port 3000");
});

