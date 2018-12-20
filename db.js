const {
  Pool,
  Client
} = require('pg');
const connectionString = 'postgresql://postgres:123@localhost:5432/Authentication';

const pool = new Pool({
  connectionString: connectionString,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// });

const client = new Client({
  connectionString: connectionString,
});
client.connect();
module.exports = client;
