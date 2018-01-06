import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils';

const option = {
  name: 'datepicker',
};

class Datepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    previousMonthDateList, currentMonthDateList, nextMonthDateList, dateList, currentDay,
  }) {
    const { page, name } = this;
    const datepickerGroup = page.newGroup({ name });

    const headerInstance = this.createSymbolInstanceByPath('datepicker/header/normal');
    const lightInstance = this.createSymbolInstanceByPath('datepicker/day/light');
    const selectedInstance = this.createSymbolInstanceByPath('datepicker/day/selected');
    const normalInstance = this.createSymbolInstanceByPath('datepicker/day/normal');
    const weekInstance = this.createSymbolInstanceByPath('datepicker/week');
    const { height, width } = getRectOfNativeLayer(normalInstance);

    datepickerGroup.sketchObject.addLayer(headerInstance);
    headerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'date')) {
        const date = new Date();
        headerInstance.setValue_forOverridePoint(String(date.getFullYear()), overridePoint);
      }
    });
    datepickerGroup.adjustToFit();

    const weekData = ['日', '一', '二', '三', '四', '五', '六'];
    const weekInstances = weekData.map(() => weekInstance.copy());
    datepickerGroup.sketchObject.addLayers(weekInstances);

    weekInstances.forEach((week, index) => {
      week.frame().setX_(width * index);
      week.frame().setY_(datepickerGroup.frame.height);
      week.overridePoints().forEach(overridePoint => {
        week.setValue_forOverridePoint(String(weekData[index]), overridePoint);
      });
    });

    datepickerGroup.adjustToFit();

    const previousInstances = previousMonthDateList.map(() => lightInstance.copy());
    const currentInstances = currentMonthDateList.map(({ day }) => (day === currentDay ? selectedInstance.copy() : normalInstance.copy()));
    const nextInstances = nextMonthDateList.map(() => lightInstance.copy());

    const dayInstances = [...previousInstances, ...currentInstances, ...nextInstances];
    datepickerGroup.sketchObject.addLayers(dayInstances);

    dayInstances.forEach((day, index) => {
      const row = Math.floor(index / 7);
      const column = index % 7;
      day.frame().setX_(width * column);
      day.frame().setY_(height * row + datepickerGroup.frame.height);
      day.overridePoints().forEach(overridePoint => {
        day.setValue_forOverridePoint(String(dateList[index].day), overridePoint);
      });
    });

    datepickerGroup.adjustToFit();

    this.createBgAtGroup(datepickerGroup);
    datepickerGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return datepickerGroup;
  }
}

export default Datepicker;
