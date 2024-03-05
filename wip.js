const express = require('express');

const server = express();

server.get('/csv',(res,req) => {
    console.log('in csv GET');
})

server.post('/csv',(res,req) => {
    console.log('in csv POST');
})

server.get('/json',(res,req) => {
    console.log('in csv GET');
})

server.post('/json',(res,req) => {
    console.log('in csv POST');
})

server.listen(8080, () => {
    console.log('started...')
})