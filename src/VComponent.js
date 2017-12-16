class VComponent {
  constructor(context) {
    this.name = 'tb-ui';
    this.context = context;
    this.pluginRoot = this.context.scriptPath
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent();
    this.sketch = context.api();
    this.document = this.sketch.selectedDocument;
    this.selection = this.document.selectedLayers;
    this.page = this.document.selectedPage;
  }
}

export default VComponent;
