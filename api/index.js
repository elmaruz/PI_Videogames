const server = require('../server/src/app.js');
const { conn } = require('../server/src/db.js');

// Track if database has been synced (resets on cold start)
let dbSyncPromise = null;

const syncDatabase = () => {
  if (!dbSyncPromise) {
    dbSyncPromise = conn.sync({ force: true });
  }
  return dbSyncPromise;
};

// Vercel serverless handler
module.exports = async (req, res) => {
  await syncDatabase();
  return server(req, res);
};
