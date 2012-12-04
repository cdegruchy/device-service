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
        res.send(toDevice(results.globalDevice, results.globalFeatures));
    });
};

function toDevice(globalDevice, globalFeatures) {
    var device = {
        "GlobalDeviceId": globalDevice.Id,
        "DefaultGlobalLanguageVersionId": globalDevice.DefaultGlobalLanguageVersionId,
        "DeviceType": globalDevice.DeviceType,
        "IsMultiCode": globalDevice.IsMultiCode,
        "Id": globalDevice.VersionId
    };

    globalFeatures[0].Value.forEach(function (globalFeature) {
        if (globalFeature.__type.indexOf("PowerFeature") !== -1) {
            var feature = {
                "__type": "PowerFeature",
                "DefaultPowerOnDelay": globalFeature.DefaultPowerOnDelay,
                "HasAdditionalActions": globalFeature.HasAdditionalActions,
                "IsPowerAlwaysOn": globalFeature.IsPowerAlwaysOn,
                "PowerOnDelay": globalFeature.PowerOnDelay,
                "PowerOffActions": globalFeature.PowerOffActions != null ? cleanupActionList(globalFeature.PowerOffActions) : null,
                "PowerOnActions": globalFeature.PowerOnActions != null ? cleanupActionList(globalFeature.PowerOnActions) : null,
                "PowerOnResetActions": globalFeature.PowerOnResetActions != null ? cleanupActionList(globalFeature.PowerOnResetActions) : null,
                "PowerToggleActions": globalFeature.PowerToggleActions != null ? cleanupActionList(globalFeature.PowerToggleActions) : null,
                "PowerTypeId": globalFeature.PowerTypeId
            };

            device["PowerFeature"] = feature;
        };
    });

    return device;
};

function cleanupActionList(actions) {
    actions.sort(compareOrder);

    actions.forEach(function (action) {
        delete action.ActionId;
        delete action.Order;
        action["__type"] = action["__type"].split(":#")[0];
    });

    return actions;
};

function compareOrder(a,b) {
  if (a.Order < b.Order)
     return -1;
  if (a.Order > b.Order)
    return 1;
  return 0;
}