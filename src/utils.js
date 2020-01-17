'use strict';

const MARKDOWN_REGEX = /(?:__|[*#])|!\[(.*?)\]\(.*?.gif\)/;
const HTML_REGEX = /src\s*=\s*"(.+?).gif"/;

const hasGif = str => {
	return MARKDOWN_REGEX.test(str) || HTML_REGEX.test(str);
};

module.exports = {
	hasGif
};
