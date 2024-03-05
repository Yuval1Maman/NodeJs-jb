import express from 'express';
import usersRouter from './routers/users';
import path from 'path';

const server = express();
server.set('views', path.resolve(__dirname,'views'));
server.set('view engine', 'ejs');

server.use('/users',usersRouter);

server.listen(8080, () => {
    console.log('started server...');
});