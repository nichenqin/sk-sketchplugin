import camelCase from 'lodash.camelcase';
import SketchComponent from '../SketchComponent';
import { isOverridePointName, generatePath } from '../../utils';

const option = {
  name: 'menu',
};

function flatten(options) {
  return options.reduce((result, { name, expand, children }) => {
    result.push({ name, expand });
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

  generateInstances(options, level = 1) {
    return options.reduce(
      (instances, {
        expand, children, subtitle, icon = '', status = 'normal',
      }) => {
        const rows = subtitle ? 'double' : 'single';
        const iconRows = camelCase(`${icon} ${rows}`);
        const foldable = children.length ? 'foldable' : '';
        const path = generatePath('menu', `level_${level}`, iconRows, foldable, status);
        const instance = this.createSymbolInstanceByPath(path);
        instances.push(instance.copy());
        if (expand && children && children.length) {
          instances.push(...this.generateInstances.call(this, children, level + 1));
        }
        return instances;
      },
      [],
    );
  }

  import({ options = [] }) {
    const { page, name } = this;

    const menuGroup = page.newGroup({ name });

    const avatar = this.createSymbolInstanceByPath('avatar');
    const icon = this.createSymbolInstanceByPath('icon/placeholder');
    const arrowUp = this.createSymbolInstanceByPath('icon/smallArrow/active');
    const arrowDown = this.createSymbolInstanceByPath('icon/smallArrow/normal');

    const optionInstances = this.generateInstances(options);
    menuGroup.sketchObject.addLayers(optionInstances);

    optionInstances.forEach(optionItem => {
      menuGroup.adjustToFit();
      optionItem.frame().setY_(menuGroup.frame.height);
    });

    const renderedOptions = flatten(options);
    optionInstances.forEach((instance, index) => {
      instance.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, ['option', 'username'])) {
          instance.setValue_forOverridePoint_(String(renderedOptions[index].name), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'avatar')) {
          instance.setValue_forOverridePoint_(avatar.symbolID(), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon')) {
          instance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon_arrow')) {
          const arrow = renderedOptions[index].expand ? arrowUp : arrowDown;
          instance.setValue_forOverridePoint_(arrow.symbolID(), overridePoint);
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
