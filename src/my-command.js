/* eslint-disable */
import WebUI from 'sketch-module-web-view';

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
          console.log('component', component);
          button.importComponent(context);
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
}
