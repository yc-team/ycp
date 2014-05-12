exports.name = 'rm <dest>';
exports.usage = '<dest>';
exports.desc = 'Remove files from dest';

exports.register = function(cmd, yc){
    var del = yc.file.del;
    cmd.action(function(dest){
            del(dest);
       });
};