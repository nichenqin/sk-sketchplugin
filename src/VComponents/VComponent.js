/* globals MSUserAssetLibrary NSApp */

class VComponent {
  constructor(context, uikit = '') {
    this.name = 'superKit';

    const sketch = context.api();
    this.context = context;
    this.sketch = sketch;

    this.uikit = sketch.resourceNamed(uikit);
    this.assetLibrary = null;
    this.symbols = this.getSymbolsFromLibrary(this.uikit);
  }

  getSymbolsFromLibrary() {
    const { uikit } = this;

    if (!uikit) {
      return null;
    }

    const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);
    this.assetLibrary = assetLibrary;
    assetLibrary.loadSynchronously();

    const symbols = assetLibrary.document().allSymbols();
    return symbols;
  }

  findSymbolByName(name) {
    const { symbols } = this;

    let symbol = null;
    for (let i = 0; i < symbols.count(); i += 1) {
      const symbolName = String(symbols[i].name());
      if (name === symbolName) {
        symbol = symbols[i];
        break;
      }
    }

    return symbol;
  }

  import(name) {
    if (!name) {
      return;
    }

    const { context, assetLibrary, sketch } = this;

    if (!assetLibrary) {
      return;
    }

    const symbol = this.findSymbolByName(name);

    if (!symbol) {
      sketch.message(`没有找到symbol: ${name}`);
      return;
    }

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
