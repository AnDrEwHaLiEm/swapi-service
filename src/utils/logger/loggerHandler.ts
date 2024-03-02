import winston, { Logger } from 'winston';
import dotenv from 'dotenv';

require('dotenv').config();
const { ENV } = process.env;
class LoggerHandler {

    logger: Logger;
    constructor() {
        this.logger =
            ENV === "test" ?
            jasmine.createSpyObj('Logger', ['info', 'error']) :
            winston.createLogger({
                transports: [
                    new winston.transports.Console()
                ]
            });
    }

    public requestLogger(url: string, method: string, ip?: string) {
        this.logger.info(`Request: ${method} ${url} from ${ip}`);
    }

    public errorLogger(message: string, err: Error) {
        this.logger.error(`${message} : message : ${err.message} stack : ${err.stack} name : ${err.name}`);
    }

    public infoLogger(message: string) {
        this.logger.info(message);
    }


    public serverLogger(port: string) {
        this.logger.info(`Server is running on http://localhost:${port}`);
    }
}

const loggerHandler = new LoggerHandler();
export default loggerHandler;
