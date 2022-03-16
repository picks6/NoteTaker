const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));
app.get("/api/notes", (req,res) => { res.json(db)});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  const addNote = req.body;

  db.push(addNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  db = db.filter(notes => notes.id != id);

  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));