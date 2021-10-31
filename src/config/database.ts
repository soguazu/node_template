const db = {
    host: {
      doc: "The database host",
      format: "*",
      default: "",
      env: "DATABASE_HOST",
      sensitive: false,
    },
    port: {
          doc: "The database port",
          format: "port",
          default: 27017,
          env: "DATABASE_PORT",
          sensitive: false,
        },
    name: {
      doc: "The database name",
      format: "*",
      default: "template",
      env: "DATABASE_NAME",
      sensitive: false,
    },
    user: {
      doc: "The database username",
      format: "*",
      default: "",
      env: encodeURIComponent("DATABASE_USER"),
      sensitive: true,
    },
    password: {
      doc: "The database password",
      format: "*",
      default: "",
      env: encodeURIComponent("DATABASE_PASSWORD"),
      sensitive: true,
    },
    auth: {
        doc: "The database auth",
        format: "*",
        default: "",
        env: "DATABASE_AUTH",
        sensitive: false,
      },
  };
  
  export default db;
  