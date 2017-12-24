/* globals log */
import { createWebview, dispatchToWebview, parseFilePath } from './utils';
import Button from './VComponents/Button';

function getSelectedLayer(context) {
  const sketch = context.api();
  const { selectedLayers } = sketch.selectedDocument;

  let selectedLayerName = '';
  selectedLayers.iterate(layer => {
    selectedLayerName = layer.name;
  });
  return selectedLayerName;
}

function checkForSelectedLayer(selectedLayerName) {
  const searchQuery = selectedLayerName ? String(selectedLayerName) : '';
  log(selectedLayerName);
  dispatchToWebview('SEARCH', searchQuery, 'onload-sketch');
}

function createComponentInstance(context, path) {
  const instance = (() => {
    const { root: name } = parseFilePath(path);
    switch (name) {
      case 'button':
      case 'icon':
        return new Button(context);

      default:
        return null;
    }
  })();

  return instance;
}

export default function (context) {
  const selectedLayerName = getSelectedLayer(context);
  const handlers = {
    appLoaded: () => {
      checkForSelectedLayer(selectedLayerName);
    },
    select: objectID => {
      log(objectID);
    },
    import: path => {
      try {
        const component = createComponentInstance(context, path);
        component.import(path);
      } catch (error) {
        log(error);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
