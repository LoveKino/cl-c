import es6Tpl from './es6Tpl';
import clSTPl from './cl-sTpl';

let tplMap = {
    'es6Tpl': es6Tpl,
    'cl-sTpl': clSTPl
}

module.exports = async (opts) => {
    try {
        console.log(opts);
        let tpl = opts.tpl || 'es6Tpl';
        console.log(tpl);
        let fun = tplMap[tpl];
        console.log(fun);
        if (fun) {
            await fun(opts.target);
        }
    } catch (err) {
        console.log(err);
    }
}