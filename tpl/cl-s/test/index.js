import http from 'http';
import S from '../index';

let request = (options, postData = "") => new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
        let chunks = [];
        let code = res.statusCode + '';
        if (code.indexOf('2') !== 0)
            reject(res.statusCode);
        res.on('data', function(chunk) {
            chunks.push(chunk);
        });
        res.on('end', function() {
            let body = chunks.join('');
            resolve(body);
        });
    });
    req.on('error', function(e) {
        reject(e);
    });
    // write data to request body
    req.write(postData);
    req.end();
});

let inServer = (handler) => async () => {
    let s = S();
    let server = await s.createServer(0);
    let port = server.address().port;
    if (handler) {
        await handler(server, port);
    }
    server.close();
}

module.exports = {
    request,
    inServer
};