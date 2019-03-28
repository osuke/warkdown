const fetch = require('node-fetch');
const fs = require('fs');
const TurndownService = require('turndown');
const turndownService = new TurndownService()

let posts = [];

const fetchContent = (url, pageNum = 1) => {
  fetch(`${url}?page=${pageNum}`)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (typeof json.length === 'undefined') {
        console.log('finish');
        return;
      }

      json.map(post => {
        const mdText = turndownService.turndown(post.content.rendered);
        fs.writeFile(`dist/${post.id}.md`, mdText, () => {});
      });

      fetchContent(url, pageNum + 1);
    });
};

fetchContent('https://blog.funxion.jp/wp-json/wp/v2/posts/');

//const markdown = turndownService.turndown('<h1>Hello world!</h1>')
//
//console.log(markdown);
