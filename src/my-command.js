import { createWebview, dispatchToWebview, parseFilePath } from './utils';
import ContextManager from './ContextManager';
import Button from './VComponents/Button';
import List from './VComponents/List';
import Datepicker from './VComponents/Datepicker';

import store from './store';

function createComponentInstance(context, path) {
  const instance = (() => {
    const { root } = parseFilePath(path);
    const name = root.toLowerCase();
    switch (name) {
      case 'button':
      case 'icon':
        return new Button(context);
      case 'list':
        return new List(context);
      case 'datepicker':
        return new Datepicker(context);

      default:
        return null;
    }
  })();

  return instance;
}

export default function (context) {
  const ctm = new ContextManager(context);
  const { sketch } = ctm;

  const handlers = {
    appLoaded: () => {
      const payload = ctm.getSelectedLayerInfo();
      dispatchToWebview('SEARCH', payload, 'onload-sketch');
    },
    test: () => {
      const { selection } = ctm;
      sketch.log(selection);
    },
    select: objectID => {
      try {
        store.getByID(objectID).layer.select();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    deselect: objectID => {
      try {
        store.getByID(objectID).layer.deselect();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    duplicate: objectID => {
      try {
        const component = store.getByID(objectID);
        const layer = ctm.getLayerByID(objectID);

        const newlayer = layer.duplicate();
        const newComponent = component.copyWithLayer(newlayer);

        newComponent.layer.select();
        store.add(newComponent);
      } catch (error) {
        sketch.message(error.message);
      }
    },
    import: path => {
      try {
        const component = createComponentInstance(context, path);
        if (!component) {
          sketch.alert('生成component失败', `输入路径：${path}`);
          return;
        }
        component.import(path);

        store.add(component);

        component.layer.select();
      } catch (error) {
        sketch.log(error.stack);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
