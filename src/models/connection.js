const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true, // Whether the pool should queue connections and wait for them to become available if there are no connections available in the pool.
  connectionLimit: 10, // Maximum number of connections in the pool.
  queueLimit: 0, // Maximum number of connection requests the pool will queue before returning an error from getConnection.
  connectTimeout: 20000, // Timeout in milliseconds to connect to the MySQL server. Increase it if you are encountering ETIMEDOUT errors.
  acquireTimeout: 20000, // Timeout in milliseconds to acquire a connection from the pool. Increase it if you are encountering ETIMEDOUT errors.
});

// Error handling for connection timeouts
connectionPool.on('connection', (connection) => {
  console.log('New connection stablished');
});

connectionPool.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Lost connection to MySQL server');
    // Reconnect or handle the error accordingly
  } else if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('MySQL Pool has too many connections');
    // Handle the error accordingly
  } else if (err.code === 'ECONNREFUSED') {
    console.error('MySQL Connection refused');
    // Handle the error accordingly
  } else {
    console.error('Other MySQL Pool error:', err.code);
    // Handle other errors accordingly
  }
});

module.exports = connectionPool;
