'use strict'

const { notFound, errorHandler } = require('../middlewares/global.middleware.js');

const config = require('config'),
      ENV = process.env.NODE_ENV || 'development';

const morgan = require('morgan'),
      cors = require('cors'),
      helmet = require('helmet'),
      mongoose = require('mongoose'),
      mongoSanitize = require('express-mongo-sanitize');

const name = '[dprs]';

const Core = require('./core.class');
const AppError = require('./app-error.class');

class Server {
  constructor(express, opts = {}) { // {{{1
    this.opts = {
      // host: process.env.HOST || opts.host ,
      port: process.env.PORT || opts.port,
      apiBasePath: opts.apiBasePath,
      endpoints: opts.endpoints,
      eventsDir: opts.eventsDir,
    }
    this.express = express;
    this.app = express();
    this.http = require('http').Server(this.app);
    this.dbConnect();
    this.loadMiddlewares();
    this.loadRoutes();
    this.app.use(notFound, errorHandler);
    this.init(this.opts);
  }

  init(opts) { // {{{1
    // this.http.listen(opts.port, opts.host, function() {
    this.http.listen(opts.port, function() {
      console.log(`\x1b[32m${name}\x1b[0m started at http://localhost:${opts.port}`);
    });
  }

  loadRoutes() { // {{{1
    const  path = require('path');
    // something nice
    this.app.get('/', (req, res) => {
      res.json({
          name: 'DPRS API',
          status: 'running'
      });
    });

    Core.loadRouteModules(this.opts.endpoints, (module, file) => {

      if (!module) {
        console.warn(`Skipping empty module: ${file}`);
        return;
      }
      if (typeof module !== 'function') {
        console.warn(`\x1b[43m\x1b[30mInvalid route module in: ${file}\x1b[0m`);
        return;
      }
      const router = this.express.Router();
      this.app.use(this.opts.apiBasePath, module(router));
      console.log(`\x1b[32m${name}\x1b[0m loaded ${path.basename(file)}`);
    });
  }

  loadMiddlewares() {
    const commonMiddlewares = [
      this.express.json(),
      helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
      mongoSanitize(),
      cors(),
      this.express.urlencoded({ extended: true }),
    ];
    if (ENV !== 'production') {
      this.app.use(morgan('dev'));
    }
    this.app.use(commonMiddlewares);
  }

  async dbConnect(silent = false) { // {{{1
    const host = process.env.DB_HOST;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;

    const mongoUrl = new URL(`mongodb+srv://${host}/${dbName}`);
    mongoUrl.username = username;
    mongoUrl.password = password;
    try {
      await mongoose.connect(mongoUrl.toString(), {});
      if (!silent) {
        console.log('connected to mongodb');
      }
    }
    catch (error) {
      console.log('cannot connect to mongodb');
      mongoose.disconnect();
      setTimeout(this.dbConnect.bind(this), 5000);
    }
  }
}

module.exports = Server;
