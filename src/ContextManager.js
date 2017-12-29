/* globals MSUserAssetLibrary MSForeignSymbol */
import { is } from './utils';

class ContextManage {
  constructor(context) {
    this.context = context;
    this.sketch = context.api();

    this.assetLibrary = null;

    this.sketchObject = null;
    this.objectID = '';
  }

  get layer() {
    if (!this.objectID) return null;
    return this.getLayerByID(this.objectID);
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
    this.updateObjectID(objectID);

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

    this.updateObjectID(objectID);

    return layer;
  }

  getSketchObjectByID(objectID) {
    const layer = this.getLayerByID(objectID);
    return layer.sketchObject;
  }

  updateObjectID(objectID) {
    this.objectID = objectID;
    return this;
  }

  updateSketchObject(sketchObject) {
    this.sketchObject = sketchObject;
    return this;
  }

  getSymbolsFromLibrary() {
    const { uikit } = this;

    if (!uikit) {
      throw new Error('uikit required');
    }

    const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

    if (!assetLibrary) {
      throw new Error('asset library not found');
    }

    this.assetLibrary = assetLibrary;
    assetLibrary.loadSynchronously();

    const symbols = assetLibrary.document().allSymbols();
    return symbols;
  }

  getSymbolByPath(path) {
    const { sketch } = this;
    const symbols = this.getSymbolsFromLibrary();

    if (!symbols.count()) {
      sketch.message('Tried to open library but no symbol found inside the file');
      return false;
    }

    let symbol = null;

    for (let i = 0; i < symbols.count(); i += 1) {
      const symbolName = String(symbols[i].name());
      if (path === symbolName) {
        symbol = symbols[i];
        break;
      }
    }

    return symbol;
  }

  createSymbolInstanceByPath(path) {
    const { context, assetLibrary } = this;

    if (!path) {
      throw new Error('path required');
    }

    const symbol = this.getSymbolByPath(path);

    if (!symbol) {
      throw new Error(`symbol not found in path: ${path}`);
    }

    const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(symbol, assetLibrary);
    context.document.documentData().addForeignSymbol(foreignSymbol);

    const symbolMaster = foreignSymbol.symbolMaster();
    const instance = symbolMaster.newSymbolInstance();

    this.objectID = String(instance.objectID());
    this.sketchObject = instance;

    return instance;
  }

  replaceSymbolWith(path) {
    const { sketchObject } = this;
    if (!is(sketchObject, 'MSSymbolInstance')) {
      throw new Error('You can only replace a symbol instance');
    }

    const instance = this.createSymbolInstanceByPath(path);
    console.log(instance);
    const newInstance = sketchObject.replaceWithInstanceOfSymbol(instance);
    console.log(newInstance);
  }

  detach() {
    const { sketchObject } = this;
    if (!is(sketchObject, 'MSSymbolInstance')) {
      throw new Error('You can only detach symbol');
    }

    const layer = sketchObject.detachByReplacingWithGroup();

    this.updateObjectID(layer.objectID());

    return layer;
  }

  addLayers(instances) {
    const { context } = this;

    context.document.currentPage().addLayers(instances);
  }
}

export default ContextManage;
