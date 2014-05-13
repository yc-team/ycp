exports.name = 'mv <src> <dest>';
exports.usage = '<src> <dest>';
exports.desc = 'Move or rename files or directories';

exports.register = function(cmd, yc){
    var copy = yc.file.copy,
    	del = yc.file.del;
    cmd.action(function(src, dest){
            copy(src, dest);
            del(src);
    });
};