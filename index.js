var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/pages/';

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function(req,res){
  //res.sendFile(path + "index.html");
  res.render('pages/index');
});
  
router.get("/about", function(req,res){
  res.render('pages/about');
});

router.get("/sponsors", function(req,res){
  res.render('pages/sponsors');
});

router.get("/code-of-conduct", function(req,res){
  res.render('pages/code-of-conduct');
});

router.get("/contact", function(req,res){
  res.render('pages/contact');
});
  
  
app.use("/", router);

app.use("*", function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000, function(){
  console.log("Live at Port 3000");
});