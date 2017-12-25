/* globals MSUserAssetLibrary NSApp */

class VComponent {
  constructor(context, name = '') {
    this.name = name;

    const sketch = context.api();
    this.context = context;
    this.sketch = sketch;

    this.uikit = sketch.resourceNamed(`${name}.sketch`);
    this.assetLibrary = null;

    this.symbol = null;
    this.objectID = '';
  }

  getSymbolsFromLibrary() {
    const { uikit } = this;

    if (!uikit) {
      return null;
    }

    const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

    if (!assetLibrary) {
      throw new Error('导入文件失败，请检查文件名');
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

  import(path) {
    if (!path) {
      return;
    }

    const { context, assetLibrary, sketch } = this;

    const symbol = this.findSymbolByPath(path);

    if (!symbol) {
      sketch.message(`没有找到symbol: ${path}`);
      return;
    }

    this.symbol = symbol;
    this.objectID = String(symbol.objectID());

    const assetLibraryController = NSApp.delegate().librariesController();
    const documentData = context.document.documentData();
    const importedSymbol = assetLibraryController.importForeignSymbol_fromLibrary_intoDocument(
      symbol,
      assetLibrary,
      documentData,
    );
    const instance = importedSymbol.symbolMaster().newSymbolInstance();
    context.document.currentPage().addLayers([instance]);
  }
}

export default VComponent;
