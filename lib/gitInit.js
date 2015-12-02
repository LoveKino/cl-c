"use strict";

var _handyp = require("handyp");

var _handyp2 = _interopRequireDefault(_handyp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

module.exports = (function () {
  var _this = this;

  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(target, projectName) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _handyp2.default.spawn("git", ["init"], {
              cwd: target
            }, function (type, info) {
              console.log("[" + type + "] " + info.toString());
            });

          case 2:
            _context.next = 4;
            return _handyp2.default.spawn("git", ["remote", "add", "origin", "https://github.com/LoveKino/" + projectName + ".git"], {
              cwd: target
            }, function (type, info) {
              console.log("[" + type + "] " + info.toString());
            });

          case 4:
            _context.next = 6;
            return _handyp2.default.spawn("git", ["add", "*"], {
              cwd: target
            }, function (type, info) {
              console.log("[" + type + "] " + info.toString());
            });

          case 6:
            _context.next = 8;
            return _handyp2.default.spawn("git", ["commit", "-m", "init"], {
              cwd: target
            }, function (type, info) {
              console.log("[" + type + "] " + info.toString());
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
})();