import { dispatchToWebview } from './utils';

export function onSelectionChanged(context) {
  const { actionContext } = context;
  const { document } = actionContext;
  const layers = document.selectedLayers().layers()[0];

  const payload = {
    layerName: String(layers.name()),
    objectID: String(layers.objectID()),
  };

  dispatchToWebview('SEARCH', payload, 'onchange-sketch');
}
