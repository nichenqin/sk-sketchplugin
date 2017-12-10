import VComponent from './VComponent';

class Button extends VComponent {
  importComponent(context) {
    console.log(this.title);
    console.log('context', context);
  }
}

export default Button;
