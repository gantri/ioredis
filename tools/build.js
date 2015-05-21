'use strict';

var Redis = require('../');
var redis = new Redis();

redis.info(function (err, info) {
  var version = info.match(/redis_version:([\d\.]+)/)[1];
  redis.command(function (err, res) {
    redis.disconnect();
    var contents = '// This file was generated by `$ npm run build` on ' + (new Date()).toLocaleString() + '\n';
    contents += '// Redis Version: ' + version + '\n';
    var commands = res.reduce(function (prev, current) {
      prev[current[0]] = {
        arity: current[1],
        flags: current[2],
        keyStart: current[3],
        keyStop: current[4],
        step: current[5]
      };
      return prev;
    }, {});
    contents += 'module.exports = ' + JSON.stringify(commands, null, '  ') + ';\n';
    process.stdout.write(contents);
  });
});