import VComponent from '../VComponent';
import { setFrame, getRectOfNativeLayer, is } from '../../utils';

const option = {
  name: 'list',
};

class List extends VComponent {
  constructor(context) {
    super(context, option);
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  import({ rows, columns }) {
    const { sketch, page, name } = this;

    const listGroup = page.newGroup({ name });

    const style = new sketch.Style();
    style.borders = ['#ddd'];

    // region title
    const titleGroup = listGroup.newGroup({ name: 'title' });
    const titleItem = this.createSymbolInstanceByPath('list/header/normal');
    const rect = getRectOfNativeLayer(titleItem);
    this.setState(rect);
    const { width, height } = this.state;

    const titleItems = [...new Array(columns)].map(() => titleItem.copy());
    titleGroup.newShape({
      frame: new sketch.Rectangle(0, height, width * columns, 0.5),
      name: 'divider',
      style,
    });
    titleGroup.sketchObject.addLayers(titleItems);

    let titleIndex = 0;
    titleGroup.iterate(layer => {
      if (is(layer, 'MSSymbolInstance')) {
        layer.sketchObject.frame().setX_(width * titleIndex);
        titleIndex += 1;
      }
    });
    titleGroup.adjustToFit();
    // endregion title

    // region rows
    const rowGroup = listGroup.newGroup({ name: 'row' });
    const rowItem = this.createSymbolInstanceByPath('list/body/single');
    const rowItems = [...new Array(columns)].map(() => rowItem.copy());
    rowGroup.newShape({
      frame: new sketch.Rectangle(0, height, width * columns, 0.5),
      name: 'divider',
      style,
    });
    rowGroup.sketchObject.addLayers(rowItems);
    setFrame(rowGroup, { y: height });

    let itemIndex = 0;
    rowGroup.iterate(layer => {
      if (is(layer, 'MSSymbolInstance')) {
        layer.sketchObject.frame().setX_(width * itemIndex);
        itemIndex += 1;
      }
    });
    rowGroup.adjustToFit();
    // endrigion rows

    // region duplicate rows
    for (let i = 1; i < rows; i += 1) {
      const newRowGroup = rowGroup.duplicate();
      newRowGroup.adjustToFit();
      setFrame(newRowGroup, { y: height * (i + 1) });
    }
    // endregion duplicate rows

    listGroup.adjustToFit();
    listGroup.select();
  }
}

export default List;
