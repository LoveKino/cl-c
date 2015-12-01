/**
 * web server solution
 */
import http from 'http';
import N from 'cl-n';
import statics from './static';
import acesslogger from './accesslog';
import path from 'path';

let wrap = (n) => (mid) => {
    return n(async function(req, res) {
        let self = this;
        let next = () => self.next(req, res);
        let ret = mid && mid(req, res, next);
        return await ret;
    });
}

let app = () => {
    let n = N();
    let w = wrap(n);
    let flow = n.series(
        w(acesslogger),

        w(async (req, res, next) => {
            try{
                await next();
            } catch(e) {
                console.log(e);
                res.statusCode = 505;
                res.end();
            }
        }),

        w(statics(path.join(__dirname, '../www'), 'page')),

        w(statics(path.join(__dirname, '../www'), 'static')),

        w(async (req, res, next) => {
            res.end('hello world!');
        })
    );
    return flow;
}

let listen = (server, port) => new Promise((resolve, reject) => {
    server.listen(port, resolve);
    server.on('error', reject);
});

let createServer = async (port) => {
    let server = http.createServer(app());
    await listen(server, port);
    return server;
}

module.exports = () => {
    return {
        createServer
    }
}