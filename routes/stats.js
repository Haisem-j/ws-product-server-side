const router = require('express').Router();
const queryHandler = require('../DB/queryHandler');

router.get('/hourly',(req,res,next)=>{
    req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

router.get('/daily', (req,res,next)=>{
    req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
    
},queryHandler)

module.exports = router;
