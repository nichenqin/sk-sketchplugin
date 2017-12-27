export default function generateContextManager(ctx) {
  class ContextManage {
    constructor(context) {
      this.context = context;

      const sketch = context.api();
      this.sketch = sketch;

      this.document = null;
      this.page = null;
      this.selection = null;

      this.objectID = '';
    }

    get layer() {
      if (!this.objectID) return null;
      return this.getLayerByID(this.objectID);
    }

    getCurrentContext() {
      const { sketch } = this;
      const document = sketch.selectedDocument;

      this.document = document;
      this.page = document.selectedPage;
      this.selection = document.selectedLayers;
    }

    getSelectedLayerInfo() {
      this.getCurrentContext();

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

      this.getCurrentContext();
      this.updateObjectID(objectID);

      const layer = document.layerWithID(objectID);

      return layer;
    }

    updateObjectID(objectID = '') {
      this.objectID = objectID;
    }
  }

  return new ContextManage(ctx);
}
