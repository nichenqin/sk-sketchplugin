import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, is, setFrame } from '../../utils';

const option = {
  name: 'radio',
};

class Radio extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
    this.state = {
      icon: null,
    };
  }

  iterateItemGroup(itemGroup, index) {
    const { icon } = this.state;
    const { options } = this.payload;
    itemGroup.sketchObject.children().forEach(layer => {
      if (is(layer, 'MSSymbolInstance')) {
        itemGroup.sketchObject.removeLayer_(layer);
        itemGroup.sketchObject.insertLayer_atIndex_(icon.copy(), 0);
      }
      if (is(layer, 'MSTextLayer')) {
        layer.stringValue = options[index].value;
      }
    });
    itemGroup.sketchObject.setIsLocked(true);
  }

  componentDidSelected() {
    const { selection } = this;
    selection.iterateWithFilter('isGroup', group => {
      let index = 0;
      group.iterateWithFilter('isGroup', itemGroup => {
        this.iterateItemGroup(itemGroup, index);
        index += 1;
      });
    });
  }

  import({ options }) {
    const { page } = this;

    const radioGroup = page.newGroup({ name: 'radio' });
    const radioItem = this.createSymbolInstanceByPath('radio/normal');
    const icon = this.createSymbolInstanceByPath('icon/radio');
    const { height } = getRectOfNativeLayer(radioItem);
    this.setState({ icon });

    const instances = options.map(() => radioItem.copy());
    radioGroup.sketchObject.addLayers(instances);
    instances.forEach(i => i.detachByReplacingWithGroup());

    let index = 0;
    radioGroup.iterateWithFilter('isGroup', itemGroup => {
      setFrame(itemGroup, { y: height * index });
      index += 1;
    });

    radioGroup.adjustToFit();

    return radioGroup;
  }
}

export default Radio;
