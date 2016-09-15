var express = require('express');
var router = express.Router();
var app = express();


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = router;
