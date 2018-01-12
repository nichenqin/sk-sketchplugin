import SketchComponent from '../SketchComponent';
import Tips from '../Tips';

const option = {
  name: 'text',
};

class Text extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ text, fontSize = 16, tips = {} }) {
    const { context, page, name } = this;

    const textGroup = page.newGroup({ name });

    const newText = textGroup.newText({
      text,
    });
    // set color
    const textStyle = newText.sketchObject.style().textStyle();
    const mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes());
    mutableAttributes.setObject_forKey(NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1), 'NSColor');
    textStyle.setValue_forKey_(mutableAttributes, 'attributes');
    // set font size
    newText.sketchObject.setFontSize(fontSize);

    if (tips.show) {
      const tipsComponent = new Tips(context, { content: tips.content, direction: tips.direction });
      tipsComponent.moveToGroup(textGroup);
      tipsComponent.setPosition(textGroup);
    }

    return textGroup;
  }
}

export default Text;
