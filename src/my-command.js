/* globals log NSApp MSUserAssetLibrary */
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

        const uikit = sketch.resourceNamed('button.sketch');

        const assetLibraryController = NSApp.delegate().librariesController();
        assetLibraryController.addAssetLibraryAtURL(uikit);

        const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);
        assetLibrary.loadSynchronously();
        const symbols = assetLibrary.document().allSymbols();
        log(symbols[0]);
        log(symbols[0].objectID());

        const documentData = context.document.documentData();
        const importedSymbol = assetLibraryController.importForeignSymbol_fromLibrary_intoDocument(
          symbols[0],
          assetLibrary,
          documentData,
        );
        const instance = importedSymbol.symbolMaster().newSymbolInstance();
        context.document.currentPage().addLayers([instance]);
      } catch (error) {
        log(error);
      }
    },
  };

  createWebview(context, handlers, 'SuperKit');
}
