import SketchComponent from '../SketchComponent';

const option = {
  name: 'text',
};

class Text extends SketchComponent {
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
      NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1),
      'NSColor',
    );
    textStyle.setValue_forKey_(mutableAttributes, 'attributes');
    // set font size
    newText.sketchObject.setFontSize(fontSize);
    return newText;
  }
}

export default Text;
