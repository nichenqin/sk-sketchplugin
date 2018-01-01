import VComponent from '../VComponent';

const option = {
  name: 'longInput',
};

class LongInput extends VComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.addLayers([instance]);

    return instance;
  }
}

export default LongInput;
