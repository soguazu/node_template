import {Server, createServer} from "http";

import { Config } from 'convict';
import { Logger } from 'winston';
import express from "express";
import path from "path";

/**
 * Creates and configures an HTTP server
 */

/**
 * @todo remember to add route to the contructor from container
 */

class HttpServer {
  private readonly config: Config<any>;
  private readonly server: Server;
  private readonly logger: Logger
  public port: string;
  public serviceName: string;
  public version: string

  constructor({ config, logger, routes }: any) {
    const app = express();
    app.disable("x-powered-by");
    // URL for API documentation
    app.use("/rest-docs", express.static(path.resolve(__dirname, "../../../docs/apidocs/")));
    app.use(routes);
    this.server = createServer(app);
    this.config = config;
    this.logger = logger;
    this.port = config.get('app.port');
    this.serviceName = config.get('app.serviceName')
    this.version = config.get('app.version');
  }

  async start() {
    return this.server.listen(this.port, () => {
      this.logger.info(`REST server for 
      ${this.serviceName} v${this.version} 
      listening on port ${this.port}`);
    });
  }

  close(cb: any) {
    return this.server.close(cb);
  }
}

export default HttpServer;