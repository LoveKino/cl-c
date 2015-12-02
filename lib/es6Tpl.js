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

var es6TplPath = _path2.default.join(__dirname, "../tpl/es6Tpl");

var createFiles = (function () {
  var _this = this;

  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(target) {
    var projectName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            projectName = getProjectName(target);
            _context.next = 3;
            return _handyp2.default.copyp(es6TplPath, target, {
              override: false,
              handler: function handler(info) {
                tmpl(info, _path2.default.join(es6TplPath, "./package.json"), {
                  name: projectName
                });
                tmpl(info, _path2.default.join(es6TplPath, "./index.js"), {
                  name: projectName
                });
                return info;
              }
            });

          case 3:
            _context.next = 5;
            return _handyp2.default.fs.writeFile(_path2.default.join(target, "src/" + projectName + ".js"), "module.exports = () => {}", "utf-8");

          case 5:
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

var tmpl = function tmpl(info, p, data) {
  if (info.srcPath === p) {
    info.source = _lodash2.default.template(info.source)(data);
  }
};

var getProjectName = function getProjectName(target) {
  return _path2.default.basename(target);
};

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
            return (0, _gitInit2.default)(target, getProjectName(target));

          case 4:
            _context2.next = 6;
            return (0, _installDependencies2.default)(target);

          case 6:
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