import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'pagination',
};

class Pagination extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);

    this.jump = true;
  }

  import({
    totalPage, marginRight, showLimit, showJump, currentPage,
  }) {
    const maxPage = 7;
    const { page, name } = this;
    const group = page.newGroup({ name });

    let jumpInstance;
    let limitInstance;
    const arrowLeftInstance = this.createSymbolInstanceByPath('pagination/arrowLeft/normal');
    const arrowRightInstance = this.createSymbolInstanceByPath('pagination/arrowRight/normal');
    const pageActiceInstance = this.createSymbolInstanceByPath('pagination/page/active');
    const pageItemInstance = this.createSymbolInstanceByPath('pagination/page/normal');
    const { width } = getRectOfNativeLayer(pageItemInstance);

    let count;
    if (totalPage <= 1) count = 1;
    else if (totalPage > maxPage) count = maxPage;
    else count = totalPage;

    const pages = [...new Array(count)].map(() => pageItemInstance.copy());
    pages.splice(currentPage - 1, 1, pageActiceInstance);

    const instances = [arrowLeftInstance, ...pages, arrowRightInstance];
    group.sketchObject.addLayers(instances);

    const gap = width + marginRight < width ? width : width + marginRight;
    instances.forEach((layer, index) => {
      layer.frame().setX_(gap * index);
    });

    pages.forEach((p, index) => {
      const value = (() => {
        if (totalPage <= maxPage) return String(index + 1);

        switch (index) {
          case pages.length - 2:
            return '...';
          case pages.length - 1:
            return String(totalPage);

          default:
            return String(index + 1);
        }
      })();
      p.overridePoints().forEach(overridePoint => {
        p.setValue_forOverridePoint(value, overridePoint);
      });
    });

    group.adjustToFit();

    if (showLimit) {
      limitInstance = this.createSymbolInstanceByPath('pagination/show/limit');
      const { width: groupWidth } = group.frame;
      group.sketchObject.addLayer(limitInstance);
      limitInstance.frame().setX(groupWidth + marginRight);
      group.adjustToFit();
    }

    if (showJump) {
      jumpInstance = this.createSymbolInstanceByPath('pagination/show/jump');
      const { width: groupWidth } = group.frame;
      group.sketchObject.addLayer(jumpInstance);
      jumpInstance.frame().setX(groupWidth + marginRight);
      group.adjustToFit();
    }

    group.adjustToFit();

    return group;
  }
}

export default Pagination;
