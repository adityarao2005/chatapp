import { createClient } from 'redis';

export const RedisClient = createClient({
    url: process.env.REDIS_URL,
});

RedisClient.on('connect', () => {
    console.log('Connected to Redis');
})

RedisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

const init = async () => {
    await RedisClient.connect();
}

init();

