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
      size: 'normal',
    },
  ) {
    super(context, payload, option);

    this.jump = true;
  }

  import({
    totalPage,
    marginRight = 10,
    showLimit = false,
    showJump = false,
    currentPage = 1,
    isSmall = false,
    pageList = [],
    size = 'normal',
  }) {
    const maxPage = 7;
    const { page, name } = this;
    const group = page.newGroup({ name });
    const small = size === 'small' ? '/small' : '';

    let jumpInstance;
    let jumpPageInstance;
    let limitInstance;
    const arrowLeftInstance = this.getInstanceByPath(`pagination/arrowLeft${small}/normal`);
    const arrowRightInstance = this.getInstanceByPath(`pagination/arrowRight${small}/normal`);
    const pageActiveInstance = this.getInstanceByPath(`pagination/page${small}/active`);
    const pageItemInstance = this.getInstanceByPath(`pagination/page${small}/normal`);
    const { width } = getRectOfNativeLayer(pageItemInstance);

    const pageData = (() => {
      const len = pageList.length;
      if (totalPage < maxPage) return pageList;
      if (len === 3) {
        return ['...', ...pageList, '...'];
      } else if (len === 4) {
        if (totalPage - currentPage < 4) return ['...', ...pageList];
        return [...pageList, '...'];
      }
      return pageList;
    })();
    const pages = size === 'simple' ? [currentPage] : [1, ...pageData, totalPage];

    const pageInstanes = pages.map(value => (value === currentPage ? pageActiveInstance.copy() : pageItemInstance.copy()));
    const instances = [arrowLeftInstance, ...pageInstanes, arrowRightInstance];
    group.sketchObject.addLayers(instances);

    const gap = width + marginRight < width ? width : width + marginRight;
    instances.forEach((layer, index) => {
      layer.frame().setX_(gap * index);
    });

    pageInstanes.forEach((pageInstane, index) => {
      pageInstane.overridePoints().forEach(overridePoint => {
        pageInstane.setValue_forOverridePoint(String(pages[index]), overridePoint);
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
