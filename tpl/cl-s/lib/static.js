'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _handyp = require('handyp');

var _handyp2 = _interopRequireDefault(_handyp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var getStaticPath = function getStaticPath(wwwPath, pathname) {
    var staticPath = _path2.default.join(wwwPath, pathname);
    staticPath = _path2.default.normalize(staticPath);
    if (staticPath.indexOf(wwwPath) !== 0) {
        return false;
    }
    return staticPath;
};

var outputFile = (function () {
    var _this = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(staticPath, res) {
        var fileStat, type;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _handyp2.default.exist(staticPath);

                    case 2:
                        if (!_context.sent) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 5;
                        return _handyp2.default.fs.stat(staticPath);

                    case 5:
                        fileStat = _context.sent;

                        if (fileStat.isFile()) {
                            type = _mime2.default.lookup(staticPath);

                            res.setHeader('Content-Type', type);
                            // pipe static resource
                            _fs2.default.createReadStream(staticPath).pipe(res);
                        } else {
                            res.statusCode = 404;
                            res.end();
                        }
                        _context.next = 11;
                        break;

                    case 9:
                        res.statusCode = 404;
                        res.end();

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function outputFile(_x, _x2) {
        return ref.apply(this, arguments);
    };
})();

exports.default = function (rootPath, staticDir) {
    return (function () {
        var _this2 = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
            var urlObj, pathname, staticPath;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            urlObj = _url2.default.parse(req.url);
                            pathname = urlObj.pathname;

                            if (!(pathname.indexOf('/' + staticDir + '/') === 0)) {
                                _context2.next = 13;
                                break;
                            }

                            staticPath = getStaticPath(rootPath, pathname);
                            // check legal path

                            if (!(staticPath === false)) {
                                _context2.next = 9;
                                break;
                            }

                            res.statusCode = 404;
                            res.end();
                            _context2.next = 11;
                            break;

                        case 9:
                            _context2.next = 11;
                            return outputFile(staticPath, res);

                        case 11:
                            _context2.next = 15;
                            break;

                        case 13:
                            _context2.next = 15;
                            return next();

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x3, _x4, _x5) {
            return ref.apply(this, arguments);
        };
    })();
};