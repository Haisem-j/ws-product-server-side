const redisClient = require("redis").createClient();

function getCurrentTime() {
  // Gets current time in EPOCH
  const now = new Date();
  const startTime = Math.round(now.getTime() / 1000);
  return startTime;
}

module.exports = (req, res, next) => {
  redisClient.exists(req.header.user, (err, reply) => {
    if (err) {
      console.log(`Error has occured: ${err}`);
      system.exit(0);
    }
    if (reply === 0) {
      // Redis responds with no user
      // Create new User
      let body = {
        count: 1,
        startTime: getCurrentTime()
      };
      redisClient.set(req.header.user, JSON.stringify(body));
      next();
    } else if (reply === 1) {
      // Redis recognizes user exists
      redisClient.get(req.header.user, (err, reply) => {
        let user = JSON.parse(reply);
        console.log(user.count);
        // Check how much time is left since last api call within interval
        let timeLeft = (getCurrentTime() - user.startTime) / 60;

        if (timeLeft >= 1) {
          //If the time left is more then 1 minute we reset the api count and start time
          //to this very moment and record this in redis
          let body = {
            count: 1,
            startTime: getCurrentTime()
          };
          redisClient.set(req.header.user, JSON.stringify(body));
          // allow the request
          next();
        } else if (timeLeft < 1) {
          if (user.count > 3) {
            return res.json({
              error: "api limit reached"
            });
          } else if (user.count <= 3) {
            user.count++;
            redisClient.set(req.header.user, JSON.stringify(user));
            //allow the request
            next();
          }
        }
      });
    }
  });
};
