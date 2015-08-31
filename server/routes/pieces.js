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

// CREATE -- localhost:3000/api/v1/pieces
router.post('/pieces', function(req, res) {
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

// READ -- localhost:3000/api/v1/pieces/
router.get('/pieces', function(req, res) {
  Piece.findAll().then(function(pieces) {
    res.json(pieces);
  });
});

// UPDATE -- localhost:3000/api/v1/pieces/:piece_id
router.put('/pieces/:piece_id', function(req, res) {
  Piece.findById(req.params.piece_id).then(function(piece) {
    piece.updateAttributes({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      dimension: req.body.dimension,
      type: req.body.type
    }).then(function(piece) {
      res.json(piece);
    });
  });
});

// DESTROY -- localhost:3000/api/v1/pieces/:piece_id
router.delete('/pieces/:piece_id', function(req, res) {
  var id = req.params.piece_id;

  pg.connect(connectionString, function(err, client, done) {
    client.query("DELETE FROM pieces WHERE id=($1)", [id]);
    selectAll(err, client, done, 'pieces', function(results) {
      res.json(results);
    });
  });
});


module.exports = router;
