const winston = require('winston');
require('winston-mongodb');

winston.add(new winston.transports.MongoDB({db: process.env.MONGO, options: { useUnifiedTopology: true }}));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    ],
  });

module.exports = logger;