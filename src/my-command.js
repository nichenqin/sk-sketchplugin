import { createWebview, dispatchToWebview, createComponentInstance } from './utils';
import ContextManager from './ContextManager';
import Button from './SketchComponents/Button';

import store from './store';

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
        console.log([...store.keys()]);
      } catch (error) {
        sketch.message(error.message);
      }
    },
    select: objectID => {
      try {
        const { layer } = store.get(objectID);
        layer.select();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    deselect: objectID => {
      try {
        const { layer } = store.get(objectID);
        layer.deselect();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    remove: objectID => {
      try {
        const { component } = store.get(objectID);
        component.remove();
      } catch (error) {
        sketch.message(error.message);
      }
    },
    duplicate: objectID => {
      try {
        const { layer, component } = store.get(objectID);
        component.copyWithLayer(layer);
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
    'button:updateText': (objectID, text) => {
      try {
        const { component: button } = store.get(objectID);
        if (!button || !(button instanceof Button)) {
          throw new TypeError();
        }

        button.updateText(text);
      } catch (error) {
        sketch.message(error.message);
      }
    },
    'button:updatePath': (objectID, path) => {
      try {
        const { component: button } = store.get(objectID);
        if (!button || !(button instanceof Button)) {
          throw new TypeError();
        }

        button.replaceWithPath(path);
      } catch (error) {
        sketch.message(error.message);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
