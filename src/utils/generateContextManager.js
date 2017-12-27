export default function generateContextManager(ctx) {
  class ContextManage {
    constructor(context) {
      this.context = context;
      this.sketch = context.api();
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
      return this.document.selecetdLayers;
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

      this.updateObjectID(objectID);

      const layer = document.layerWithID(objectID);

      return layer;
    }

    getSketchObjectByID(objectID) {
      const layer = this.getLayerByID(objectID);
      return layer.sketchObject;
    }

    updateObjectID(objectID = '') {
      this.objectID = objectID;
    }
  }

  return new ContextManage(ctx);
}
