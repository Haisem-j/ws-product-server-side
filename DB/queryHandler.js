const pool =require('./queries');

module.exports = function(req, res, next) {
  pool
    .query(req.sqlQuery)
    .then(r => {
      return res.json(r.rows || []);
    })
    .catch(next);
};
