import express from 'express';
import cors from 'cors';


import filmRouter from './router/filmRouter';
import peopleRouter from './router/peopleRouter';
import { errorHandler } from './utils/errorHandler/errorHandler';
import { checkRequest } from './middleware/checkRequest';
import loggerHandler from './utils/logger/loggerHandler';

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(cors());

app.use(checkRequest);
app.use('/films', filmRouter);
app.use('/people', peopleRouter);

app.use(errorHandler);

app.listen(port, async () => {
    loggerHandler.serverLogger(port);
});

export default app;