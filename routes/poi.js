const router = require('express').Router();
const queryHandler = require('../DB/queryHandler');

router.get('/', (req,res,next)=>{
    req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)


module.exports = router;
