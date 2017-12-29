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
      const { selection, document, page } = ctm;
      sketch.log(page);
      sketch.log(document);
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
    detach: objectID => {
      try {
        store.getByID(objectID).detach();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    remove: objectID => {
      try {
        store.getByID(objectID).layer.remove();
        store.removeByID(objectID);
        sketch.log(store.size());
      } catch (error) {
        sketch.message(error.message);
      }
    },
    duplicate: objectID => {
      try {
        const layer = ctm.getLayerByID(objectID);
        const component = store.getByID(objectID);

        const newlayer = layer.duplicate();
        const newComponent = component.copyWithLayer(newlayer);

        newComponent.layer.select();
        store.add(newComponent);
      } catch (error) {
        sketch.message(error.message);
      }
    },
    import: (name, payload) => {
      try {
        const component = createComponentInstance(context, name);
        if (!component) {
          sketch.alert('Failed to create component', `Name：${name}`);
          return;
        }

        component.import(payload);
        store.add(component);
        component.layer.select();
      } catch (error) {
        sketch.message(error.message);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
