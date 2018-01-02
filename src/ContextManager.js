/* globals MSUserAssetLibrary MSForeignSymbol */
import { is } from './utils';

class ContextManage {
  constructor(context) {
    this.context = context;
    this.sketch = context.api();

    this.assetLibrary = null;

    this.objectID = '';
    this.allSymbols = null;
    this.symbolLibrary = {};
  }

  get layer() {
    if (!this.objectID) return null;
    return this.getLayerByID(this.objectID);
  }

  get sketchObject() {
    return this.layer.sketchObject;
  }

  get document() {
    return this.sketch.selectedDocument;
  }

  get page() {
    return this.document.selectedPage;
  }

  get selection() {
    return this.document.selectedLayers;
  }

  get nativeLayers() {
    return this.selection.nativeLayers;
  }

  getSelectedLayerInfo() {
    const { selection } = this;

    let layerName = '';
    let objectID = '';
    selection.iterate(layer => {
      layerName = String(layer.name);
      objectID = String(layer.id);
    });

    return { layerName, objectID };
  }

  getLayerByID(objectID) {
    const { document, sketch } = this;

    if (!objectID) {
      sketch.message('objectID required');
      return false;
    }

    const layer = document.layerWithID(objectID);
    if (!layer) {
      throw new Error(`layer not found with objectID: ${objectID}`);
    }

    return layer;
  }

  updateObjectID(objectID) {
    this.objectID = String(objectID);
    return this;
  }

  getSymbolsFromLibrary() {
    const { uikit } = this;

    if (!this.assetLibrary) {
      if (!uikit) {
        throw new Error('uikit required');
      }

      const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

      if (!assetLibrary) {
        throw new Error('asset library not found');
      }

      assetLibrary.loadSynchronously();
      this.assetLibrary = assetLibrary;
    }

    const symbols = this.assetLibrary.document().allSymbols();
    this.allSymbols = symbols;
    return symbols;
  }

  getSymbolByPath(path) {
    const symbols = this.allSymbols || this.getSymbolsFromLibrary();
    if (!symbols.count()) {
      throw new Error('Tried to open library but no symbol found inside the file');
    }

    let symbol = null;
    for (let i = 0; i < symbols.count(); i += 1) {
      const symbolName = String(symbols[i].name());
      if (path === symbolName) {
        symbol = symbols[i];
        break;
      }
    }
    this.symbolLibrary[path] = symbol;
    return symbol;
  }

  createSymbolInstanceByPath(path) {
    const { context, assetLibrary } = this;

    if (!path) {
      throw new Error('path required');
    }

    const symbol = this.symbolLibrary[path] || this.getSymbolByPath(path);
    if (!symbol) {
      throw new Error(`symbol not found in path: ${path}`);
    }

    const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(symbol, assetLibrary);
    context.document.documentData().addForeignSymbol(foreignSymbol);

    const symbolMaster = foreignSymbol.symbolMaster();
    const instance = symbolMaster.newSymbolInstance();

    this.objectID = String(instance.objectID());

    return instance;
  }

  addLayers(instances) {
    const { context } = this;

    context.document.currentPage().addLayers(instances);
  }
}

export default ContextManage;
