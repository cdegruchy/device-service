function HPConverter() {
};

HPConverter.prototype.ToDevice = function (globalDevice, globalFeatures) {
    var device = globalDevice;
    device["Features"] = globalFeatures[0].Value;

    return device;
};

exports.HPConverter = HPConverter;