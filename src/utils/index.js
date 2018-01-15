/* globals */

import WebUI from 'sketch-module-web-view';
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';

import Button from '../SketchComponents/Button';
import Bread from '../SketchComponents/Bread';
import List from '../SketchComponents/List';
import Datepicker from '../SketchComponents/Datepicker';
import Text from '../SketchComponents/Text';
import LongInput from '../SketchComponents/LongInput';
import ShortInput from '../SketchComponents/ShortInput';
import Radio from '../SketchComponents/Radio';
import Switch from '../SketchComponents/Switch';
import UploadFile from '../SketchComponents/UploadFile';
import Pagination from '../SketchComponents/Pagination';
import Rectangle from '../SketchComponents/Rectangle';
import Dropdown from '../SketchComponents/Dropdown';
import Picker from '../SketchComponents/Picker';
import Timepicker from '../SketchComponents/Timepicker';
import Checkbox from '../SketchComponents/Checkbox';
import Popover from '../SketchComponents/Popover';
import Menu from '../SketchComponents/Menu';
import Tips from '../SketchComponents/Tips';

const html = require('../../resources/index.html');

const IDENTIFIER = 'superKit.webView';

export function createWebview(context, handlers, title) {
  const options = {
    identifier: IDENTIFIER,
    x: 300,
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

export function createComponentInstance(context, name, payload) {
  const instance = (() => {
    switch (name) {
      case 'bread':
        return new Bread(context, payload);
      case 'button':
        return new Button(context, payload);
      case 'list':
        return new List(context, payload);
      case 'datepicker':
        return new Datepicker(context, payload);
      case 'text':
        return new Text(context, payload);
      case 'longInput':
        return new LongInput(context, payload);
      case 'shortInput':
        return new ShortInput(context, payload);
      case 'radio':
        return new Radio(context, payload);
      case 'switch':
        return new Switch(context, payload);
      case 'uploadFile':
        return new UploadFile(context, payload);
      case 'pagination':
        return new Pagination(context, payload);
      case 'rectangle':
        return new Rectangle(context, payload);
      case 'dropdown':
        return new Dropdown(context, payload);
      case 'picker':
        return new Picker(context, payload);
      case 'timepicker':
        return new Timepicker(context, payload);
      case 'checkbox':
        return new Checkbox(context, payload);
      case 'popover':
        return new Popover(context, payload);
      case 'menu':
        return new Menu(context, payload);
      case 'tips':
        return new Tips(context, payload);

      default:
        return null;
    }
  })();

  return instance;
}

/**
 *
 *
 * @export
 * @param {any} overridePoint
 * @param {string|string[]} names
 * @returns {boolean}
 */
export function isOverridePointName(overridePoint, names) {
  const layerName = String(overridePoint.layerName());
  return Array.isArray(names) ? names.includes(layerName) : layerName === names;
}

export function setFrame(
  layer,
  {
    x = layer.frame.x, y = layer.frame.y, width = layer.frame.width, height = layer.frame.height,
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

/**
 *
 *
 * @export
 * @param {string[]} args
 * @returns
 */
export function generatePath(...args) {
  return args.filter(p => !!p).join('/');
}

export function setAlignment(layer, target, alignment = 'left') {
  if (alignment === 'left' || !layer || !target) return;

  const targetSketchObject = target.sketchObject || target;
  const layerObject = layer.sketchObject || layer;
  const { width: targetWidth } = targetSketchObject.frame().size();
  const { width: layerWidth } = layerObject.frame().size();

  if (alignment === 'center') {
    const padding = (targetWidth - layerWidth) / 2;
    layerObject.frame().setX_(padding);
  } else if (alignment === 'right') {
    const left = targetWidth - layerWidth;
    layerObject.frame().setX_(left);
  }
}
