import VComponent from '../VComponent';

class Button extends VComponent {
  constructor(context, name) {
    super(context, name);
    this.name = name;
  }
}

export default Button;
