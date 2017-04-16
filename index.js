const express = require('express');
const PORT = 3000;

const server = express();


server.get('/', function(req, res){
    res.send('Hello World!');
});

server.listen(PORT, function(){
    console.log("Reddit App is running on port " + PORT);
})
