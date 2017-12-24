import VComponent from '../VComponent';

class Button extends VComponent {
  constructor(context) {
    super(context, 'button.sketch');
    this.name = 'button';
  }
}

export default Button;
