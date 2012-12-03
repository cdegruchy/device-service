var http = require('http');

function HP() {
    // eventually this will handle multiple environments
    this.host = "121001156NB001.corp.logitech.com";
    this.globalDataPath = "/GlobalDataPlatform/GlobalDataManager.svc/json/";
    this.globalFeaturePath = "/UserFeaturePlatform/GlobalFeatureManager.svc/json/";

    this.PostHPRequest = function (servicePath, operation, body, cookie, next) {
        var options = {
            port: 80,
            hostname: this.host,
            path: servicePath + operation,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length,
                'Cookie': cookie
            }
        };

        var request = http.request(options);
        request.on('response', function (response) {
            var data = '';

            response.on("data", function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                next(JSON.parse(data));
            });
        });

        request.write(body);
        request.end();
    };

    this.PostHPIdRequest = function (servicePath, operation, id, versionId, cookie, next) {
        var body = JSON.stringify({
            'IsPersisted': true,
            'Value': id,
            'VersionId': versionId
        });

        this.PostHPRequest(servicePath, operation, body, cookie, next);
    };
};

HP.prototype.GetGlobalLanguageByVersionId = function (id, versionId, cookie, next) {
    this.PostHPIdRequest(this.globalDataPath, "GetGlobalLanguageByVersionId", id, versionId, cookie, next);
};

HP.prototype.GetIrProtocol = function (id, cookie, next) {
    this.PostHPIdRequest(this.globalDataPath, "GetIrProtocol", id, null, cookie, next);
};

HP.prototype.GetGlobalDevice = function (id, versionId, cookie, next) {
    this.PostHPIdRequest(this.globalDataPath, "GetGlobalDevice", id, versionId, cookie, next);
};

HP.prototype.GetGlobalFeatures = function (id, versionId, cookie, next) {
    var body = JSON.stringify([{
        'IsPersisted': true,
        'Value': id,
        'VersionId': versionId
    }]);

    this.PostHPRequest(this.globalFeaturePath, "GetGlobalFeatures", body, cookie, next);
};

exports.HP = HP;



