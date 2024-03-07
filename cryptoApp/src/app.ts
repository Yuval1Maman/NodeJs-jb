import express, { urlencoded } from 'express';
import usersRouter from './routers/users';
import guestsRouter from './routers/guests'
import githubRouter from './routers/github'
import path from 'path';
import config from 'config';
import errorHandler from './middlewares/errors/error-handler';
import session from 'express-session';
import auth from './middlewares/github-auth';

declare global{
    namespace Express{
        interface User{
            id: number;
        }
    }
}

const server = express();

//views setup
server.set('views', path.resolve(__dirname,'views'));
server.set('view engine', 'ejs');

server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 *60 * 24 * 7,
    }
}));

server.use(auth.initialize());
server.use(auth.session());

//general middlewares
server.use(express.urlencoded());

//routing
server.use('/',guestsRouter);
server.use('/users',usersRouter);
server.use('/github',githubRouter);

//error-middlewares
server.use(errorHandler)

const port = config.get<number>('app.port')
server.listen(port, () => {
    console.log(`server listening on ${port}`);
});