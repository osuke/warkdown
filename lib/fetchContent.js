"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContent = void 0;

var _turndown = _interopRequireDefault(require("turndown"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var turndownService = new _turndown.default({
  codeBlockStyle: 'fenced'
});

var fetchContent = function fetchContent(url, outputDir) {
  var pageNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  (0, _nodeFetch.default)("".concat(url, "?page=").concat(pageNum), {}).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (typeof json.length === 'undefined') {
      console.log('finish');
      return;
    }

    try {
      _fs.default.statSync(outputDir);
    } catch (err) {
      _fs.default.mkdir(outputDir, function () {});
    }

    json.map(function (post) {
      var mdText = turndownService.turndown("<h1>".concat(post.title.rendered, "</h1>").concat(post.content.rendered));

      _fs.default.mkdir("".concat(outputDir, "/").concat(post.id), function () {
        _fs.default.writeFile("".concat(outputDir, "/").concat(post.id, "/README.md"), mdText, function () {});
      });
    });
    fetchContent(url, outputDir, pageNum + 1);
  });
};

exports.fetchContent = fetchContent;