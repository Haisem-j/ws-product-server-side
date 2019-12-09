const router = require('express').Router();
const queryHandler = require('../DB/queryHandler');

router.get('/hourly', (req,res, next) =>{
    req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

router.get('/daily', (req,res,next)=>{
    req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)


module.exports = router;
