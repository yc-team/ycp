exports.name = 'mkdir <dest>';
exports.usage = '<dest>';
exports.desc = 'Make a new directory';

exports.register = function(cmd, yc){
    var mkdir = yc.file.mkdir;
    cmd.action(function(dest){
            mkdir(dest);
       });
};