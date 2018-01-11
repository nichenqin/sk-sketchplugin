import camelcase from 'lodash.camelcase';
import SketchComponent from '../SketchComponent';
import { setFrame, getRectOfNativeLayer, isOverridePointName, generatePath } from '../../utils';
import Pagination from '../Pagination';

const option = {
  name: 'list',
};

class List extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    rows, columns, titleItems, rowItems, showPagination,
  }) {
    const { context, page, name } = this;

    const listGroup = page.newGroup({ name });

    // region title
    const titleGroup = listGroup.newGroup({ name: 'title' });
    const titleInstance = this.createSymbolInstanceByPath('list/header/normal');
    const { width, height } = getRectOfNativeLayer(titleInstance);

    const titleInstances = [...new Array(columns)].map(() => titleInstance.copy());
    titleGroup.sketchObject.addLayers(titleInstances);

    titleInstances.forEach((titleItem, index) => {
      titleItem.frame().setX_(width * index);
      titleItem.overridePoints().forEach(overridePoint => {
        titleItem.setValue_forOverridePoint(String(titleItems[index].title), overridePoint);
      });
    });
    titleGroup.adjustToFit();
    this.createDividerAtGroup(titleGroup);
    titleGroup.sketchObject.setIsLocked(true);
    // endregion title

    // region row
    const rowGroup = listGroup.newGroup({ name: 'row' });
    const rowInstances = [...new Array(columns)].map((val, index) => {
      // TODO: 规范路径的命名
      const rowItem = rowItems[index];
      const { icon = '', isLargeIcon = false } = rowItem;
      const iconSize = isLargeIcon && icon === 'icon' ? 'large' : '';
      const double = rowItem.subtitle ? 'double' : 'single';
      const iconRows = camelcase(`${iconSize} ${icon} ${isLargeIcon ? '' : double}`);
      const path = generatePath('list', 'body', iconRows);
      const rowInstance = this.createSymbolInstanceByPath(path);
      return rowInstance.copy();
    });
    rowGroup.sketchObject.addLayers(rowInstances);
    setFrame(rowGroup, { y: height });

    const avatar = this.createSymbolInstanceByPath('avatar');
    const placeholder = this.createSymbolInstanceByPath('icon/placeholder');

    rowInstances.forEach((rowItem, index) => {
      rowItem.frame().setX_(width * index);
      rowItem.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'text')) {
          rowItem.setValue_forOverridePoint(String(rowItems[index].title), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'sup_info')) {
          rowItem.setValue_forOverridePoint(String(rowItems[index].subtitle), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'avatar')) {
          rowItem.setValue_forOverridePoint(avatar.symbolID(), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon')) {
          rowItem.setValue_forOverridePoint(placeholder.symbolID(), overridePoint);
        }
      });
    });

    rowGroup.adjustToFit();
    this.createDividerAtGroup(rowGroup);
    rowGroup.sketchObject.setIsLocked(true);
    // endregion row

    // region duplicate rows
    for (let i = 1; i < rows; i += 1) {
      const newRowGroup = rowGroup.duplicate();
      newRowGroup.adjustToFit();
      setFrame(newRowGroup, { y: height * (i + 1) });
    }
    listGroup.adjustToFit();
    this.createBgAtGroup(listGroup);
    this.createShadowAtGroup(listGroup);
    // endregion duplicate rows

    if (showPagination) {
      const pagination = new Pagination(context);
      const paginationInstance = pagination.moveToGroup(listGroup);
      paginationInstance.frame().setY_(listGroup.frame.height + 10);
      listGroup.adjustToFit();
    }

    listGroup.adjustToFit();
    listGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return listGroup;
  }
}

export default List;
