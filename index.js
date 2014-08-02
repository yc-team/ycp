'use strict';

//yc-core
var yc = module.exports = require('yc-core');


var fs = require('fs');
var path = require('path');

yc.require = function(){
    var name = 'yc-' + Array.prototype.slice.call(arguments, 0).join('-');

    try {
        return require('./task/' + name);
    } catch(e) {
        console.error('unable to load cmd plugin [' + name + '], message : ' + e.message);
    }
};

yc.cli = {};

yc.cli.name = 'yc';

//colors
yc.cli.colors = require('colors');


yc.cli.info = yc.file.readJSON(__dirname + '/package.json');


yc.cli.helpInfo = function() {

    var content = [];

    var taskPath = __dirname + '/task';
    fs.readdirSync(taskPath).forEach(function(filename){
        var filepath = path.join(taskPath, filename);

        var cmdInfo = require(filepath);

        if (cmdInfo && cmdInfo.name) {
        
            var name = require(filepath).name;
            name = yc.util.pad(name, 16);

            var desc = require(filepath).desc;

            content.push('    ' + name.green + '    ' + (desc || '').grey);
            content.push('');
        }


    });

    return content.join('\n');
}


yc.cli.help = function(){

    var helpInfo = yc.cli.helpInfo();

    var content = [
        '',
        '  Usage: ' + yc.cli.name.cyan + ' <command>'.green,
        '',
        '',
        '  Commands:',
        '',
        '' + helpInfo,
        '  Options:',
        '',
        '    -h, --help          output usage information'.grey,
        '',
        '    -v, --version       output the version number'.grey,
        ''
    ];

    console.log(content.join('\n'));
};

yc.cli.version = function(){
    
    var result = [
        '',
        '  v: ' + yc.cli.info.version.yellow,
        '',
        ' __' + '/\\\\\\'.bold.red + '________' + '///\\'.bold.red + '_______' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.green +'___',
        '  _' + '\\/\\\\\\'.bold.red + '______' + '///\\/'.bold.red + '______' + '/\\\\\\/////////\\\\\\'.bold.green + '_',
        '   _' + '\\/\\\\\\'.bold.red + '____' + '///\\/'.bold.red + '______' + '/\\///'.bold.green + '________' + '\\///'.bold.green + '__',
        '    _' + '\\/\\\\\\'.bold.red + '__' + '///\\/'.bold.red + '______' + '/\\/\\\\\\'.bold.green + '_______________',
        '     _' + '\\/\\\\\\'.bold.red + '///\\/'.bold.red + '_______' + '\\/\\\\\\\\\\'.bold.green + '_______________',
        '      _' + '\\/\\\\\\'.bold.red + '/\\/'.bold.red + '_________' + '\\/\\\\\\\\\\'.bold.green + '_______________',
        '       _' + '\\/\\\\\\'.bold.red + '/'.bold.red + '___________' + '\\/\\\\\\\\\\'.bold.green + '_______________',
        '        _' + '\\/\\\\\\'.bold.red + '____________' + '\\/\\\\\\\\\\'.bold.green + '_______' + '/\\\\\\'.bold.green + '____',
        '         _' + '\\/\\\\\\'.bold.red + '____________' + '\\/\\\\\\\\\\\\\\\\\\\\\\\\///'.bold.green + '_____',
        '          _' + '\\/\\\\\\'.bold.red + '____________' + '\\////////////'.bold.green + '_________',
    ];

    console.log(result.join('\n')); 
};

//yc-cmd
var commander = yc.cli.commander = require('yc-cmd');

yc.cli.run = function(arg){

        if (arg.length < 3 || arg[2] === '-h' || arg[2] === '--help') {
            yc.cli.help();
        } else if (arg[2] === '-v' || arg[2] === '--version') {
            yc.cli.version();
            return false;
        } else {

            var cmd = yc.require('cmd', arg[2]);

            cmd.register(
                commander
                    .command(cmd.name, cmd.desc)
                    .usage(cmd.usage), yc
            );

            commander.parse(arg);

        }


};