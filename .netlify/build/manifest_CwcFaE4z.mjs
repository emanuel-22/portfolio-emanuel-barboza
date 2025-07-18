import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DC8VT8Wk.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/","cacheDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/node_modules/.astro/","outDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/dist/","srcDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/src/","publicDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/public/","buildClientDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/dist/","buildServerDir":"file:///home/emanuel/Documents/portfolio-emanuel-barboza/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BipVTgDs.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/emanuel/Documents/portfolio-emanuel-barboza/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CwcFaE4z.mjs","/home/emanuel/Documents/portfolio-emanuel-barboza/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/emanuel/Documents/portfolio-emanuel-barboza/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BlZmLCNm.mjs","/home/emanuel/Documents/portfolio-emanuel-barboza/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DbQTjYf3.js","/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/Projects.astro?astro&type=script&index=0&lang.ts":"_astro/Projects.astro_astro_type_script_index_0_lang.swmrw298.js","/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.CR1h6N7j.js","/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/TypewriterText.astro?astro&type=script&index=0&lang.ts":"_astro/TypewriterText.astro_astro_type_script_index_0_lang.H-A9HyVh.js","/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.BUYXuHTJ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/emanuel/Documents/portfolio-emanuel-barboza/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");"],["/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/Projects.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const n=document.getElementById(\"carousel-container\");if(!n)return;const t=Array.from(n.children);let e=0;function r(){return t[0].offsetWidth+32}function a(){const d=r(),s=t.length;e=(e%s+s)%s;const i=s-2;let c;e>i?c=d*i:c=d*e,n&&(n.style.transform=`translateX(-${c}px)`),t.forEach((o,l)=>{o.classList.add(\"scale-90\",\"opacity-60\"),o.classList.remove(\"scale-100\",\"opacity-100\")}),t[e].classList.remove(\"scale-90\",\"opacity-60\"),t[e].classList.add(\"scale-100\",\"opacity-100\"),t[(e+1)%s]&&(t[(e+1)%s].classList.remove(\"scale-100\",\"opacity-100\"),t[(e+1)%s].classList.add(\"scale-90\",\"opacity-80\"))}document.getElementById(\"prev\")?.addEventListener(\"click\",()=>{e--,a()}),document.getElementById(\"next\")?.addEventListener(\"click\",()=>{e++,a()}),a(),window.addEventListener(\"resize\",a)});"],["/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/Contact.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const a=document.getElementById(\"contact-form\");if(!(a instanceof HTMLFormElement)){console.error(\"El elemento del formulario no fue encontrado.\");return}a.addEventListener(\"submit\",async t=>{t.preventDefault();const e=t.target.elements,n={firstname:e.namedItem(\"firstname\")?.value||\"\",lastname:e.namedItem(\"lastname\")?.value||\"\",phonenumber:e.namedItem(\"phonenumber\")?.value||\"\",email:e.namedItem(\"email\")?.value||\"\",subject:e.namedItem(\"subject\")?.value||\"\",message:e.namedItem(\"message\")?.value||\"\",\"form-name\":\"contact\",\"bot-field\":\"\"};try{await fetch(\"/\",{method:\"POST\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\"},body:new URLSearchParams(n).toString()}),console.log(\"¡Mensaje enviado! Gracias por contactarte, responderé pronto.\"),a.reset(),alert(\"¡Mensaje enviado! Gracias por contactarte, responderé pronto.\")}catch(r){alert(\"Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.\"),console.error(\"Error al enviar el formulario:\",r)}})});"],["/home/emanuel/Documents/portfolio-emanuel-barboza/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"theme-selector\")?.addEventListener(\"click\",()=>{localStorage.theme===\"dark\"?(localStorage.theme=\"light\",document.documentElement.classList.remove(\"dark\"),document.documentElement.classList.add(\"light\")):(localStorage.theme=\"dark\",document.documentElement.classList.remove(\"light\"),document.documentElement.classList.add(\"dark\"))});"]],"assets":["/_astro/onest-latin-wght-normal.CUIqqgP9.woff2","/_astro/onest-cyrillic-wght-normal.DXI_y_WF.woff2","/_astro/onest-latin-ext-wght-normal.CnNj8hVb.woff2","/_astro/index.BipVTgDs.css","/favicon.svg","/_astro/TypewriterText.astro_astro_type_script_index_0_lang.H-A9HyVh.js","/projects/about_me_photo.jpg","/projects/profile.png","/projects/profile_chica.png","/projects/project1.jpg","/projects/project2.jpg","/projects/project3.jpg","/projects/project4.jpg","/projects/project5.jpg","/projects/project6.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"jZe5mIQ7C4g9P4NzyYYigOQglg2i3BjiHn83M6aVVQ0=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/emanuel/Documents/portfolio-emanuel-barboza/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
