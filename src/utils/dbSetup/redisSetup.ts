import dotenv from 'dotenv';
import { createClient } from 'redis';
import loggerHandler from '../logger/loggerHandler';

dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

class RedisSetup {
    private redisClient = createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    });

    private async connect() {
        try {
            await this.redisClient.connect();
            loggerHandler.infoLogger('Redis connected');
        } catch (error) {
            loggerHandler.errorLogger('Error in redis connection', error as Error);
        }
    }

    private async disconnect() {
        try {
            await this.redisClient.quit();
            loggerHandler.infoLogger('Redis disconnected');
        } catch (error) {
            loggerHandler.errorLogger('Error in redis disconnection', error as Error);
        }
    }

    public async get(key: string) {
        try {
            await this.connect();
            const result = await this.redisClient.get(key);
            if(result)
                return JSON.parse(result);
            return result;
        } catch (error) {
            loggerHandler.errorLogger('Error in redis get', error as Error);
        } finally {
            await this.disconnect();
        }
    }

    public async set(key: string, value: string) {
        try {
            await this.connect();
            return await this.redisClient.set(key, value);
        } catch (error) {
            loggerHandler.errorLogger('Error in redis set', error as Error);
        } finally {
            await this.disconnect();
        }
    }

    public async setExpire(key: string, time: number, value: string) {
        try {
            await this.connect();
            return await this.redisClient.setEx(key, time, value);
        } catch (error) {
            loggerHandler.errorLogger('Error in redis setEx', error as Error);
        } finally {
            await this.disconnect();
        }
    }
}

export default RedisSetup;
