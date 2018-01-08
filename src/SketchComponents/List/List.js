import SketchComponent from '../SketchComponent';
import { setFrame, getRectOfNativeLayer, isOverridePointName } from '../../utils';

const option = {
  name: 'list',
};

class List extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    rows, columns, titleItems, rowItems,
  }) {
    const { page, name } = this;

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
    const rowInstance = {
      single: this.createSymbolInstanceByPath('list/body/single'),
      double: this.createSymbolInstanceByPath('list/body/double'),
    };
    const rowInstances = [...new Array(columns)].map((val, index) => {
      const rowItem = rowItems[index];
      const rowStatus = rowItem.subtitle ? 'double' : 'single';
      return rowInstance[rowStatus].copy();
    });
    rowGroup.sketchObject.addLayers(rowInstances);
    setFrame(rowGroup, { y: height });

    rowInstances.forEach((rowItem, index) => {
      rowItem.frame().setX_(width * index);
      rowItem.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'text')) {
          rowItem.setValue_forOverridePoint(String(rowItems[index].title), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'sup_info')) {
          rowItem.setValue_forOverridePoint(String(rowItems[index].subtitle), overridePoint);
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
    // endregion duplicate rows

    listGroup.adjustToFit();
    this.createBgAtGroup(listGroup);
    this.createShadowAtGroup(listGroup);
    listGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return listGroup;
  }
}

export default List;
