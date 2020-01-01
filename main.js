const chalk = require('chalk');
const yargs = require('yargs');
const file = require('./file');

yargs.version('1.1.0')





//Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note ! Rules =',
    builder:{
        title:{
            describe:'Your note\'s title',
            demandOption:true,
            type:'string',
        },
        desc:{
            describe:"Your note\'s description",
            demandOption:true,
            type:'string',
        }
    },
    handler: function (argv) {
        file.addNote(argv.title,argv.desc,()=>{
            console.log(chalk.green.bold('Notunuz başarı ile eklendi.'))
        })
        
    }
});
//Remove command
yargs.command({
    command: 'remove',
    describe: 'Removing note !',
    handler: function () {
        console.log("Removing note !");
    }
});
//list your notes
yargs.command({
    command: 'list',
    describe: 'List all notes !',
    handler: function () {
        file.listNotes()
    }
});
//read your notes from title 
yargs.command({
    command: "read",
    describe: 'Read notes !',
    builder:{
        title:{
            describe:'Read your notes from title',
            demandOption:true,
            type:'string'
        },
    },
    handler: function (argv) {
        file.readNote(argv.title)
    }
});

yargs.parse();