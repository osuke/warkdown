#!/usr/bin/env node

import program from 'commander';
import { fetchContent } from './fetchContent';

program
.version('0.1.0', '-v, --version')
.option('-e, --entry <s>', 'specify the entrypoint of your WP REST API')
.option('-o, --output <s>', 'specify the location of directory where the md files will be generated', 'docs')
.parse(process.argv);

if (program.entry) {
  fetchContent(program.entry, program.output)
} else {
  console.log('-e option is require');
}