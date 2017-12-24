/* globals log */
import { createWebview, dispatchToWebview, parseFilePath } from './utils';
import Button from './VComponents/Button';
import List from './VComponents/List';

function getSelectedLayer(context) {
  const sketch = context.api();
  const { selectedLayers } = sketch.selectedDocument;

  let layerName = '';
  let objectID = '';
  selectedLayers.iterate(layer => {
    layerName = String(layer.name);
    objectID = String(layer.id);
  });
  return { layerName, objectID };
}

function createComponentInstance(context, path) {
  const instance = (() => {
    const { root: name } = parseFilePath(path);
    switch (name.toLowerCase()) {
      case 'button':
      case 'icon':
        return new Button(context, name);
      case 'list':
        return new List(context, name);

      default:
        return null;
    }
  })();

  return instance;
}

export default function (context) {
  const sketch = context.api();
  const handlers = {
    appLoaded: () => {
      const payload = getSelectedLayer(context);
      dispatchToWebview('SEARCH', payload, 'onload-sketch');
    },
    select: objectID => {
      log(objectID);
    },
    import: path => {
      try {
        const component = createComponentInstance(context, path);
        if (!component) {
          sketch.message(`生成component失败，请检查路径${path}`);
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
