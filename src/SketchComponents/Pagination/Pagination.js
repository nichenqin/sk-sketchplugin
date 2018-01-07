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
    totalPage, marginRight, showLimit, showJump, currentPage, isSmall,
  }) {
    const maxPage = 7;
    const { page, name } = this;
    const group = page.newGroup({ name });
    const small = isSmall ? '/small' : '';

    let jumpInstance;
    let jumpPageInstance;
    let limitInstance;
    const arrowLeftInstance = this.createSymbolInstanceByPath(`pagination/arrowLeft${small}/normal`);
    const arrowRightInstance = this.createSymbolInstanceByPath(`pagination/arrowRight${small}/normal`);
    const pageActiceInstance = this.createSymbolInstanceByPath(`pagination/page${small}/active`);
    const pageItemInstance = this.createSymbolInstanceByPath(`pagination/page${small}/normal`);
    const { width } = getRectOfNativeLayer(pageItemInstance);

    let count;
    if (totalPage <= 1) count = 1;
    else if (totalPage > maxPage) count = maxPage;
    else count = totalPage;

    const pages = [...new Array(count)].map((val, index) =>
      (index + 1 === currentPage ? pageActiceInstance.copy() : pageItemInstance.copy()));

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
      const path = isSmall ? 'pagination/limit/show/small' : 'pagination/show/limit';
      limitInstance = this.createSymbolInstanceByPath(path);
      group.sketchObject.addLayer(limitInstance);
      limitInstance.frame().setX(group.frame.width + marginRight);
      group.adjustToFit();
    }

    if (showJump) {
      const jumpPagePath = `pagination/jumpPage/show${small}/normal`;
      jumpPageInstance = this.createSymbolInstanceByPath(jumpPagePath);
      group.sketchObject.addLayer(jumpPageInstance);
      jumpPageInstance.frame().setX(group.frame.width + marginRight);
      group.adjustToFit();

      const path = isSmall ? 'pagination/jump/show/small' : 'pagination/show/jump';
      jumpInstance = this.createSymbolInstanceByPath(path);
      group.sketchObject.addLayer(jumpInstance);
      jumpInstance.frame().setX(group.frame.width + marginRight);
      group.adjustToFit();
    }

    group.adjustToFit();
    this.createBgAtGroup(group);
    group.iterate(layer => {
      layer.sketchObject.setIsLocked_(true);
    });

    return group;
  }
}

export default Pagination;
