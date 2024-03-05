const express = require('express');
const { toXML } = require('jstoxml')
const server = express();

const axios = require('axios');

const fetchUsers = async (req,res,next) => {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        req.users = response.data;
        next()
    }
    catch(err){
        res.status(500).send('Internal Server Error')
    }
}



const authorization = ((req,res,next) => {
    if(req.rawHeaders[1].split(' ')[1] !== '123') res.status(401).send('unauthorized')
    console.log('authorized success')
    next()
})

server.get('/users', authorization,fetchUsers, (req,res,next) => {
    const offset = +req.query.offset || 0;
    const limit = +req.query.limit || 0;
    req.users = req.users.slice(offset, offset+limit);
    if(req.query.format ==='xml'){
        const xml = toXML(req.users)
        res.setHeader('Content-Type', 'text/xml')
        res.send(xml)
        return
    }
    res.json(req.users)
})

server.use((req,res,next) => {
    res.status(404).send('not Found')
})
server.listen(8080, () => {
    console.log('started...');
})