var express = require('express');
var async = require('async');
var device = require('./routes/device.js');
var language = require('./routes/language.js');
var protocol = require('./routes/protocol.js');

var app = express();

app.get('/language/:id', language.findById);
app.get('/protocol/:id', protocol.findById);
app.get('/device/:id', device.findById);

// handling errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.listen(3000);
console.log('Listening on port 3000');