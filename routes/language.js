var harmonyPlatform = require('../lib/harmony-platform.js').HP;

exports.findById = function (req, res) {
    var hp = new harmonyPlatform();

    hp.GetGlobalLanguageByVersionId(req.params.id, "1", req.headers.cookie, function (hpLanguage) {
        res.send(ToLanguage(hpLanguage));
    });
};

ToLanguage = function (hpLanguage) {
    var language = hpLanguage;
    // this will do the cleanup

    return language;
};