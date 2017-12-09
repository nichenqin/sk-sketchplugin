import VComponent from './VComponent';

class Button extends VComponent {
  importComponent() {
    console.log('context', this.context);
  }
}

export default Button;
