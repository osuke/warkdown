import TurndownService from 'turndown';
import fetch from 'node-fetch';
import fs from 'fs';

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' });

const fetchContent = (url, outputDir, pageNum = 1) => {
  fetch(`${url}?page=${pageNum}`, {})
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (typeof json.length === 'undefined') {
        console.log('finish');
        return;
      }

      try {
        fs.statSync(outputDir);
      } catch(err) {
        fs.mkdir(outputDir, () => {});
      }

      json.map(post => {
        const mdText = turndownService.turndown(`<h1>${post.title.rendered}</h1>${post.content.rendered}`);

        fs.mkdir(`${outputDir}/${post.id}`, () => {
          fs.writeFile(`${outputDir}/${post.id}/README.md`, mdText, () => {});
        });
      });

      fetchContent(url, outputDir, pageNum + 1);
    });
};

export { fetchContent };