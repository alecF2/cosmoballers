import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  hydrateRoot(
    // @ts-expect-error: do not worry
    document, // eslint-disable-line @typescript-eslint/no-unsafe-argument
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
