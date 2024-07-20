import Redis from 'redis';

export const BlackListedRedisClient = Redis.createClient({
    url: process.env.REDIS_URL,
});

BlackListedRedisClient.on('connect', () => {
    console.log('Connected to Redis');
})

BlackListedRedisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

const init = async () => {
    await BlackListedRedisClient.connect();
}

init();

