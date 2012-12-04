var harmonyPlatform = require('../lib/harmony-platform.js').HP;

exports.findById = function (req, res) {
    var hp = new harmonyPlatform();

    hp.GetGlobalLanguageByVersionId(req.params.id, "1", req.headers.cookie, function (hpLanguage) {
        res.send(toLanguage(hpLanguage));
    });
};

function toLanguage(hpLanguage) {
    var language = {
        "Elements": new Array(),
        "MinRepeats": hpLanguage.MinRepeats,
        "Id": hpLanguage.VersionId
    };

    hpLanguage.GlobalLanguageElements.forEach(function (element) {
        delete element.KeyCode.AbstractProtocol;
        element.KeyCode.ProtocolId = element.KeyCode.AbstractProtocolId;
        delete element.KeyCode.AbstractProtocolId;

        var newElement = {
            "Name": element.Name,
            "KeyCode": element.KeyCode
        };

        if (element.GlobalLanguageElementFunction != null) {
            newElement["Function"] = {
                "Name": element.GlobalLanguageElementFunction.Name,
                "GroupName": element.GlobalLanguageElementFunction.GlobalLanguageElementFunctionGroup.Name
            };
        };

        language.Elements.push(newElement);
    });

    return language;
};