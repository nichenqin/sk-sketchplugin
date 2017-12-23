/* globals log */
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
    import: c => {
      try {
        log(c);
        const sketch = context.api();
        const document = sketch.selectedDocument;
        const selection = document.selectedLayers;
        const page = document.selectedPage;

        const group = page.newArtboard({
          frame: new sketch.Rectangle(0, 0, 200, 200),
          name: 'Test',
        });
        // const image = group.newImage({ frame: new sketch.Rectangle(50, 50, 100, 100), imageURL });

        // log(selection.isEmpty);
        // selection.iterate(item => {
        //   log(item.name);
        // });
      } catch (error) {
        log(error);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
