/* eslint-disable */
import WebUI from 'sketch-module-web-view';
import Button from './VComponents/Button';

export default function(context) {
  const webUI = new WebUI(context, require('../resources/index.html'), {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 240,
    height: 480,
    blurredBackground: true,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    frameLoadDelegate: {
      // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
      'webView:didFinishLoadForFrame:'(webView, webFrame) {
        context.document.showMessage('UI loaded!');
      },
    },
    handlers: {
      import(component) {
        try {
          const button = new Button(context);
          webUI.eval(`window.initComponent(${JSON.stringify(button)})`);
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
}
