/* globals */

import WebUI from 'sketch-module-web-view';
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';

const html = require('../../resources/index.html');

const IDENTIFIER = 'superKit.webView';

export function createWebview(context, handlers, title) {
  const options = {
    identifier: IDENTIFIER,
    x: 0,
    y: 0,
    width: 400,
    height: 700,
    blurredBackground: false,
    onlyShowCloseButton: true,
    title,
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: true,
    handlers,
  };
  const webUI = new WebUI(context, html, options);
  return webUI;
}

export function dispatchToWebview(action, payload, origin) {
  if (!isWebviewPresent(IDENTIFIER)) {
    return false;
  }

  const data = JSON.stringify({ action, payload, origin });
  sendToWebview(IDENTIFIER, `sketchBridge(${data});`);
  return true;
}

export function parseFilePath(path) {
  const reg = /[a-z](\/(w+)*)?/gi;
  if (!reg.test(path)) {
    throw new Error('文件路径格式错误');
  }

  const [root] = path.split('/');
  return { root };
}
