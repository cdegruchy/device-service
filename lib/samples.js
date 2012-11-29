/*-----------------------------------------------------------------------------------------------------------------------------*/
//  These are temporarily being kept for illustation purposes
/*-----------------------------------------------------------------------------------------------------------------------------*/
HP.prototype.GetGlobalDeviceConvertingResponse = function (id, versionId, cookie, next) {
    this.PostHPIdRequest(this.globalDataPath, "GetGlobalDevice", id, versionId, cookie, function (globalDevice) {
        var device = {
            'name': globalDevice.DefaultGlobalLanguageVersionId,
            'test': 'yo'
        };

        next(device);
    });
};

HP.prototype.GetGlobalDeviceSimple = function (id, versionId, cookie, next) {
    this.PostHPIdRequest(this.globalDataPath, "GetGlobalDevice", id, versionId, cookie, next);
};

HP.prototype.GetGlobalFeaturesWrapped = function (id, versionId, cookie, next) {
    var body = JSON.stringify({ 'globalDeviceVersionIds': [{
        'IsPersisted': true,
        'Value': id,
        'VersionId': versionId
    }]
    });

    this.PostHPRequest(this.globalFeaturePath, "GetGlobalFeatures", body, cookie, next);
};

HP.prototype.GetGlobalFeatureBare = function (id, versionId, cookie, next) {
    var body = JSON.stringify([{
        'IsPersisted': true,
        'Value': id,
        'VersionId': versionId
    }]
    );

    this.PostHPRequest(this.globalFeaturePath, "GetGlobalFeatures", body, cookie, next);
};

HP.prototype.GetGlobalDevice = function (id, versionId, cookie, next) {
    var self = this;

    async.parallel({
        globalDevice: function (callback) {
            self.PostHPIdRequest(self.globalDataPath, "GetGlobalDevice", id, versionId, cookie, function (globalDevice) {
                callback(null, globalDevice);
            });
        },
        globalFeatures: function (callback) {
            var body = JSON.stringify([{
                'IsPersisted': true,
                'Value': id,
                'VersionId': versionId
            }]
            );

            self.PostHPRequest(self.globalFeaturePath, "GetGlobalFeatures", body, cookie, function (globalFeatures) {
                callback(null, globalFeatures);
            });
        }
    },
    function (err, results) {
        next(results.globalFeatures);
    });
};


app.get('/device/:id', function (req, res) {
    hpp.GetGlobalDevice(req.params.id, "1", req.headers.cookie, function (response) {
        res.send(response);
    });
});