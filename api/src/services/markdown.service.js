const markdown = require('markdown-wasm');

const renderMarkdown = async (source) => {
  const html = markdown.parse(source, {
    // eslint-disable-next-line no-bitwise
    parseFlags: markdown.ParseFlags.DEFAULT | markdown.ParseFlags.NO_HTML,
  });
  return html;
};

module.exports = {
  renderMarkdown,
};
