import camelCase from 'lodash.camelcase';
import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName, generatePath } from '../../utils';

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
  constructor(context, payload = { options: [] }) {
    super(context, payload, option);
  }

  generateInstances(options, index = 1) {
    return options.reduce(
      (instances, {
        expand, children, subtitle, icon = '', status = 'normal',
      }) => {
        const rows = subtitle ? 'double' : 'single';
        const iconRows = camelCase(`${icon} ${rows}`);
        const path = generatePath('menu', `level_${index}`, iconRows, '', status);
        const instance = this.createSymbolInstanceByPath(path);
        instances.push(instance.copy());
        if (expand && children && children.length) {
          instances.push(...this.generateInstances.call(this, children, index + 1));
        }
        return instances;
      },
      [],
    );
  }

  import({ options = [] }) {
    const { page, name } = this;

    const menuGroup = page.newGroup({ name });

    const optionInstance = this.createSymbolInstanceByPath('menu/level_1/single/normal');
    const avatar = this.createSymbolInstanceByPath('avatar');
    const icon = this.createSymbolInstanceByPath('icon/placeholder');
    const { height } = getRectOfNativeLayer(optionInstance);

    const optionInstances = this.generateInstances(options);
    menuGroup.sketchObject.addLayers(optionInstances);

    optionInstances.forEach((optionItem, index) => {
      optionItem.frame().setY_(height * index);
    });

    const renderedOptions = flatten(options);
    optionInstances.forEach((instance, index) => {
      instance.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, ['option', 'username'])) {
          instance.setValue_forOverridePoint_(String(renderedOptions[index]), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'avatar')) {
          instance.setValue_forOverridePoint_(avatar.symbolID(), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon')) {
          instance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
        }
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
