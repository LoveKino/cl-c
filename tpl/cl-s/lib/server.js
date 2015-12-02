'use strict';

var _clS = require('./cl-s');

var _clS2 = _interopRequireDefault(_clS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _clS2.default)().createServer(8777);

                case 2:
                    server = _context.sent;

                    console.log(server.address().port);

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();