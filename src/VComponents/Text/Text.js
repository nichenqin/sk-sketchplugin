import VComponent from '../VComponent';

const option = {
  name: 'text',
};

class Text extends VComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ text, fontSize }) {
    const { page } = this;
    const newText = page.newText({
      text,
    });
    newText.sketchObject.setFontSize(fontSize);
    return newText;
  }
}

export default Text;