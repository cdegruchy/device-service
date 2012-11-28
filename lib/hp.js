var querystring = require('querystring');
var http = require('http');

function HP() {
    // maybe this is the right place to encapsulate the environment?
    this.host = "121001156NB001.corp.logitech.com";
    this.baseUrl = "/GlobalDataPlatform/GlobalDataManager.svc/json/";

    this.PostHPRequest = function (operation, id, versionId, cookie, next) {
        var body = JSON.stringify({
            'IsPersisted': true,
            'Value': id,
            'VersionId': versionId
        });

        var options = {
            port: 80,
            hostname: this.host,
            path: this.baseUrl + operation,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length,
                'Cookie': cookie
            }
        };

        var request = http.request(options);
        request.on('response', function (response) {
            response.on('data', next);
        });

        request.write(body);
        request.end();
    };
};

HP.prototype.GetGlobalLanguageByVersionId = function (id, versionId, cookie, next) {
    this.PostHPRequest("GetGlobalLanguageByVersionId", id, versionId, cookie, next);
};

HP.prototype.GetIrProtocol = function (id, cookie, next) {
    this.PostHPRequest("GetIrProtocol", id, null, cookie, next);
};

HP.prototype.GetGlobalDevice = function (id, versionId, cookie, next) {
    this.PostHPRequest("GetGlobalDevice", id, versionId, cookie, next);
};

exports.HP = HP;

