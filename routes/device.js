var async = require('async');
var harmonyPlatform = require('../lib/harmony-platform.js').HP;

exports.findById = function (req, res) {
    var hp = new harmonyPlatform();

    async.parallel({
        globalDevice: function (callback) {
            hp.GetGlobalDevice(req.params.id, "1", req.headers.cookie, function (globalDevice) {
                callback(null, globalDevice);
            });
        },
        globalFeatures: function (callback) {
            hp.GetGlobalFeatures(req.params.id, "1", req.headers.cookie, function (globalFeatures) {
                callback(null, globalFeatures);
            });
        }
    },
    function (err, results) {
        res.send(ToDevice(results.globalDevice, results.globalFeatures));
    });
};

ToDevice = function (globalDevice, globalFeatures) {
    var device = {
        "Id": globalDevice.Id,
        "GlobalDeviceVersionIds": globalDevice.GlobalDeviceVersionIds,
        "DefaultGlobalLanguageVersionId": globalDevice.DefaultGlobalLanguageVersionId,
        "DeviceType": globalDevice.DeviceType,
        "EdidInformation": globalDevice.EdidInformation,
        "HdmiCecDetail": globalDevice.HdmiCecDetail,
        "HoldMinRepeats": globalDevice.HoldMinRepeats,
        "MinRepeats": globalDevice.MinRepeats,
        "HoldDelay": globalDevice.HoldDelay,
        "InterDeviceDelay": globalDevice.InterDeviceDelay,
        "InterKeyDelay": globalDevice.InterKeyDelay,
        "IsInterKeyDelayOptimized": globalDevice.IsInterKeyDelayOptimized,
        "IsMultiCode": globalDevice.IsMultiCode,
        "PrimaryManufacturerAlias": globalDevice.PrimaryManufacturerAlias,
        "PrimaryModelAlias": globalDevice.PrimaryModelAlias,
        "State": globalDevice.State,
        "VersionId": globalDevice.VersionId
    };

    globalFeatures[0].Value.forEach(function (globalFeature) {
        console.log(globalFeature);

        if (globalFeature.__type.indexOf("PowerFeature") !== -1)
            device["PowerFeature"] = globalFeature;
    });

    return device;
};