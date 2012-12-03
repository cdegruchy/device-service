var harmonyPlatform = require('../lib/harmony-platform.js').HP;

exports.findById = function (req, res) {
    var hp = new harmonyPlatform();

    hp.GetIrProtocol(req.params.id, req.headers.cookie, function (hpProtocol) {
        res.send(ToProtocol(hpProtocol));
    });
};

ToProtocol = function (hpProtocol) {
    var protocol = hpProtocol;
    // this will do the cleanup

    return protocol;
};