import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils/index';

const option = {
  name: 'uploadFile',
};

class UploadFile extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ canDelete, status, fileName }) {
    const path = [this.name, canDelete ? 'canDelete' : '', status].filter(p => !!p).join('/');
    const instance = this.createSymbolInstanceByPath(path);
    const icon = this.createSymbolInstanceByPath('icon/placeholder');
    const iconDelete = this.createSymbolInstanceByPath('icon/delete');
    this.document.sketchObject.addLayer(instance);

    instance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'icon')) {
        instance.setValue_forOverridePoint(icon.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_delete')) {
        instance.setValue_forOverridePoint(iconDelete.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'file')) {
        instance.setValue_forOverridePoint(fileName, overridePoint);
      }
    });

    return instance;
  }
}

export default UploadFile;
