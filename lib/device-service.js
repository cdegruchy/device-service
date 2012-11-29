var express = require('express');
var async = require('async');

var hp = require('./hp.js').HP;
var hpConverter = require('./hp-converter.js').HPConverter;

var app = express();
var hpp = new hp("121001156NB001.corp.logitech.com", "/GlobalDataPlatform/GlobalDataManager.svc/json/", "/UserFeaturePlatform/GlobalFeatureManager.svc/json/");
var converter = new hpConverter();

app.get('/language/:id', function (req, res) {
    hpp.GetGlobalLanguageByVersionId(req.params.id, "1", req.headers.cookie, function (response) {
        res.send(response);
    });
});

app.get('/protocol/:id', function (req, res) {
    hpp.GetIrProtocol(req.params.id, req.headers.cookie, function (response) {
        res.send(response);
    });
});

app.get('/device/:id', function (req, res) {
    async.parallel({
        globalDevice: function (callback) {
            hpp.GetGlobalDevice(req.params.id, "1", req.headers.cookie, function (globalDevice) {
                callback(null, globalDevice);
            });
        },
        globalFeatures: function (callback) {
            hpp.GetGlobalFeatures(req.params.id, "1", req.headers.cookie, function (globalFeatures) {
                callback(null, globalFeatures);
            });
        }
    },
    function (err, results) {
        res.send(converter.ToDevice(results.globalDevice, results.globalFeatures));
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

