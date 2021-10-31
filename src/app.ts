import { Logger } from 'winston';
/**
 * Manages application interfaces e.g REST server, gRPC server
 */
 class App {
   private readonly httpServer: any;
   private readonly logger: Logger;
   private readonly db: any;

    constructor({ httpServer, logger, db }: any) {
      this.httpServer = httpServer;
      this.logger = logger;
      this.db = db;
    }
  
    /**
     * Starts the application interfaces to begin handling user requests
     */
    async start() {
      await this.db.connect();
      await this.httpServer.start();
    }
  
    /**
     * Closes the application's interfaces
     */
    shutdown() {
      this.httpServer.close(async (error: Error) => {
        this.logger.info("Shutting down REST server");
        if (error) {
          this.logger.error("Error while shutting down server", {
            error: error.toString(),
          });
        }
        await this.db.close();
        process.exit(error ? 1 : 0);
      });
    }
  }
  
  export default App;