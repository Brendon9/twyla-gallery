var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE pieces(id SERIAL PRIMARY KEY, title VARCHAR(40) not null, dimension TEXT not null, description TEXT, price FLOAT, type VARCHAR(40) not null, created_at TIMESTAMP, updated_at TIMESTAMP)');
query.on('end', function() { client.end(); });
