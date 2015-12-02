'use strict';

var _es6Tpl = require('./es6Tpl');

var _es6Tpl2 = _interopRequireDefault(_es6Tpl);

var _clSTpl = require('./cl-sTpl');

var _clSTpl2 = _interopRequireDefault(_clSTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var tplMap = {
    'es6Tpl': _es6Tpl2.default,
    'cl-sTpl': _clSTpl2.default
};

module.exports = (function () {
    var _this = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opts) {
        var tpl, fun;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        tpl = opts.tpl || 'es6Tpl';
                        fun = tplMap[tpl];

                        if (!fun) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 6;
                        return fun(opts.target);

                    case 6:
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[0, 8]]);
    }));

    return function (_x) {
        return ref.apply(this, arguments);
    };
})();