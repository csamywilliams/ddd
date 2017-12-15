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
  res.render('pages/index');
});

router.get('/:client', (req, res) => {
    var client = req.params.client;
    res.render('pages/' + client);
});
  
app.use("/", router);

app.use("*", function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000, function(){
  console.log("Live at Port 3000");
});