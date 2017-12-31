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
    // set color
    const textStyle = newText.sketchObject.style().textStyle();
    const mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes());
    mutableAttributes.setObject_forKey(
      NSColor.colorWithRed_green_blue_alpha(1, 0, 0.56, 1),
      'NSColor',
    );
    textStyle.setValue_forKey_(mutableAttributes, 'attributes');
    // set font size
    newText.sketchObject.setFontSize(fontSize);
    return newText;
  }
}

export default Text;
