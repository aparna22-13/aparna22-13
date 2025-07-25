const fs = require('fs');
const axios = require('axios');

const sources = [
  { name: 'TechCrunch', url: 'https://techcrunch.com' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com' },
  { name: 'Dev.to', url: 'https://dev.to' },
];

const generateMarkdown = () => {
  const links = sources
    .map(source => `🔗 [${source.name}](${source.url})`)
    .join('\n');

  return `<!--START_TECH_TRENDS-->\n${links}\n<!--END_TECH_TRENDS-->`;
};

const updateReadme = () => {
  const readme = fs.readFileSync('README.md', 'utf8');

  const updated = readme.replace(
    /<!--START_TECH_TRENDS-->[\s\S]*<!--END_TECH_TRENDS-->/,
    generateMarkdown()
  );

  fs.writeFileSync('README.md', updated);
  console.log('✅ README updated with latest tech links');
};

updateReadme();
