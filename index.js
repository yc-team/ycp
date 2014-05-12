'use strict';

//yc-core
var yc = module.exports = require('yc-core');

yc.require = function(){
    var name = 'yc-' + Array.prototype.slice.call(arguments, 0).join('-');

    try {
        return require(name);
    } catch(e) {
        console.error('unable to load cmd plugin [' + name + '], message : ' + e.message);
    }
};

yc.cli = {};

yc.cli.name = 'yc';

//colors
yc.cli.colors = require('colors');


yc.cli.version = function(){
    
    var result = [
        '',
        '  v :',
        '',
        ' ' 
    ];

    console.log(result.join('\n')); 
};

//yc-cmd
var commander = yc.cli.commander = require('yc-cmd');

yc.cli.run = function(arg){
    
    if (arg.length < 3 || (arg.length === 3 && arg[2] === '-h') || (arg.length === 3 && arg[2] === '--help')) {
        yc.cli.help();
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