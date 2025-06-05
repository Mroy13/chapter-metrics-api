const Redis = require('redis');

const redisClient = Redis.createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis Client Connected');
});

// Connect to Redis
(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;