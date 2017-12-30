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
    const { page, name } = this;

    const group = page.newGroup({ name });
    const row = group.newGroup({ name: 'row' });

    const itemInstance = this.createSymbolInstanceByPath('list/body/single');
    const rect = getRectOfNativeLayer(itemInstance);
    this.setState(rect);

    const instances = [...new Array(columns)].map(() => itemInstance.copy());
    row.sketchObject.addLayers(instances);

    let index = 0;
    row.iterate(layer => {
      layer.sketchObject.frame().setX_(this.state.width * index);
      index += 1;
    });
    row.adjustToFit();

    for (let i = 1; i < rows; i += 1) {
      const newRow = row.duplicate();
      newRow.adjustToFit();
      setFrame(newRow, { y: this.state.height * i });
    }

    group.adjustToFit();
    group.select();
  }
}

export default List;
