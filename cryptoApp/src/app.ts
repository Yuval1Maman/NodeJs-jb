import express from 'express';
import usersRouter from './routers/users';
const server = express();

server.use('/users',usersRouter);

server.listen(8080, () => {
    console.log('started server...');
});