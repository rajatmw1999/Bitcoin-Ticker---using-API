//jshint esversion:6

const express  = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/',function(req,res){

  var crypt = req.body.crypto;
  var fia = req.body.fiat;

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypt + fia, function(err,response,body){
    var data = JSON.parse(body);
    var price = data.last;

    res.send("The " + crypt +  " price is = " + price + fia);
  });

});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
