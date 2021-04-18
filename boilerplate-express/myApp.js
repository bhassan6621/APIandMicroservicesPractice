var bodyParser = require("body-parser");
var express = require('express');
var app = express();
const mySecret = process.env['MESSAGE_STYLE']

app.use(function middleware(req,res, next) {
  var str = req.method + " " + req.path + " - " + req.ip;
  console.log(str);
  next();
});


app.use("/public", express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/:word/echo", (req,res)=> {
  var word = req.params.word;
  res.json({"echo": word})
});

app.get("/name", (req, res) => {
  var Fname = req.query.first;
  var Lname = req.query.last;
  var {first: Fname, last: Lname } = req.query;
  res.json({
    name: `${Fname} ${Lname}`
  });
});

app.get("/now", (req, res,next)=> {
  req.time = new Date().toString();
  next();
},
  (req,res) => {
    res.send({time:req.time});
  }
);

app.get("/", function(req,res){
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req,res) => {
  var jmessage = {message: "Hello json"};
  if (process.env.MESSAGE_STYLE == "uppercase") {
    jmessage.message = jmessage.message.toUpperCase();
  }
  res.json(jmessage);
});

app.post("/name", (req, res)=> {
  var str = req.body.first + " "+ req.body.last;
  res.json({name: str});
});


































 module.exports = app;
