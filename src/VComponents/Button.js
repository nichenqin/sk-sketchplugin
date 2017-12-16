import VComponent from '../VComponent';

class Button extends VComponent {
  constructor(context) {
    super(context);
    this.name = 'button';
  }

  importComponent() {
    console.log(this.title);
    console.log('context', this.context);
  }
}

export default Button;
