import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'menu',
};

class Menu extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  generateInstances(options, instance, index = 1) {
    return options.reduce((instances, { expand, children }) => {
      instances.push(instance.copy());
      if (expand && children && children.length) {
        const nextInstance = this.createSymbolInstanceByPath(`menu/level_${index + 1}/single/normal`);
        instances.push(...this.generateInstances.call(this, children, nextInstance, index + 1));
      }
      return instances;
    }, []);
  }

  import({ options = [] }) {
    const { page, name } = this;

    const menuGroup = page.newGroup({ name });

    const optionInstance = this.createSymbolInstanceByPath('menu/level_1/single/normal');
    const { height } = getRectOfNativeLayer(optionInstance);

    const optionInstances = this.generateInstances(options, optionInstance);
    menuGroup.sketchObject.addLayers(optionInstances);

    optionInstances.forEach((optionItem, index) => {
      optionItem.frame().setY_(height * index);
    });

    menuGroup.adjustToFit();
    this.createBgAtGroup(menuGroup);
    this.createShadowAtGroup(menuGroup);
    menuGroup.iterate(layer => {
      layer.sketchObject.setIsLocked_(true);
    });

    return menuGroup;
  }
}

export default Menu;
