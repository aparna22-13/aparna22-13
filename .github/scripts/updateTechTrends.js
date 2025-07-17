const fs = require("fs");
const Parser = require("rss-parser");
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL("https://dev.to/feed");

  const trends = feed.items.slice(0, 5).map(item => `- [${item.title}](${item.link})`);
  const content = `<!--START_TECH_TRENDS-->\n${trends.join("\n")}\n<!--END_TECH_TRENDS-->`;

  const readme = fs.readFileSync("README.md", "utf8");
  const updated = readme.replace(/<!--START_TECH_TRENDS-->[\s\S]*<!--END_TECH_TRENDS-->/, content);

  fs.writeFileSync("README.md", updated);
})();
