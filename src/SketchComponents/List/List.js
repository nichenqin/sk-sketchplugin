import SketchComponent from '../SketchComponent';
import { setFrame, getRectOfNativeLayer, is } from '../../utils';

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
    const { sketch, page, name } = this;

    const listGroup = page.newGroup({ name });

    // region title
    const titleGroup = listGroup.newGroup({ name: 'title' });
    const titleInstance = this.createSymbolInstanceByPath('list/header/normal');
    const { width, height } = getRectOfNativeLayer(titleInstance);

    const titleInstances = [...new Array(columns)].map(() => titleInstance.copy());
    titleGroup.sketchObject.addLayers(titleInstances);

    let titleIndex = 0;
    titleGroup.iterate(layer => {
      const titleItem = layer.sketchObject;
      if (is(titleItem, 'MSSymbolInstance')) {
        titleItem.frame().setX_(width * titleIndex);
        titleItem.overridePoints().forEach(overridePoint => {
          titleItem.setValue_forOverridePoint(String(titleItems[titleIndex]), overridePoint);
        });
        titleIndex += 1;
      }
    });
    titleGroup.adjustToFit();
    this.createDividerAtGroup(titleGroup);
    titleGroup.sketchObject.setIsLocked(true);
    // endregion title

    // region rows
    const rowGroup = listGroup.newGroup({ name: 'row' });
    const rowInstance = this.createSymbolInstanceByPath('list/body/single');
    const rowInstances = [...new Array(columns)].map(() => rowInstance.copy());
    rowGroup.sketchObject.addLayers(rowInstances);
    setFrame(rowGroup, { y: height });

    let rowIndex = 0;
    rowGroup.iterate(layer => {
      const rowItem = layer.sketchObject;
      if (is(rowItem, 'MSSymbolInstance')) {
        rowItem.frame().setX_(width * rowIndex);
        rowItem.overridePoints().forEach(overridePoint => {
          rowItem.setValue_forOverridePoint(String(rowItems[rowIndex]), overridePoint);
        });
        rowIndex += 1;
      }
    });
    rowGroup.adjustToFit();
    this.createDividerAtGroup(rowGroup);
    rowGroup.sketchObject.setIsLocked(true);
    // endregion rows

    // region duplicate rows
    for (let i = 1; i < rows; i += 1) {
      const newRowGroup = rowGroup.duplicate();
      newRowGroup.adjustToFit();
      setFrame(newRowGroup, { y: height * (i + 1) });
    }
    // endregion duplicate rows

    listGroup.adjustToFit();
    this.createBgAtGroup(listGroup);
    listGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return listGroup;
  }
}

export default List;
