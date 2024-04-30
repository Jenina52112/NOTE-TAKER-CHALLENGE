const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')
const router = require('express').Router();
const uuid = require ('../helpers/uuid')

router.get('/', (req, res) => {
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
})

router.post('/', (req, res) => {
  const {title, text} = req.body

  if (title && text){
    const newNote = {title, text, id:uuid()}
    readAndAppend(newNote, './db/db.json')
    res.json(newNote)
  }
  else{
    res.json('error posting note')
  }
})

router.delete('/:id', (req,res) => {
  const note_id = req.params.id
  readFromFile('./db/db.json').then(data => {
    const notes = JSON.parse(data)
    const finalNote = notes.filter(removeNote => {
      return removeNote.id !== note_id

    })
    writeToFile('./db/db.json', finalNote);
res.status(200).end();
  })

})
module.exports = router