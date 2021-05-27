module.exports = {
  app: {
    port: 3000,
    apiKey: 'AIzaSyDRoPeBNjI-obIyK4J4SKCWy-zrx6j1Mf0',
  },
  db: {
    connectionString: 'postgres://docker:docker@localhost',
    port: 1002,
    database: 'youtube-statistics'
  },
  rmq: {
    host: 'localhost'
  }
};
