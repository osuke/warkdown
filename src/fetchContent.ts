import path from 'path';
import TurndownService from 'turndown';
import fetch from 'node-fetch';
import fs from 'fs';

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' });

const fetchContent = (url, outputDir, pageNum = 1) => {
  const dirPath = path.resolve(__dirname, outputDir);

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
        fs.statSync(dirPath);
      } catch(err) {
        fs.mkdir(dirPath, () => {});
      }

      json.map(post => {
        const mdText = turndownService.turndown(`<h1>${post.title.rendered}</h1>${post.content.rendered}`);

        fs.mkdir(`${dirPath}/${post.id}`, () => {
          fs.writeFile(`${dirPath}/${post.id}/README.md`, mdText, () => {});
        });
      });

      fetchContent(url, outputDir, pageNum + 1);
    });
};

export { fetchContent };