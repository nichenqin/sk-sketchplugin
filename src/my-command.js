import { createWebview, dispatchToWebview, parseFilePath } from './utils';
import ContextManager from './ContextManager';
import Button from './VComponents/Button';
import List from './VComponents/List';
import Datepicker from './VComponents/Datepicker';
import Text from './VComponents/Text';
import LongInput from './VComponents/LongInput';

import store from './store';

function createComponentInstance(context, name, payload) {
  const instance = (() => {
    switch (name.toLowerCase()) {
      case 'button':
        return new Button(context, payload);
      case 'list':
        return new List(context, payload);
      case 'datepicker':
        return new Datepicker(context, payload);
      case 'text':
        return new Text(context, payload);
      case 'long-input':
        return new LongInput(context, payload);

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
      try {
        sketch.log(ctm.nativeLayers);
      } catch (error) {
        sketch.message(error.message);
      }
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
        // TODO: replace with a new component instance
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
    replace: (objectID, path) => {
      try {
        const component = store.getByID(objectID);
        component.replaceSymbolWith(path);
      } catch (error) {
        sketch.message(error.message);
      }
    },
    import: (name, payload) => {
      try {
        const component = createComponentInstance(context, name, payload);

        if (!component) {
          sketch.alert('Failed to create component', `Name：${name}`);
          return;
        }
      } catch (error) {
        sketch.message(error.message);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
