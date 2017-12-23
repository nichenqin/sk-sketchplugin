import { createWebview, dispatchToWebview } from './utils';

function getSelectedLayer(context) {
  const sketchAPI = context.api();
  const { selectedLayers } = sketchAPI.selectedDocument;

  let selectedLayerName;
  selectedLayers.iterate(layer => {
    selectedLayerName = layer.name;
  });
  return selectedLayerName;
}

function checkForSelectedLayer(selectedLayerName) {
  if (!selectedLayerName) {
    return;
  }
  dispatchToWebview('SEARCH', String(selectedLayerName), 'onload-sketch');
}

export default function (context) {
  const selectedLayerName = getSelectedLayer(context);
  const handlers = {
    appLoaded: () => {
      checkForSelectedLayer(selectedLayerName);
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
