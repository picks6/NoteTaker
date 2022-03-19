const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/route_api');
const html = require('./routes/route_html');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(PORT, () => 
    console.log(`Note Taker is running on http://localhost:${PORT}`)
);