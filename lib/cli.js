#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _fetchContent = require("./fetchContent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.1.1', '-v, --version').option('-e, --entry <s>', 'specify the entrypoint of your WP REST API').option('-o, --output <s>', 'specify the location of directory where the md files will be generated', 'docs').parse(process.argv);

if (_commander.default.entry) {
  (0, _fetchContent.fetchContent)(_commander.default.entry, _commander.default.output);
} else {
  console.log('-e option is require');
}