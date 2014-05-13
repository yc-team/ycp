exports.name = 'cp <src> <dest>';
exports.usage = '<src> <dest> [otions]';
exports.desc = 'Copy src';

exports.register = function(cmd, yc){
    var copy = yc.file.copy;

    cmd.option('-e, --encoding', 'set encoding')
       .option('-d, --dest <dest>', 'set dest')
       .action(function(src, dest){
            copy(src, dest);
       });
};