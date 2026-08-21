export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    const url = new URL(request.url);
    if (!(url.pathname === '/' || url.pathname.endsWith('/index.html'))) return response;
    return new HTMLRewriter()
      .on('head', { element(el) { el.append('<link rel="stylesheet" href="/enhancements.css">', { html: true }); } })
      .on('body', { element(el) { el.append('<script src="/enhancements.js" defer></script>', { html: true }); } })
      .transform(response);
  }
};
