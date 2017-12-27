/* globals MSUserAssetLibrary NSApp */

class VComponent {
  constructor(context, { name = '' } = {}) {
    this.name = name;

    const sketch = context.api();
    this.context = context;
    this.sketch = sketch;

    this.uikit = sketch.resourceNamed(`${name}.sketch`);
    this.assetLibrary = null;

    this.symbolMaster = null;
    this.symbolInstance = null;
    this.children = null;
    this.objectID = '';
  }

  getSymbolsFromLibrary() {
    const { uikit, sketch } = this;

    if (!uikit) {
      return false;
    }

    const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

    if (!assetLibrary) {
      sketch.alert('没有找到library', `文件路径${uikit}`);
      return false;
    }

    this.assetLibrary = assetLibrary;
    assetLibrary.loadSynchronously();

    const symbols = assetLibrary.document().allSymbols();
    return symbols;
  }

  findSymbolByPath(path) {
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
    const { context, assetLibrary, sketch } = this;

    if (!path) {
      sketch.message('path required');
      return false;
    }

    const symbol = this.findSymbolByPath(path);

    if (!symbol) {
      sketch.message(`没有找到symbol: ${path}`);
      return false;
    }

    this.symbolMaster = symbol;
    this.children = symbol.layers();

    const assetLibraryController = NSApp.delegate().librariesController();
    const documentData = context.document.documentData();
    const importedSymbol = assetLibraryController.importForeignSymbol_fromLibrary_intoDocument(
      symbol,
      assetLibrary,
      documentData,
    );

    const instance = importedSymbol.symbolMaster().newSymbolInstance();
    this.objectID = String(instance.objectID());
    this.symbolInstance = instance;

    return instance;
  }

  addLayers(instances) {
    const { context } = this;

    context.document.currentPage().addLayers(instances);
  }

  import(path) {
    const instance = this.createSymbolInstanceByPath(path);

    this.addLayers([instance]);
  }
}

export default VComponent;
