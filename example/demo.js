// ./node_modules/.bin/babel-node example/demo.js

import c from '../index';
import path from 'path';
import handyp from 'handyp';

let p = path.join(__dirname, '../ignore/test');

(async () => {
    await handyp.deletep(p);
    await c(p);
})();