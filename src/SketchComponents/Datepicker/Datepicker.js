import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { getRectOfNativeLayer, isOverridePointName, generatePath } from '../../utils';

const option = {
  name: 'datepicker',
};

class Datepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  getDuringInstance(time) {
    const { selectedDateList = [] } = this.payload;
    if (!time || !selectedDateList.length || !selectedDateList.includes(time)) return null;

    const duringInstance = this.createSymbolInstanceByPath('datepicker/day/during');
    const startInstance = this.createSymbolInstanceByPath('datepicker/day/start');
    const endInstance = this.createSymbolInstanceByPath('datepicker/day/end');

    const [firstSelectedTime] = selectedDateList;
    const lastSelectedTime = selectedDateList[selectedDateList.length - 1];

    if (firstSelectedTime === time) return startInstance.copy();
    else if (lastSelectedTime === time) return endInstance.copy();
    return duringInstance.copy();
  }

  import({
    previousMonthDateList,
    currentMonthDateList,
    nextMonthDateList,
    dateList,
    showPicker,
    showToday,
    showTomorrow,
    showClear,
    selectedDate = '',
  }) {
    const { context, page, name } = this;
    const rootGroup = page.newGroup({ name });

    if (showPicker) {
      const picker = new Picker(context, {
        content: selectedDate,
        icon: 'arrowUp',
        status: 'active',
        placeholder: '不限',
      });
      picker.moveToGroup(rootGroup);
      rootGroup.adjustToFit();
    }

    let footerInstance;
    const now = new Date();
    const today = now.getDate();
    const datepickerGroup = rootGroup.newGroup({ name });
    const headerInstance = this.createSymbolInstanceByPath('datepicker/header/normal');
    const { width: headerWidth } = getRectOfNativeLayer(headerInstance);
    const lightInstance = this.createSymbolInstanceByPath('datepicker/day/light');
    const selectedInstance = this.createSymbolInstanceByPath('datepicker/day/selected');
    const normalInstance = this.createSymbolInstanceByPath('datepicker/day/normal');
    const todayInstance = this.createSymbolInstanceByPath('datepicker/day/today');
    const weekInstance = this.createSymbolInstanceByPath('datepicker/week');
    const [, , selectedDay] = selectedDate.split('-');
    const { height, width } = getRectOfNativeLayer(normalInstance);
    const padding = (headerWidth - width * 7) / 2;

    // region add header
    datepickerGroup.sketchObject.addLayer(headerInstance);
    headerInstance.frame().setY_(rootGroup.frame.height + 10);
    headerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'date')) {
        headerInstance.setValue_forOverridePoint(String(now.getFullYear()), overridePoint);
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
    const previousInstances = previousMonthDateList.map(({ time }) => this.getDuringInstance(time) || lightInstance.copy());
    const currentInstances = currentMonthDateList.map(({ day, time }) => {
      const during = this.getDuringInstance(time);
      if (during) return during;
      if (day === Number(selectedDay)) return selectedInstance.copy();
      if (day === today) return todayInstance.copy();
      return normalInstance.copy();
    });
    const nextInstances = nextMonthDateList.map(({ time }) => this.getDuringInstance(time) || lightInstance.copy());

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
      const todayStr = showToday ? 'today' : '';
      const tomorrowStr = showTomorrow ? 'tomorrow' : '';
      const clearStr = showClear ? 'clear' : '';
      const footerPath = generatePath('datepicker', 'footer', todayStr, tomorrowStr, clearStr);
      footerInstance = this.createSymbolInstanceByPath(footerPath);

      datepickerGroup.sketchObject.addLayer(footerInstance);
      footerInstance.frame().setY_(datepickerGroup.frame.height);
      datepickerGroup.adjustToFit();
    }
    // endregion add footer

    this.createBgAtGroup(datepickerGroup);
    this.createShadowAtGroup(datepickerGroup);

    rootGroup.adjustToFit();
    rootGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return rootGroup;
  }
}

export default Datepicker;
