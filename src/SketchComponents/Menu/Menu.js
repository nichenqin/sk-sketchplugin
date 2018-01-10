import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'menu',
};

function flatten(options) {
  return options.reduce((result, { name, expand, children }) => {
    result.push(name);
    if (expand && children && children.length) {
      result.push(...flatten(children));
    }
    return result;
  }, []);
}

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

    const renderedOptions = flatten(options);
    optionInstances.forEach((instance, index) => {
      instance.overridePoints().forEach(overridePoint => {
        instance.setValue_forOverridePoint_(String(renderedOptions[index]), overridePoint);
      });
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
