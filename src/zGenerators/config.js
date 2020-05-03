"use strict";
exports.__esModule = true;
var path = require("path");
var config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..')
    },
    production: {
        ip: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 3000
    }
};
exports["default"] = Object.assign(config.all, config[config.all.env] || {});
