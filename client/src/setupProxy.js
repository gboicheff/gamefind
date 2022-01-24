const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/steam", { target: "http://localhost:5000/" }));
  app.use(proxy("/steam/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/steam/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/steam/friends/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/steam/shared_multiplayer_games/*/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/steam/game-list/*", { target: "http://localhost:5000/" }));
};