import SketchComponent from '../SketchComponent';

const option = {
  name: 'uploadImage',
};

class UploadFile extends SketchComponent {
  constructor(context, payload = {}) {
    super(context, payload, option);
  }

  import({ status = 'normal' }) {
    const instance = this.getInstanceByPath(`uploadImage/${status}`);

    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default UploadFile;
