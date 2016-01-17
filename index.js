var through = require('through2');
var Prepro = require('prepro');

module.exports = function(options) {
    options = options || {};
    var prepro = new Prepro();
    if (options.evaluate) {
        options.evaluate.forEach(function(file) {
            prepro.evaluate(file);
        });
    }
    if (options.setup) {
        prepro.setup(options.setup);
    }
    return through.obj(function(file, encoding, callback) {
        file.contents = new Buffer(prepro.process(file.path));
        callback(null, file);
    });
};
