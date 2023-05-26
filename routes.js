import { Router } from "@edgio/core";
import { starterRoutes } from "@edgio/starter";

export default new Router()
  .use(starterRoutes)
  .match("/", ({ serveStatic, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
      browser: false,
    });
    serveStatic("index.html");
  })
  .match("/favicon-image.jpg", ({ serveStatic, setResponseHeader, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 1,
      },
    });
    setResponseHeader("cache-control", "public, max-age=86400");
    serveStatic("favicon-image.jpg");
  });
