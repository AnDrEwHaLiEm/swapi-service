import dotenv from 'dotenv';
import loggerHandler from '../logger/loggerHandler';
import { Client } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env;

class DbSetup {
    client: Client;
    constructor() {
        this.client = new Client({
            user: POSTGRES_USER,
            host: POSTGRES_HOST,
            database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
            password: POSTGRES_PASSWORD,
            port: ENV === 'test' ? 5433 : 5432,
        });
    }

    private async connect() {
        try {
            await this.client.connect();
            loggerHandler.infoLogger('Database connected');
        } catch (error) {
            loggerHandler.errorLogger('Error in database connection', error as Error);
        }
    }

    private async disconnect() {
        try {
            await this.client.end();
            loggerHandler.infoLogger('Database disconnected');
        } catch (error) {
            loggerHandler.errorLogger('Error in database disconnection', error as Error);
        }
    }

    public async executeQuery(query: string, values: Array<string | string[] | number>) {
        try {
            await this.connect();
            const result = await this.client.query(query, values);
            return result;
        } catch (error) {
            loggerHandler.errorLogger('Error in database query', error as Error);
        } finally {
            await this.disconnect();
        }
    }

}
export default DbSetup;
