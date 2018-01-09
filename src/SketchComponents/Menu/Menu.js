/* eslint-disable no-shadow */
import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'menu',
};

class Menu extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  generateLevelThree(children = []) {
    const levelThreeInstance = this.createSymbolInstanceByPath('menu/level_3/single/normal');
    const optionInstances = children.map(() => levelThreeInstance.copy());
    return optionInstances;
  }

  generateLevelTwo(children = []) {
    const levelTwoInstance = this.createSymbolInstanceByPath('menu/level_2/single/normal');
    const optionInstances = children.reduce((instances, option) => {
      instances.push(levelTwoInstance.copy());
      if (option.children && option.children.length) {
        instances.push(...this.generateLevelThree(option.children));
      }
      return instances;
    }, []);
    return optionInstances;
  }

  import({ options = [] }) {
    const { page, name } = this;

    const menuGroup = page.newGroup({ name });

    const optionInstance = this.createSymbolInstanceByPath('menu/level_1/single/normal');
    const { height } = getRectOfNativeLayer(optionInstance);

    const optionInstances = options.reduce((instances, option) => {
      instances.push(optionInstance.copy());
      if (option.children && option.children.length) {
        instances.push(...this.generateLevelTwo(option.children));
      }
      return instances;
    }, []);
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
