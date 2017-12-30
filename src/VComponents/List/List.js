import VComponent from '../VComponent';
import { setFrame, getRectOfNativeLayer } from '../../utils';

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

  importToSketch({ rows, columns }) {
    const { sketch, page, name } = this;

    const group = page.newGroup({ name });

    // region title
    const title = group.newGroup({ name: 'title' });
    const titleInstance = this.createSymbolInstanceByPath('list/header/normal');
    const rect = getRectOfNativeLayer(titleInstance);
    this.setState(rect);
    const { width, height } = this.state;

    const titleInstances = [...new Array(columns)].map(() => titleInstance.copy());
    title.sketchObject.addLayers(titleInstances);

    let titleIndex = 0;
    title.iterate(layer => {
      layer.sketchObject.frame().setX_(width * titleIndex);
      titleIndex += 1;
    });
    title.adjustToFit();
    // endregion title

    // region rows
    const row = group.newGroup({ name: 'row' });
    const itemInstance = this.createSymbolInstanceByPath('list/body/single');
    const instances = [...new Array(columns)].map(() => itemInstance.copy());
    row.sketchObject.addLayers(instances);
    setFrame(row, { y: height });

    let itemIndex = 0;
    row.iterate(layer => {
      layer.sketchObject.frame().setX_(width * itemIndex);
      itemIndex += 1;
    });
    row.adjustToFit();
    // endrigion rows

    // region duplicate rows
    for (let i = 1; i < rows; i += 1) {
      const newRow = row.duplicate();
      newRow.adjustToFit();
      setFrame(newRow, { y: height * (i + 1) });
    }
    // endregion duplicate rows

    group.adjustToFit();
    group.select();
  }
}

export default List;
