import SketchComponent from '../SketchComponent';

const option = {
  name: 'datepicker',
};

class Datepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }
}

export default Datepicker;
