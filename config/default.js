module.exports = {
  app: {
    port: 3000,
    apiKey: 'AIzaSyDRoPeBNjI-obIyK4J4SKCWy-zrx6j1Mf0',
  },
  db: {
    url:
      process.env.DATABASE_URL ||
      'postgres://docker:docker@localhost:1002/youtube-statistics',
  },
};
