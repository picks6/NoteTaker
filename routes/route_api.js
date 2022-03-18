const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


//get notes
router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data)
        res.json(JSON.parse(data));
    });
}); 

//post new notes
router.post('/notes', (req, res) => {

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //create unique ID
        req.body.id = uuidv4();
        var note = JSON.parse(data);
        note.push(req.body); 

        fs.writeFile('db/db.json', JSON.stringify(note), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(req.body);
        });
    });

}); 


//delete route
router.delete('/notes/:id', (req, res) => {
    const noteRemove = req.params.id;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        req.body.id = uuidv4();
        var note = JSON.parse(data);
        var newNote = note.filter(note => note.id !== noteRemove)

        fs.writeFile('db/db.json', JSON.stringify(newNote), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(req.body);
        });
    });

}); 

module.exports = router;