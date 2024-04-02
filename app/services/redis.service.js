const redis = require("../configs/redis.config")

exports.redisSetEx = async (key, val, ttl) => {
    return await redis.setex(key, ttl, val);
};
  
exports.redisGet = async (key) => {
    return await redis.get(key);
};

exports.redisDel = async (key) => {
    return await redis.del(key);
};