// ./node_modules/.bin/babel-node example/cl-sDemo.js

import c from '../index';
import path from 'path';
import handyp from 'handyp';

let p = path.join(__dirname, '../ignore/test-cl-s');

(async () => {
    try {
        await handyp.deletep(p);
        await c({
            target: p,
            tpl: "cl-sTpl"
        });
    } catch (err) {
        console.log(err);
    }
})();