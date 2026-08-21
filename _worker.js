export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Keep the original engine address available to the enhanced subclass.
    // app.js imports ./sim.js normally; the worker swaps that request with sim-v2.
    if (url.pathname === '/src/sim.js' && !url.searchParams.has('base')) {
      const enhanced = new URL('/src/sim-v2.js', url);
      return env.ASSETS.fetch(new Request(enhanced, request));
    }

    // The modular source build is functionally equivalent to the bundled page,
    // but allows individual simulator modules to evolve without regenerating a bundle.
    let assetRequest = request;
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      const modular = new URL('/index.dev.html', url);
      assetRequest = new Request(modular, request);
    }

    const response = await env.ASSETS.fetch(assetRequest);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    if (!(url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/index.dev.html')) return response;

    return new HTMLRewriter()
      .on('head', { element(el) { el.append('<link rel="stylesheet" href="/enhancements.css">', { html: true }); } })
      .on('body', { element(el) { el.append('<script src="/enhancements.js" defer></script>', { html: true }); } })
      .transform(response);
  }
};
