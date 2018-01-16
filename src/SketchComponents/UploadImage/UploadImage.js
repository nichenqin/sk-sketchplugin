import SketchComponent from '../SketchComponent';

const option = {
  name: 'uploadImage',
};

class UploadFile extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const instance = this.getInstanceByPath('uploadImage/normal');

    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default UploadFile;
