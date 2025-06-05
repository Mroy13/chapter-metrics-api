const redisClient = require('../config/redis-config');

async function cacheChapters(req, res, next) {
    const key = `chapters:${JSON.stringify(req.query)}`;

    try {
        const cached = await redisClient.get(key);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        
        req.redisCacheKey = key;
        next();
    } catch (err) {
        console.error('Redis cache error:', err);
        next();
    }
}

module.exports = {
    cacheChapters,
    
};
