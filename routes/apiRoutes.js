var router = require('express').Router();
var connection = require('../db/connection');

router.get('/api/notes', function (req, res) {
  connection.query("SELECT * FROM notes", function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

// POST USER DATA
router.post('/api/notes', function (req, res) {
  connection.query(
    'INSERT INTO notes SET ?', req.body,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
// TODO: Create connection query to insert a new note into MySQL database
// https://www.npmjs.com/package/mysql#performing-queries


// DELETE deletes the note with an id equal to req.params.id
// https://expressjs.com/en/4x/api.html#app.delete.method
router.delete('/api/notes/:id', function (req, res) {
  connection.query(
    'DELETE FROM notes WHERE ?', {id: req.params.id}, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
});

router.put('/api/notes/:id', function (req, res) {
  connection.query(
    'UPDATE notes SET ? WHERE id = ?', [req.body, req.params.id], function (err, result) {
      if (err) {
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        return res.status(404).end();
      }
      console.log(result);
      res.status(200).end();
  });
});
module.exports = router;