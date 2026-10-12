// Ping IndexNow (Bing, Yandex, Seznam…) with every public URL after a production deploy.
// Usage: npm run indexnow   (run only against production)
const KEY = "2224321f25ccfb71e3754c8f22f2480f";
const HOST = "ordineermetico.com";
const paths = ["", "/the-firm", "/capabilities", "/markets", "/approach", "/news", "/careers", "/press", "/team", "/contact", "/legal-notice", "/privacy", "/cookies"];
const urlList = paths.flatMap((p) => [`https://${HOST}${p || "/"}`, `https://${HOST}/fr${p}`]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log("IndexNow:", res.status, res.statusText);
