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
  const p = Array.isArray(path) ? path[0] : path;

  const reg = /[a-z](\/(w+)*)?/gi;
  if (!reg.test(p)) {
    throw new Error('文件路径格式错误');
  }

  const [root] = p.split('/');
  return { root };
}

export function is(layer, className) {
  return String(layer.className()) === className;
}

export function isOverridePointName(overridePoint, name) {
  return String(overridePoint.layerName()) === name;
}

export function setFrame(
  layer,
  {
    x = layer.frame.x,
    y = layer.frame.y,
    width = layer.frame.width,
    height = layer.frame.height,
  } = {},
) {
  /* eslint-disable no-param-reassign */
  layer.frame = {
    x,
    y,
    width,
    height,
  };
}

export function getRectOfNativeLayer(layer) {
  const frame = layer.frame();
  const { x, y } = frame.origin();
  const { width, height } = frame.size();
  return {
    x,
    y,
    width,
    height,
  };
}
