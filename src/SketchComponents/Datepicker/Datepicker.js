import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'datepicker',
};

class Datepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    previousMonthDateList, currentMonthDateList, nextMonthDateList, dateList,
  }) {
    const { page, name } = this;
    const datepickerPage = page.newGroup({ name });

    const lightInstance = this.createSymbolInstanceByPath('datepicker/day/light');
    const normalInstance = this.createSymbolInstanceByPath('datepicker/day/normal');
    const { height, width } = getRectOfNativeLayer(normalInstance);

    const dayInstances = [
      ...previousMonthDateList.map(() => lightInstance.copy()),
      ...currentMonthDateList.map(() => normalInstance.copy()),
      ...nextMonthDateList.map(() => lightInstance.copy()),
    ];
    datepickerPage.sketchObject.addLayers(dayInstances);

    for (let i = 0; i < dayInstances.length; i += 1) {
      const day = dayInstances[i];
      const row = Math.floor(i / 7);
      const column = i % 7;
      day.frame().setX_(width * column);
      day.frame().setY_(height * row);
      day.overridePoints().forEach(overridePoint => {
        day.setValue_forOverridePoint(String(dateList[i].day), overridePoint);
      });
    }

    datepickerPage.adjustToFit();

    return datepickerPage;
  }
}

export default Datepicker;
