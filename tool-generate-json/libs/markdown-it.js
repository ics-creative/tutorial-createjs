const fs = require('fs');
const md = require('markdown-it')();
const hljs = require('highlight.js');
const emoji = require('markdown-it-emoji');
const container = require('markdown-it-container');
const mark = require('markdown-it-mark');
const meta = require('markdown-it-meta');
const anchor = require('markdown-it-anchor');
const toc = require('markdown-it-table-of-contents');
const sharp = require('sharp');
const sizeOf = require('image-size');

md.set({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'hljs language-',
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {
        console.log(__)
      }
    }
    return ''
  },
});

md.use(emoji)
  .use(container)
  .use(mark)
  .use(meta)
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
  })
  .use(toc, {
    slugify: anchor.defaults.slugify,
    includeLevel: [2, 3],
  });

// toc custom
md.renderer.rules.toc_open = () => '<div class="table-of-contents"><div class="toc-title">- table of contents -</div>';
md.renderer.rules.toc_close = () => '</div>';

// link custom
const defaultRender = md.renderer.rules.link_open || function render(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
};

const defaultImageRender = md.renderer.rules.image || function render(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
};
/**
 * 画像タグを書き換えを行います。
 *
 * @param tokens
 * @param idx
 * @param options
 * @param env
 * @param self
 * @returns {*}
 */
md.renderer.rules.image = function (tokens, idx, options, env, self) {

  const responsiveSize = [960, 640, 400];

  const token = tokens[idx];
  const aIndex = token.attrIndex('src');
  const filename = token.attrs[aIndex][1];
  const filePath = filename.split(/\.(?=[^.]+$)/);

  let srcset = [];

  try {
    // 画像のメタデータを取得
    const image = sharp(filename);
    const metadata = sizeOf(filename);

    // 各種サイズにリサイズしwebp形式で保存します。既にリサイズ画像がある場合は処理は行いません。（一旦非同期処理で実行）
    responsiveSize.forEach((size) => {
      const outputName = `${filePath[0]}-${size}.webp`;
      fs.access(outputName, function (err) {
        if (err) {
          if (err.code === 'ENOENT') {
            image
              .resize(size)
              .webp()
              .toFile(outputName);
          }
          else {
            console.error(err);
          }
        }
      });
      srcset.push(`${outputName} ${size}w`);
    });
    const meta = image.metadata().then((metadata) => {
      return metadata;
    });
    return `<amp-img srcset="${srcset.join(`, `)}" src="${filename}" width="${metadata.width}" height="${metadata.height}" alt="${token.content}" layout="responsive"></amp-img>`;
  } catch (e) {
    console.log(e);
    // pass token to default renderer.
    return defaultImageRender(tokens, idx, options, env, self);
  }
};

const defaultLinkOpenRender = md.renderer.rules.link_open || function render(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
};
const defaultLinkCloseRender = md.renderer.rules.link_close || function render(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
};
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const tokensLocal = tokens;
  const hrefIndex = tokensLocal[idx].attrIndex('href');

  if (hrefIndex >= 0) {
    const link = tokensLocal[idx].attrs[hrefIndex];
    const href = link[1];
    const isExternal = /^https?:/.test(href) && !/\/\/ics.media\//.test(href);

    if (isExternal) {
      const aIndex = tokensLocal[idx].attrIndex('target');
      if (aIndex >= 0) {
        tokensLocal[idx].attrs[aIndex][1] = '_blank'
      } else {
        tokensLocal[idx].attrPush(['target', '_blank'])
      }
    }
  }

  // pass token to default renderer.
  return defaultLinkOpenRender(tokensLocal, idx, options, env, self);
};

md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
  // pass token to default renderer.
  return defaultLinkCloseRender(tokens, idx, options, env, self);
};

module.exports = {
  md,
};