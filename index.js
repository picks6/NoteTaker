const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/route_api');
const html = require('./routes/route_html');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => 
    console.log(`Note Taker is running on http://localhost:${PORT}`)
);