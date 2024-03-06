import config from "config";
import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on('connection',socket => {
    console.log('user has connected')
    socket.on('update from worker', message => {
        console.log(`message received from worker${message}`);
        io.emit('update your list', message);
    })
});

io.listen(config.get<Number>('io.port'));