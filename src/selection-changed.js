import { dispatchToWebview } from './utils';

export function onSelectionChanged(context) {
  const { actionContext } = context;
  const { document } = actionContext;
  const layer = document.selectedLayers().layers()[0];

  const payload = {
    layerName: String(layer.name()),
    objectID: String(layer.objectID()),
  };

  dispatchToWebview('SEARCH', payload, 'onchange-sketch');
}
