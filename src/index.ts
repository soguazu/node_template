/**
 * Runs the application
 */

import App from "./app";
import container from "./container";

const app = new App(container.cradle);
 
 app.start();
 
 process.on("SIGINT", app.shutdown.bind(app));
 
 process.on("SIGTERM", app.shutdown.bind(app));