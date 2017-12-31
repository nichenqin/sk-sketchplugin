import VComponent from '../VComponent';

const option = {
  name: 'text',
};

class Text extends VComponent {
  constructor(context) {
    super(context, option);
  }

  import({ text, fontSize }) {
    const { page } = this;
    const newText = page.newText({
      text,
    });
    newText.sketchObject.setFontSize(fontSize);
    newText.select();
  }
}

export default Text;
