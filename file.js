const fs = require('fs');
const chalk = require('chalk')

const addNote = function(title,desc,callback){
    const notes = loadNotes();

    notes.push({
        title:title,
        desc:desc
    })

    saveNotes(notes,callback)
}

const saveNotes = function(notes,callback){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
    callback();


}
const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

const listNotes = function(){
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(chalk.red.bold('Baslik : ')+element.title)
        console.log(chalk.green.bold("-----------------------------------------------"))
    });
}

const readNote = function(title){
    const notes = loadNotes()
    notes.forEach(element =>{
        if(element.title == title){
            console.log(chalk.red.bold('Baslik : ')+element.title)
            console.log(chalk.blue.bold('Aciklama : ')+element.desc)
            console.log(chalk.green.bold("-----------------------------------------------"))
        }
    })

}


module.exports = {loadNotes,saveNotes,addNote,listNotes,readNote}

