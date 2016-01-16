var through = require('through2');
var prepro = require('prepro');

module.exports = function(options) {
    options = options || {};
    if (options.evaluate) {
        options.evaluate.forEach(function(file) {
            prepro.evaluate(file);
        });
    }
    if (options.execute) {
        prepro.execute(options.execute);
    }
    return through.obj(function(file, encoding, callback) {
        file.contents = new Buffer(prepro.process(file.path));
        callback(null, file);
    });
};
