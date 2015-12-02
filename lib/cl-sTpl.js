"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handyp = require("handyp");

var _handyp2 = _interopRequireDefault(_handyp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _installDependencies = require("./installDependencies");

var _installDependencies2 = _interopRequireDefault(_installDependencies);

var _gitInit = require("./gitInit");

var _gitInit2 = _interopRequireDefault(_gitInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var tplPath = _path2.default.join(__dirname, "../tpl/cl-s");

var nodeModulePath = _path2.default.join(tplPath, 'node_modules');

var createFiles = (function () {
    var _this = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(target) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _handyp2.default.copyp(tplPath, target, {
                            override: false,
                            handler: function handler(info) {
                                if (info.srcPath.indexOf(nodeModulePath) === 0) {
                                    return false;
                                }
                                return info;
                            }
                        });

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function createFiles(_x) {
        return ref.apply(this, arguments);
    };
})();

exports.default = (function () {
    var _this2 = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(target) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return createFiles(target);

                    case 2:
                        _context2.next = 4;
                        return (0, _installDependencies2.default)(target);

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, _this2);
    }));

    return function (_x2) {
        return ref.apply(this, arguments);
    };
})();