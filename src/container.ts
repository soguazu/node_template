import {
    InjectionMode,
    Lifetime,
    asClass,
    asFunction,
    asValue,
    createContainer,
} from "awilix";
import {logger, morganOption} from "@infra/logger/index";

import { MAX_FILE_UPLOAD_SIZE } from "@common/constants";
import MongoDB from "@infra/databases/MongoDBManger";
// import PaymentService from "infra/payments/Paystack";
// import StorageService from "infra/storage/Cloudinary";
import config from "@config/index";
import httpServer from "@interfaces/http/server";
import mongodbModels from "@src/infrastructure/databases/Mongodb/models";
import routes from "@interfaces/http/routes/router";
import { scopePerRequest } from "awilix-express";

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });
  
  container.register({
    config: asValue(config),
    db: asClass(MongoDB).singleton(),
    models: asValue(mongodbModels),
    logger: asValue(logger),
    maxFileUploadSize: asValue(MAX_FILE_UPLOAD_SIZE),
    containerMiddleware: asValue(scopePerRequest(container)),
    routes: asFunction(routes),
    httpServer: asClass(httpServer),
    morganOption: asValue(morganOption)
    // storageService: asClass(StorageService).singleton(),
    // paymentService: asClass(PaymentService).singleton(),
  });
  
  container.loadModules(
    [
      // Load use-cases
      [
        "app/**/*!(index.ts).ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
      // Load repositories
      [
        "infra/repositories/**/*.ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      formatName: "camelCase",
      resolverOptions: {},
      cwd: __dirname,
    },
  );
  
  container.loadModules(
    [
      // Load entities
      [
        "domain/entities/*!(index.ts).ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      resolverOptions: {},
      cwd: __dirname,
    },
  );

  container.loadModules(
    [
      // Load entities
      [
        "common/errors/*!(index.ts).ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      resolverOptions: {},
      cwd: __dirname,
    },
  );

  container.loadModules(
    [
      // Load entities
      [
        "infastructure/middlewares/*.ts",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      resolverOptions: {},
      cwd: __dirname,
    },
  );
  
  export default container;