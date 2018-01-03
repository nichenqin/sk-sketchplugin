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

  // iterateGroup(group) {
  //   const { icon } = this.state;
  //   group.iterate(itemGroup => {
  //     itemGroup.iterate(layer => {
  //       console.log(layer);
  //     });
  //   });
  // }

  // componentDidSelected() {
  //   const { selection } = this;
  //   selection.iterateWithFilter('isGroup', group => {
  //     group.iterateWithFilter('isGroup', itemGroup => {
  //       itemGroup.sketchObject.children().forEach(c => {
  //         if (is(c, 'MSSymbolInstance')) {
  //           const icon = this.createSymbolInstanceByPath('icon/radio');
  //           c.replaceWithInstanceOfSymbol(icon);
  //         }
  //       });
  //     });
  //   });
  // }

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
