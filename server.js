const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

require('./app/note-routes/')(app, {});
app.listen(port, () => {
    console.log("Server listenning on port:" + port);
});