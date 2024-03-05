const http = require('http');

const HOST = 'localhost';
const PORT = '8080'

const requestListener = function (req, res) {
    if(req.url=="/json"){
        const data = {SchoolName:'JohnBryce'};
        res.setHeader('Content-type', 'application/json')
        res.writeHead(200);
        res.end(JSON.stringify(data));
    }
    else if(req.url=="/cvs"){
        const data= `id,name,age
    123456789,Israel Israeli,50`;
        res.setHeader('Content-Disposition', 'attachment;filename=johnbryce.csv')
        res.writeHead(200);
        res.end(data);
    }
    else{ 
        res.writeHead(404);
        res.end('not found')
    }
    
};

const server = http.createServer(requestListener);

server.listen(PORT,HOST, () => {console.log('starting')});