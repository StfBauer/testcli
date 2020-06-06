"use strict"

// CLI Tryout
const readline = require('readline');
const util = require('util');
const yargs = require('yargs');

const debug = util.debuglog('REPL CLI');

const events = require('events');
class _events extends events {};

const e = new _events();

const uniqueCommands = require('./cmds');

// create CLI module
const cli = {};

e.on('test1', (str) => {
    cli.responder.test1(str)
})

cli.responder = {};
cli.responder.test1 = (str) =>{
    console.log('TEST 1 Command ::', str);
}

cli.processCommand = (str) => {

    let matchFound = false;

    uniqueCommands.some((input) => {

        if (str.toLowerCase().indexOf(input) !== -1) {

            console.log('found ...');
            matchFound = true;

            e.emit(input, str);

            return true;
        }

    })

    if (!matchFound) {

        console.log('Sorry no comamnd found!!!');

    }

}

cli.init = (cmdArgs) => {

    const _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    })

    _interface.prompt();

    _interface.on('line', (str) => {

        cli.processCommand(str);
        _interface.prompt();

    })

    _interface.on('close', () => {

        console.log('\ngoodbye');
        process.exit(0);

    })

    if(cmdArgs){
        cli.processCommand(cmdArgs._.join(' '));
        process.exit(0);
    }

}

cli.init(yargs.argv);