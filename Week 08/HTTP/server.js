const http = require('http');
http.createServer((request, response)=>{
  let body = [];
  request.on('error', (err) => {
      console.log(err);
  }).on('data', (chunk) => {
     body.push(chunk.toString());
  }).on('end', () => {
     body = Buffer.concat(body).toString();
     console.log('body:', body);
     response.writeHead(200, {'Content-type' : 'text/html'});
     response.end(' Hello Word\n');
  })
}).listen(8095)
console.log('server started');