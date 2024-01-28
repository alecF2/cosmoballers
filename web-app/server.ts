import { createRequestHandler } from '@remix-run/express';
import express from 'express';

/* eslint-disable @typescript-eslint/indent */
const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then(async (vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );
/* eslint-enable @typescript-eslint/indent */

const app = express();

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    '/assets',
    express.static('build/client/assets', {
      immutable: true,
      maxAge: '1y',
    }),
  );
}

app.use(express.static('build/client', { maxAge: '1h' }));

// handle SSR requests
app.all(
  '*',
  createRequestHandler({
    // @ts-expect-error: ignore for now
    build: viteDevServer
      ? async () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
      : await import('./build/server/index.js'),
  }),
);

const port = 3000;

app.listen(port, () => {
  console.log(`dev server running on http://localhost:${port}`);
});
