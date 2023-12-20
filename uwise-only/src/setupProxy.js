const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v2/upload',
    createProxyMiddleware({
      target: 'https://sm.ms',
      changeOrigin: true,
    })
  );
};