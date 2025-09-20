/**
 * BuiltByRays™ Static Site Worker
 * Serves static HTML, CSS, JS files and handles routing
 */

export interface Env {
  ENVIRONMENT?: string;
  SITE_NAME?: string;
  SITE_DOMAIN?: string;
}

// Cache configuration
const CACHE_TTL = 3600; // 1 hour

// Content types
const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".webmanifest": "application/manifest+json",
};

// SPA routing - redirect all non-API routes to index.html
const SPA_ROUTES = ["/", "/about-us", "/contact"];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    try {
      // Handle API routes (if any in the future)
      if (pathname.startsWith("/api/")) {
        return new Response(
          JSON.stringify({
            error: "API not implemented",
            message: "This is a static site",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Handle static files
      const response = await handleStaticFile(pathname, request);

      if (response) {
        return response;
      }

      // SPA fallback - serve index.html for all routes
      if (SPA_ROUTES.includes(pathname) || pathname.startsWith("/")) {
        return await serveIndexHTML(request, env);
      }

      // 404 for everything else
      return new Response("Not Found", { status: 404 });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

async function handleStaticFile(
  pathname: string,
  request: Request
): Promise<Response | null> {
  // Skip if it's a directory or doesn't have an extension
  if (!pathname.includes(".")) {
    return null;
  }

  // Get content type
  const ext = pathname.substring(pathname.lastIndexOf("."));
  const contentType = CONTENT_TYPES[ext] || "text/plain";

  // Try to fetch from KV (if available) or return null to fall back to SPA routing
  // For now, we'll let the SPA routing handle it
  return null;
}

async function serveIndexHTML(request: Request, env: Env): Promise<Response> {
  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <title>${env.SITE_NAME || "BuiltByRays™"}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Residential remodels, repairs, and custom builds in Central Indiana. Family-owned construction company serving the Indianapolis area.">
   <link rel="icon" href="/brand/favicon.png">
   <link rel="apple-touch-icon" href="/brand/favicon.png">
   <link rel="manifest" href="/manifest.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/brand/theme.css">
  <style>
    :root{--max:1100px;}
    *{box-sizing:border-box}html,body{margin:0;padding:0}
    body{font:16px/1.6 Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji" !important;color:var(--text);background:var(--bg);font-weight:400;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    a{color:var(--primary-green);text-decoration:none} a:hover{color:var(--primary-green-dark)}
    img{max-width:100%;height:auto;display:block}
    .container{max-width:var(--max);margin:0 auto;padding:0 20px}
    header{border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:0;z-index:10}
    .nav{display:flex;justify-content:space-between;align-items:center;padding:12px 0}
    .brand{display:flex;gap:10px;align-items:center}
    .brand img{height:56px}
    .menu{display:flex;gap:6px;align-items:center}
    .menu a{padding:8px 12px;border-radius:8px;color:var(--text)}
    .menu a:hover{background:var(--bg-alt);color:var(--primary-green)}
    .cta{display:inline-block;padding:10px 16px;border-radius:10px;background:var(--primary-green);color:#fff;font-weight:600;border:1px solid var(--primary-green)}
    .cta:hover{background:var(--primary-green-dark);border-color:var(--primary-green-dark);color:#fff}
    .hero.hero--home{background:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-home-1920.jpg') center/cover no-repeat;color:#fff}
    @media (min-width:1440px){.hero.hero--home{background-image:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-home-3840.jpg')}}
    @media (max-width:768px){.hero.hero--home{background-image:linear-gradient(135deg,rgba(6,95,70,.45),rgba(6,78,59,.45)),url('/hero/hero-home-mobile-1080.jpg')}}
    .hero.hero--about{background:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-about-1920.jpg') center/cover no-repeat;color:#fff}
    @media (min-width:1440px){.hero.hero--about{background-image:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-about-3840.jpg')}}
    @media (max-width:768px){.hero.hero--about{background-image:linear-gradient(135deg,rgba(6,95,70,.45),rgba(6,78,59,.45)),url('/hero/hero-about-mobile-1080.jpg')}}
    .hero.hero--contact{background:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-contact-1920.jpg') center/cover no-repeat;color:#fff}
    @media (min-width:1440px){.hero.hero--contact{background-image:linear-gradient(135deg,rgba(6,95,70,.55),rgba(6,78,59,.55)),url('/hero/hero-contact-3840.jpg')}}
    @media (max-width:768px){.hero.hero--contact{background-image:linear-gradient(135deg,rgba(6,95,70,.45),rgba(6,78,59,.45)),url('/hero/hero-contact-mobile-1080.jpg')}}
    .hero .inner{padding:72px 0}
    .hero h1{margin:0 0 8px;font-size:clamp(28px,5vw,44px);line-height:1.1}
    .hero p{margin:0 0 18px;color:#e8faf4}
    .grid{display:grid;gap:16px;grid-template-columns:repeat(12,1fr)}
    .col-12{grid-column:span 12}.col-8{grid-column:span 8}.col-4{grid-column:span 4}
    @media (max-width:900px){.col-8,.col-4{grid-column:span 12}}
    .card{border:1px solid var(--border);border-radius:12px;background:var(--bg-alt);padding:18px;box-shadow:0 1px 2px rgba(0,0,0,.05)}
    .section{padding:48px 0}.center{text-align:center}.muted{color:var(--text-muted)}
    .band{background:linear-gradient(135deg,var(--primary-green),var(--primary-green-dark));color:#fff}
    footer{background:var(--bg-alt);color:var(--text);border-top:1px solid var(--border)}
    footer a{color:var(--primary-green)}footer a:hover{color:var(--primary-green-dark)}
    .hamburger{display:none;border:1px solid var(--border);padding:6px 10px;border-radius:8px;background:var(--bg)}
    @media (max-width:720px){
      .menu{display:none}
      .menu.open{display:flex;flex-direction:column;align-items:flex-start;background:var(--bg);position:absolute;top:60px;left:0;right:0;padding:12px;border-top:1px solid var(--border)}
      .hamburger{display:block}
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <div class="brand">
        <a href="/"><img src="/brand/logo.svg" alt="${
          env.SITE_NAME || "BuiltByRays™"
        } logo"></a>
        <strong>${env.SITE_NAME || "BuiltByRays™"}</strong>
      </div>
      <nav aria-label="Main">
        <button id="hamburger" class="hamburger" aria-expanded="false" aria-controls="menu">Menu</button>
        <div id="menu" class="menu">
          <a href="/">Home</a>
          <a href="/about-us">About</a>
          <a href="/contact">Contact</a>
          <a class="cta" href="tel:+13177896362" aria-label="Call ${
            env.SITE_NAME || "BuiltByRays™"
          }">Call (317) 789-6362</a>
        </div>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero hero--home">
      <div class="container inner">
        <div class="grid">
          <div class="col-8">
            <h1>Over 15 years of trusted residential construction in Indiana</h1>
            <p>Family-owned. Quality-driven. From drywall fixes to dream kitchens—we make home feel like home again.</p>
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
              <a class="cta" href="/contact">Get a Free Estimate</a>
              <a href="mailto:info@builtbyrays.com">info@builtbyrays.com</a>
            </div>
          </div>
          <div class="col-4">
            <div class="card center">
              <p class="muted" style="margin:0">Call now</p>
              <h2 style="margin:.25rem 0 1rem">(317) 789-6362</h2>
              <a class="cta" href="tel:+13177896362">Tap to Call</a>
              <p class="muted" style="margin-top:10px">Let’s build something beautiful together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="center">Our Services</h2>
        <p class="center muted">Remodels, repairs, and custom builds—big or small.</p>
        <div class="grid" style="margin-top:18px">
          <div class="col-4">
            <div class="card center">
              <img src="/brand/logo.svg" alt="" width="64" height="64" style="margin:0 auto 8px">
              <h3>Home Repairs &amp; Handyman</h3>
              <p>From squeaky doors to drywall damage, fast fixes done right.</p>
              <p><a href="/contact">Request Repair →</a></p>
            </div>
          </div>
          <div class="col-4">
            <div class="card center">
              <img src="/brand/logo.svg" alt="" width="64" height="64" style="margin:0 auto 8px">
              <h3>Custom Carpentry</h3>
              <p>Shelving, pergolas, decks—crafted with purpose, built for life.</p>
              <p><a href="/contact">Get Quote →</a></p>
            </div>
          </div>
          <div class="col-4">
            <div class="card center">
              <img src="/brand/logo.svg" alt="" width="64" height="64" style="margin:0 auto 8px">
              <h3>Remodels &amp; Renovations</h3>
              <p>Kitchens, bathrooms, basements—design it bold, we make it real.</p>
              <p><a href="/contact">Start a Remodel →</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section band">
      <div class="container">
        <div class="grid">
          <div class="col-6">
            <h2>About ${env.SITE_NAME || "BuiltByRays™"}</h2>
            <p>${
              env.SITE_NAME || "BuiltByRays™"
            } is more than a name—it's a promise. Ray &amp; Blanca run their family-owned company with pride, precision, and people-first values.</p>
            <p>No gimmicks. No cutting corners. Just honest work, fair prices, and results that last.</p>
            <a class="cta" href="/contact">Contact Us</a>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="grid">
                <div class="col-6 center">
                  <h2 style="margin:0">100+</h2>
                  <p class="muted" style="margin:6px 0 0">Handyman jobs</p>
                </div>
                <div class="col-6 center">
                  <h2 style="margin:0">15+</h2>
                  <p class="muted" style="margin:6px 0 0">Years experience</p>
                </div>
                <div class="col-12" style="margin-top:10px">
                  <hr style="border:none;border-top:1px solid rgba(0,0,0,.1)">
                  <p style="margin:10px 0 0">“Turned an unused addition into the perfect in-law suite—in just a few days! Beautiful work and super professional.” — Velasquez, Indianapolis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="section">
    <div class="container center">
      <img src="/brand/logo.svg" alt="${
        env.SITE_NAME || "BuiltByRays™"
      } logo small" style="margin:0 auto 8px;height:56px">
      <p>Serving Central Indiana • Mon–Fri 8–6 • Sat–Sun 10–5</p>
      <p><a href="mailto:info@builtbyrays.com">info@builtbyrays.com</a> • <a href="tel:+13177896362">(317) 789-6362</a></p>
      <p class="muted">© <span id="y"></span> ${
        env.SITE_NAME || "BuiltByRays"
      }. <a href="/about-us#privacy">Privacy</a> · <a href="/about-us#terms">Terms</a></p>
    </div>
  </footer>

  <script>
    const y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    const btn = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    btn?.addEventListener("click", () => {
      const open = menu?.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": `public, max-age=${CACHE_TTL}`,
    },
  });
}
