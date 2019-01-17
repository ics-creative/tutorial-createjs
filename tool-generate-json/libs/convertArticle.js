const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp').sync;
const {md} = require('./markdown-it');
const {convertTutorialUrl, convertDateFormat} = require('./utils');

/**
 * mdファイルから各記事の情報をパースしオブジェクトに変換します。
 *
 * @param mdFiles
 * @param exportDir
 * @returns {Array}
 */
const createData = (mdFiles, exportDir) => {
  const result = [];

  mdFiles.forEach((mdPath) => {
    const content = fs.readFileSync(mdPath, 'utf-8');
    const body = md.render(content);
    const meta = Object.assign({}, md.meta);

    meta.published_date = convertDateFormat(meta.published_date);
    meta.modified_date = convertDateFormat(meta.modified_date);
    meta.href = convertTutorialUrl(mdPath.replace(process.cwd(), ''), '/tutorial-createjs');

    const parse = path.parse(mdPath);
    const jsonPath = path.resolve(exportDir, `${parse.name}.json`);
    result.push(Object.assign({}, meta, {body, mdPath, jsonPath}))
  });

  return result
};

/**
 * 記事ごとの情報をJSONファイルに出力します。
 * @param articles
 */
const exportSingleArticle = (articles) => {
  articles.forEach((elem) => {
    const exportData = {
      title: elem.title,
      author: elem.author,
      published_date: elem.published_date,
      modified_date: elem.modified_date,
      body: elem.body,
      href: elem.href,
      // ogimage: elem.ogimage,
      // description: elem.description,
    };
    fs.writeFileSync(elem.jsonPath, JSON.stringify(exportData, null, 2), 'utf8')
  })
};

/**
 * 全記事のサマリーをJSONファイルに出力します。
 * @param articles
 * @param summaryFilePath
 */
const exportSummary = (articles, summaryFilePath) => {
  const summaryData = articles.map(elem => ({
    title: elem.title,
    author: elem.author,
    published_date: elem.published_date,
    modified_date: elem.modified_date,
    href: elem.href,
  }));

  fs.writeFileSync(summaryFilePath, JSON.stringify(summaryData))
};

/**
 * ファイルマップの情報をJSONに出力します。
 *
 * @param articles
 * @param fileMapFilePath
 */
const exportFileMap = (articles, fileMapFilePath) => {
  const fileMap = articles.map(elem => ({
    jsonPath: elem.jsonPath,
    mdPath: elem.mdPath,
    href: elem.href,
  }));
  fs.writeFileSync(fileMapFilePath, JSON.stringify(fileMap))
};

/**
 *
 * @param mdFiles
 * @param exportDir
 * @param summaryFilePath
 * @param fileMapFilePath
 */
const convertArticle = (mdFiles, exportDir, summaryFilePath, fileMapFilePath) => {
  const articles = createData(mdFiles, exportDir);

  mkdirp(exportDir);

  exportSingleArticle(articles);
  exportSummary(articles, summaryFilePath);
  exportFileMap(articles, fileMapFilePath);
};

module.exports = {
  convertArticle,
};