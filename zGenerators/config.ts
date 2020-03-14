import * as path from 'path';

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
  },

  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000
  },
}

export default Object.assign(config.all, config[config.all.env] || {});