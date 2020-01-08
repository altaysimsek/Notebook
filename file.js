const fs = require('fs');
const chalk = require('chalk')

const addNote = function(title,desc){
    const notes = loadNotes();
    const duplicatesNotes = notes.filter(function(note){
        return note.title === title
    })
    if(duplicatesNotes.length === 0){
        notes.push({
            title: title,
            desc: desc,
        })
        saveNotes(notes)
        console.log(chalk.green.bold('Not başarıyla eklendi.'))
    }else{
        console.log(chalk.red.bold('Bu başlik daha önce kullanildi.'))
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)


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

const removeNote = function(title){
    const notes = loadNotes()
    const newNotes = notes.filter(function(note){
        return note.title != title  
    })
    
    if(notes.length > newNotes.length){
        console.log(chalk.red.bold('Notunuz silindi.'))
        saveNotes(newNotes)
    }else{
        console.log(chalk.blue.bold('Notunuz bulunamadı :\'('))
    }
    
    /*
    for (let index = 0; index < notes.length; index++) {
        if(notes[index].title == title){
            notes.splice(index,1)
        }
    }
    saveNotes(notes)
    console.log(chalk.red.bold('Not silindi.'))
    */

}


module.exports = {loadNotes,saveNotes,addNote,listNotes,readNote,removeNote}

