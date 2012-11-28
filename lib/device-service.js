var express = require('express');
var hp = require('./hp.js').HP;

var app = express();
var hpp = new hp();

app.get('/language/:id', function (req, res) {
    hpp.GetGlobalLanguageByVersionId(req.params.id, "1", req.headers.cookie, function (chunk) {
        res.send(chunk);
    });
});

app.get('/protocol/:id', function (req, res) {
    hpp.GetIrProtocol(req.params.id, req.headers.cookie, function (chunk) {
        res.send(chunk);
    });
});

app.get('/device/:id', function (req, res) {
    hpp.GetGlobalDevice(req.params.id, "1", req.headers.cookie, function (chunk) {
        res.send(chunk);
    });
});

app.get('/ping', function (req, res) {
    res.send('Hello World');
});

// handling errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.listen(3000);
console.log('Listening on port 3000');

