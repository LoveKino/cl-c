import assert from 'assert';
import {
    request, inServer
}
from './index';

describe('base', () => {
    it('base', inServer(async (server, port) => {
        try {
            let resBody = await request({
                hostname: '127.0.0.1',
                port,
                path: '/'
            });
            console.log(resBody);
        } catch (err) {
            console.log(err);
        }
    }));
});