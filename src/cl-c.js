import es6Tpl from './es6Tpl';

let tplMap = {
    'es6Tpl': es6Tpl
}

module.exports = async (opts) => {
    try {
        let type = opts.type || 'es6Tpl';
        let fun = tplMap[type];
        if (fun) {
            await fun(opts.target);
        }
    } catch (err) {
        console.log(err);
    }
}