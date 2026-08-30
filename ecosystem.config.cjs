module.exports = {
  apps: [
    {
      name: "webui-admin",
      script: "server/index.js",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
