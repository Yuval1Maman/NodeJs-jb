import express, { urlencoded } from 'express';
import usersRouter from './routers/users';
import path from 'path';
import config from 'config';
import errorHandler from './middlewares/errors/error-handler';

const server = express();

//views setup
server.set('views', path.resolve(__dirname,'views'));
server.set('view engine', 'ejs');

//general middlewares
server.use(express.urlencoded());

//routing
server.use('/users',usersRouter);

//error-middlewares
server.use(errorHandler)

const port = config.get<number>('app.port')
server.listen(port, () => {
    console.log(`server listening on ${port}`);
});