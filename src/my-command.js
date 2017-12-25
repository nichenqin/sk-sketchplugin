/* globals log */
import { createWebview, dispatchToWebview, parseFilePath } from './utils';
import Button from './VComponents/Button';
import List from './VComponents/List';
import Datepicker from './VComponents/Datepicker';
import ContextManager from './utils/ctm';

function createComponentInstance(context, path) {
  const instance = (() => {
    const { root: name } = parseFilePath(path);
    switch (name.toLowerCase()) {
      case 'button':
      case 'icon':
        return new Button(context, name);
      case 'list':
        return new List(context, name);
      case 'datepicker':
        return new Datepicker(context, name);

      default:
        return null;
    }
  })();

  return instance;
}

export default function (context) {
  const ctm = new ContextManager(context);
  const sketch = context.api();
  const handlers = {
    appLoaded: () => {
      const payload = ctm.getSelectedLayerInfo();
      dispatchToWebview('SEARCH', payload, 'onload-sketch');
    },
    select: objectID => {
      const layer = ctm.getLayerByID(objectID);
      layer.select();
    },
    import: path => {
      try {
        const component = createComponentInstance(context, path);
        if (!component) {
          sketch.alert('生成component失败', `输入路径：${path}`);
          return;
        }
        component.import(path);
      } catch (error) {
        log(error);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
