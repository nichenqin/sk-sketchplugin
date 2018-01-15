import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'pagination',
};

class Pagination extends SketchComponent {
  constructor(
    context,
    payload = {
      totalPage: 10,
      showLimit: false,
      showJump: false,
      currentPage: 1,
      isSmall: false,
    },
  ) {
    super(context, payload, option);

    this.jump = true;
  }

  import({
    totalPage, marginRight = 10, showLimit = false, showJump = false, currentPage = 1, isSmall = false,
  }) {
    const maxPage = 7;
    const { page, name } = this;
    const group = page.newGroup({ name });
    const small = isSmall ? '/small' : '';

    let jumpInstance;
    let jumpPageInstance;
    let limitInstance;
    const arrowLeftInstance = this.getInstanceByPath(`pagination/arrowLeft${small}/normal`);
    const arrowRightInstance = this.getInstanceByPath(`pagination/arrowRight${small}/normal`);
    const pageActiveInstance = this.getInstanceByPath(`pagination/page${small}/active`);
    const pageItemInstance = this.getInstanceByPath(`pagination/page${small}/normal`);
    const { width } = getRectOfNativeLayer(pageItemInstance);

    let count;
    if (totalPage <= 1) count = 1;
    else if (totalPage > maxPage) count = maxPage;
    else count = totalPage;

    const pages = [...new Array(count)].map((val, index) => {
      if (totalPage <= maxPage) {
        return {
          value: index + 1,
          instance: index + 1 === currentPage ? pageActiveInstance.copy() : pageItemInstance.copy(),
        };
      }

      switch (index) {
        case 0:
          return {
            value: 1,
            instance: currentPage === 1 ? pageActiveInstance.copy() : pageItemInstance.copy(),
          };
        case 1:
          return {
            value: currentPage > 4 ? '...' : index + 1,
            instance: currentPage === 2 ? pageActiveInstance.copy() : pageItemInstance.copy(),
          };
        case count - 2:
          return {
            value: totalPage - currentPage > 4 ? '...' : index + 1,
            instance: totalPage - currentPage === 2 ? pageActiveInstance.copy() : pageItemInstance.copy(),
          };
        case count - 1:
          return {
            value: totalPage,
            instance: currentPage === totalPage ? pageActiveInstance.copy() : pageItemInstance.copy(),
          };

        default:
          return {
            value: currentPage > 4 ? index - 3 + currentPage : index + 1,
            instance: index === 3 ? pageActiveInstance.copy() : pageItemInstance.copy(),
          };
      }
    });

    const pageInstanes = pages.map(({ instance }) => instance);
    const instances = [arrowLeftInstance, ...pageInstanes, arrowRightInstance];
    group.sketchObject.addLayers(instances);

    const gap = width + marginRight < width ? width : width + marginRight;
    instances.forEach((layer, index) => {
      layer.frame().setX_(gap * index);
    });

    pages.forEach(({ value, instance: pageInstane }) => {
      pageInstane.overridePoints().forEach(overridePoint => {
        pageInstane.setValue_forOverridePoint(String(value), overridePoint);
      });
    });

    group.adjustToFit();

    if (showLimit) {
      const path = isSmall ? 'pagination/limit/show/small' : 'pagination/show/limit';
      limitInstance = this.getInstanceByPath(path);
      group.sketchObject.addLayer(limitInstance);
      limitInstance.frame().setX(group.frame.width + marginRight);
      group.adjustToFit();
    }

    if (showJump) {
      const jumpPagePath = `pagination/jumpPage/show${small}/normal`;
      jumpPageInstance = this.getInstanceByPath(jumpPagePath);
      group.sketchObject.addLayer(jumpPageInstance);
      jumpPageInstance.frame().setX(group.frame.width + marginRight);
      group.adjustToFit();

      const path = isSmall ? 'pagination/jump/show/small' : 'pagination/show/jump';
      jumpInstance = this.getInstanceByPath(path);
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
