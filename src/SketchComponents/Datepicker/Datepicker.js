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
    previousMonthDateList,
    currentMonthDateList,
    nextMonthDateList,
    dateList,
    currentDay,
    showToday,
    showTomorrow,
    showClear,
  }) {
    const { page, name } = this;
    const datepickerGroup = page.newGroup({ name });

    let footerInstance;
    const date = new Date();
    const headerInstance = this.createSymbolInstanceByPath('datepicker/header/normal');
    const { width: headerWidth } = getRectOfNativeLayer(headerInstance);
    const lightInstance = this.createSymbolInstanceByPath('datepicker/day/light');
    const selectedInstance = this.createSymbolInstanceByPath('datepicker/day/selected');
    const normalInstance = this.createSymbolInstanceByPath('datepicker/day/normal');
    const weekInstance = this.createSymbolInstanceByPath('datepicker/week');
    const { height, width } = getRectOfNativeLayer(normalInstance);
    const padding = (headerWidth - width * 7) / 2;

    // region add header
    datepickerGroup.sketchObject.addLayer(headerInstance);
    headerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'date')) {
        headerInstance.setValue_forOverridePoint(String(date.getFullYear()), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_previousMonth')) {
        const icon = this.createSymbolInstanceByPath('icon/arrowLeft/normal');
        headerInstance.setValue_forOverridePoint(icon.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_nextMonth')) {
        const icon = this.createSymbolInstanceByPath('icon/arrowRight/normal');
        headerInstance.setValue_forOverridePoint(icon.symbolID(), overridePoint);
      }
    });
    datepickerGroup.adjustToFit();
    // endregion add header

    // region add week
    const weekData = ['日', '一', '二', '三', '四', '五', '六'];
    const weekInstances = weekData.map(() => weekInstance.copy());
    datepickerGroup.sketchObject.addLayers(weekInstances);

    weekInstances.forEach((week, index) => {
      week.frame().setX_(width * index + padding);
      week.frame().setY_(datepickerGroup.frame.height);
      week.overridePoints().forEach(overridePoint => {
        week.setValue_forOverridePoint(String(weekData[index]), overridePoint);
      });
    });

    datepickerGroup.adjustToFit();

    this.createDividerAtGroup(datepickerGroup);
    // endregion add week

    // region add days
    const previousInstances = previousMonthDateList.map(() => lightInstance.copy());
    const currentInstances = currentMonthDateList.map(({ day }) => (day === currentDay ? selectedInstance.copy() : normalInstance.copy()));
    const nextInstances = nextMonthDateList.map(() => lightInstance.copy());

    const dayInstances = [...previousInstances, ...currentInstances, ...nextInstances];
    datepickerGroup.sketchObject.addLayers(dayInstances);

    dayInstances.forEach((day, index) => {
      const row = Math.floor(index / 7);
      const column = index % 7;
      day.frame().setX_(width * column + padding);
      day.frame().setY_(height * row + datepickerGroup.frame.height);
      day.overridePoints().forEach(overridePoint => {
        day.setValue_forOverridePoint(String(dateList[index].day), overridePoint);
      });
    });

    datepickerGroup.adjustToFit();
    // endregion add days

    // region add footer
    if (showToday || showTomorrow || showClear) {
      const today = showToday ? 'today' : '';
      const tomorrow = showTomorrow ? 'tomorrow' : '';
      const clear = showClear ? 'clear' : '';
      const footerPath = [today, tomorrow, clear].filter(p => !!p).join('/');
      footerInstance = this.createSymbolInstanceByPath(`datepicker/footer/${footerPath}`);

      datepickerGroup.sketchObject.addLayer(footerInstance);
      footerInstance.frame().setY_(datepickerGroup.frame.height);
      datepickerGroup.adjustToFit();
    }
    // endregion add footer

    this.createBgAtGroup(datepickerGroup);
    this.createShadowAtGroup(datepickerGroup);
    datepickerGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return datepickerGroup;
  }
}

export default Datepicker;
