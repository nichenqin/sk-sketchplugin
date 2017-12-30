import VComponent from '../VComponent';

const option = {
  name: 'list',
};

class List extends VComponent {
  constructor(context) {
    super(context, option);
  }

  importToSketch({ rows, columns }) {
    const { page, name } = this;
    const group = page.newGroup({ name });

    const row = group.newGroup({ name: 'row' });

    const instances = [];
    for (let i = 0; i < columns; i += 1) {
      instances.push(this.createSymbolInstanceByPath('list/body/single'));
    }

    row.sketchObject.addLayers(instances);

    for (let i = 1; i < rows; i += 1) {
      row.duplicate();
    }
  }
}

export default List;
