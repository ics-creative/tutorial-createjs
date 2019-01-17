/**
 * Convert local path to link url
 * @param filePath /note/markdown/2017-11-17-mac-global-env.md 形式のパス
 * @returns {string}
 */
const sourceFileNameToUrl = (filePath) => {
  const deleteExt = filePath.replace('.md', '');
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1];
  const splitArray = fileName.split('-');
  return `/entry/${splitArray.slice(0, 3).join('-')}/${splitArray.slice(3).join('-')}`;
};

const convertTutorialUrl = (filePath, baseURL) => {
  const deleteExt = filePath.replace('.md', '');
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1];
  return `${baseURL}/${fileName}`;
};

/**
 * Convert string date format value to YYYY/MM/DD
 * @param dateString 2018-05-21T00:00:00.000Z
 * @returns {string}
 */
const convertDateFormat = (dateString) => {
  const date = new Date(dateString);
  const year = `0000${date.getFullYear()}`.slice(-4);
  const month = `00${date.getMonth() + 1}`.slice(-2);
  const day = `00${date.getDate()}`.slice(-2);

  return `${year}/${month}/${day}`
};

module.exports = {
  sourceFileNameToUrl,
  convertDateFormat,
  convertTutorialUrl,
};