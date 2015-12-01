import assert from 'assert';
import {
    request, inServer
}
from './index';

describe('static', () => {
    it('base', inServer(async (server, port) => {
        let resBody = await request({
            hostname: '127.0.0.1',
            port,
            path: '/static/test.js'
        });
        assert.equal(resBody, 'alert(1);');
    }));

    it('missing', inServer(async (server, port) => {
        try {
            let resBody = await request({
                hostname: '127.0.0.1',
                port,
                path: '/static/nnnnnnnnnnnnnnnn.js'
            });
        } catch (err) {
            assert.equal(err, '404');
        }
    }));

    it('dir', inServer(async (server, port) => {
        try {
            let resBody = await request({
                hostname: '127.0.0.1',
                port,
                path: '/static/tdir'
            });
        } catch (err) {
            assert.equal(err, '404');
        }
    }));

    it('page', inServer(async (server, port) => {
        let resBody = await request({
            hostname: '127.0.0.1',
            port,
            path: '/page/test.html'
        });
        assert.equal(resBody.indexOf('<!DOCTYPE html>'), 0);
    }));
});