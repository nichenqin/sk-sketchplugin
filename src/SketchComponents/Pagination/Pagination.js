import SketchComponent from '../SketchComponent';
import { isOverridePointName, getRectOfNativeLayer, is } from '../../utils';

const option = {
  name: 'pagination',
};

class Pagination extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const { page, name } = this;
    const group = page.newGroup({ name });

    const arrowLeft = this.createSymbolInstanceByPath('pagination/arrowLeft/normal');
    const { width } = getRectOfNativeLayer(arrowLeft);
    const arrowRight = this.createSymbolInstanceByPath('pagination/arrowRight/normal');
    const pageItem = this.createSymbolInstanceByPath('pagination/page/normal');
    const pages = [...new Array(8)].map(() => pageItem.copy());

    const layers = [arrowLeft, ...pages, arrowRight];
    group.sketchObject.addLayers(layers);

    layers.forEach((layer, index) => {
      layer.frame().setX_((width + 5) * index);
    });

    group.adjustToFit();

    return group;
  }
}

export default Pagination;
