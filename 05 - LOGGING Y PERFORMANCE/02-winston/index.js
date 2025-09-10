import winston, { format } from 'winston'
import 'winston-mongodb'
const { combine, timestamp, printf, colorize } = format

const logConfig = {
  transports: [ 
    new winston.transports.Console({
      level: 'silly'
    }),
    new winston.transports.File({
      filename: './logs/test.log',
      level: 'warn'
    }),
    winston.add(new winston.transports.MongoDB({
      db: 'mongodb://127.0.0.1:27017/coderhouse',
      collection: 'logs',
      tryReconnect: true,
      level: 'error'
    })) 
  ],
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    colorize(),
    printf(info => {
      return `[${info.timestamp}] | ${info.level} | ${info.message}`
    })
  )
}

const logger = winston.createLogger(logConfig)

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

logger.level = 'debug'

const test = () => {
  logger.silly('logger winston')
  logger.debug('logger winston')
  logger.verbose('logger winston')
  logger.http('logger winston')
  logger.info('logger winston')
  logger.warn('logger winston')
  logger.error('logger winston')
};

test();
