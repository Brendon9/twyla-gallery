var express   = require('express');
var router    = express.Router();
var path      = require('path');
var pg        = require('pg');
var Sequelize = require('sequelize');

var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var sequelize = new Sequelize(connectionString, {
  define: {
    timestamps: false
  }
});

var selectAll = require(path.join(__dirname, '../lib', 'utils'));

var Piece = sequelize.import(path.join(__dirname,'../models','piece'));

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// CREATE -- localhost:3000/api/v1/paintings
router.post('/paintings', function(req, res) {
  var data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    dimension: req.body.dimension,
    type: req.body.type
  };

  Piece.create(data).then(function(pieces) {
    res.json(pieces);
  });

});

// READ -- localhost:3000/api/v1/paintings/
router.get('/paintings', function(req, res) {
  Piece.findAll().then(function(pieces) {
    res.json(pieces);
  });
});

// UPDATE -- localhost:3000/api/v1/paintings/:painting_id
router.put('/paintings/:painting_id', function(req, res) {
  var id = req.params.painting_id;
  var data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    dimension: req.body.dimension
  };

  pg.connect(connectionString, function(err, client, done) {
    client.query("UPDATE paintings SET title=($1), description=($2), price=($3), dimension=($4) WHERE id=($3)",
    [data.title,
     data.description,
     data.price,
     data.dimension,
     id]);

     selectAll(err, client, done, 'paintings', function(results) {
       res.json(results);
     });
  });
});

// DESTROY -- localhost:3000/api/v1/paintings/:painting_id
router.delete('/paintings/:painting_id', function(req, res) {
  var id = req.params.painting_id;

  pg.connect(connectionString, function(err, client, done) {
    client.query("DELETE FROM paintings WHERE id=($1)", [id]);
    selectAll(err, client, done, 'paintings', function(results) {
      res.json(results);
    });
  });
});


module.exports = router;