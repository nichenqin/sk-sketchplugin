import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'datepicker',
};

class Datepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ dateList }) {
    const { page } = this;
    const datepickerPage = page.newGroup({ name: 'datepicker' });
    const itemInstance = this.createSymbolInstanceByPath('datepicker/day/light');
    const { height, width } = getRectOfNativeLayer(itemInstance);

    const itemInstances = dateList.map(() => itemInstance.copy());
    datepickerPage.sketchObject.addLayers(itemInstances);

    for (let i = 0; i < itemInstances.length; i += 1) {
      const day = itemInstances[i];
      const row = Math.floor(i / 7);
      const column = i % 7;
      day.frame().setX_(width * column);
      day.frame().setY_(height * row);
    }

    datepickerPage.adjustToFit();

    return datepickerPage;
  }
}

export default Datepicker;
