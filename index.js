const express = require("express");
const app = express();
const router = express.Router();
const path = __dirname + '/views/pages/';

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//router.use(function (req,res,next) {
router.use('/:client', (req,res,next) => {
  console.log("/" + req.method);
  next();
});

router.get('/', (req, res) => {
  res.render('pages/index');
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
