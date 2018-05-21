'use strict';
const path = require('path');

/**
 * egg-screenshot default config
 * https://github.com/GoogleChrome/puppeteer/blob/v1.4.0/docs/api.md#pagescreenshotoptions
 * @member Config#screenshot
 * @property {String} SOME_KEY - some description
 */
exports.screenshot = {
    client:{
        fullpage:false,
        type:'jpeg',
        quality:100 //图片质量
    }
};