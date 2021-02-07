const sqlite3 = require('sqlite3').verbose();
let dbConn = new sqlite3.Database('./db/sqlite-001.db');

module.exports = function (app, db) {
    
    app.put('/notes/:id', (req, res) => {
        const data = [req.body.title, req.body.body, req.params.id];
        // console.log('data: ',data);

        let sql = `UPDATE notes
            SET 
                title = ?,
                body = ?
            WHERE id = ?`;

        dbConn.get(sql, data, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.send(`Row updated.`);
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;

        let sql = `SELECT title, body from notes where id=?`;

        dbConn.get(sql, [id], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.send(row);
        });

    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id.trim();

        let sql = `DELETE FROM notes WHERE id=?`;

        dbConn.run(sql, [id], async function(err) {
            if (err) {
                return console.error(err.message);
            }
            res.send(`Row deleted ${this.changes}`);
        });

    });


    app.post('/notes', (req, res) => {
        const note = [req.body.title, req.body.body];
        
        // insert one row into the langs table
        dbConn.run(`INSERT INTO notes(title, body) VALUES(?, ?)`, note, function (err) {
            if (err) {
                return console.log(err.message);
            }
            
            // get the last insert id
            res.send(`A row has been inserted with rowid ${this.lastID}`);
        });

    });
};

