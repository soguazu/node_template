const cache = {
    cacheHost: {
      doc: "The cache host",
      format: "*",
      default: "",
      env: "REDIS_HOST",
      sensitive: false,
    },
    cachePort: {
        doc: "The cache port",
        format: "port",
        default: 27018,
        env: "REDIS_PORT",
        sensitive: false,
      },
    cachePassword: {
      doc: "The cache password",
      format: "*",
      default: "",
      env: encodeURIComponent("REDIS_PASSWORD"),
      sensitive: true,
    },
  };
  
  export default cache;
  