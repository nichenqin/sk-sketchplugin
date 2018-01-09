import SketchComponent from '../SketchComponent';

const option = {
  name: 'menu',
};

class Menu extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const { page, name } = this;

    const menuGroup = page.newGroup({ name });

    return menuGroup;
  }
}

export default Menu;
