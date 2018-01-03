import { createWebview, dispatchToWebview } from './utils';
import ContextManager from './ContextManager';
import Button from './SketchComponents/Button';
import List from './SketchComponents/List';
import Datepicker from './SketchComponents/Datepicker';
import Text from './SketchComponents/Text';
import LongInput from './SketchComponents/LongInput';
import Radio from './SketchComponents/Radio';
import Switch from './SketchComponents/Switch';

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
      case 'radio':
        return new Radio(context, payload);
      case 'switch':
        return new Switch(context, payload);

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
  };

  createWebview(context, handlers, 'SuperKit');
}
