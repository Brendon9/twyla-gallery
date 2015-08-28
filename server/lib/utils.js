var selectAll = function(err, client, done, table, callback) {
  var results = [];
  var query = client.query("SELECT * FROM " + table + " ORDER BY id ASC");

  query.on('row', function(row) {
    results.push(row);
  });

  query.on('end', function() {
    client.end();
    callback(results);
  });

  if(err) {
    console.log(err);
  }
}

module.exports = selectAll;
