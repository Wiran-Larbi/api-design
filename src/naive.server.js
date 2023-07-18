const http = require('http');
const handler = (req,res) => {
    console.log(res);
    if (req.method === 'GET' && req.url === '/') {
        console.log("Hello From the Server ...");
        res.end();
    }
}

const server = http.createServer(handler);

server.listen(3001, () => {
    console.log(`server on http://localhost:3001`);
})