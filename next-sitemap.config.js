/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ai-cms-mocha.vercel.app/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin", "/login"],
};
