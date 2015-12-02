'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _clN = require('cl-n');

var _clN2 = _interopRequireDefault(_clN);

var _static = require('./static');

var _static2 = _interopRequireDefault(_static);

var _accesslog = require('./accesslog');

var _accesslog2 = _interopRequireDefault(_accesslog);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * web server solution
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var wrap = function wrap(n) {
    return function (mid) {
        return n((function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
                var self, next, ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                self = this;

                                next = function next() {
                                    return self.next(req, res);
                                };

                                ret = mid && mid(req, res, next);
                                _context.next = 5;
                                return ret;

                            case 5:
                                return _context.abrupt('return', _context.sent);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x, _x2) {
                return ref.apply(this, arguments);
            };
        })());
    };
};

var app = function app() {
    var n = (0, _clN2.default)();
    var w = wrap(n);
    var flow = n.series(w(_accesslog2.default), w((function () {
        var _this = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return next();

                        case 3:
                            _context2.next = 10;
                            break;

                        case 5:
                            _context2.prev = 5;
                            _context2.t0 = _context2['catch'](0);

                            console.log(_context2.t0);
                            res.statusCode = 505;
                            res.end();

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 5]]);
        }));

        return function (_x3, _x4, _x5) {
            return ref.apply(this, arguments);
        };
    })()), w((0, _static2.default)(_path2.default.join(__dirname, '../www'), 'page')), w((0, _static2.default)(_path2.default.join(__dirname, '../www'), 'static')), w((function () {
        var _this2 = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            res.end('hello world!');

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));

        return function (_x6, _x7, _x8) {
            return ref.apply(this, arguments);
        };
    })()));
    return flow;
};

var listen = function listen(server, port) {
    return new Promise(function (resolve, reject) {
        server.listen(port, resolve);
        server.on('error', reject);
    });
};

var createServer = (function () {
    var _this3 = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(port) {
        var server;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        server = _http2.default.createServer(app());
                        _context4.next = 3;
                        return listen(server, port);

                    case 3:
                        return _context4.abrupt('return', server);

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this3);
    }));

    return function createServer(_x9) {
        return ref.apply(this, arguments);
    };
})();

module.exports = function () {
    return {
        createServer: createServer
    };
};