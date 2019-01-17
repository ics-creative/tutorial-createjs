#!/usr/bin/env node

const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');

const { convertArticle } = require('./libs/convertArticle');

// ベースディレクトリのパスを生成
const baseImportDir = path.resolve(process.cwd(), '../docs/');
const baseExportDir = path.resolve(process.cwd(), '../json/');

// mdファイルを取得
const globPath = path.resolve(baseImportDir, `**/**.md`);
const mdFiles = glob.sync(globPath);

// 各出力フォルダのパスを生成
const summaryFilePath = path.resolve(baseExportDir, '_summary.json');
const fileMapFilePath = path.resolve(baseExportDir, '_filemap.json');

// mdからJSONファイルを生成
rimraf.sync(baseExportDir);
convertArticle(mdFiles, baseExportDir, summaryFilePath, fileMapFilePath);
