// ./node_modules/.bin/babel-node example/es6TplDemo.js

import c from '../index';
import path from 'path';
import handyp from 'handyp';

let p = path.join(__dirname, '../ignore/test');

(async () => {
    await handyp.deletep(p);
    await c({
        target: p
    });
})();