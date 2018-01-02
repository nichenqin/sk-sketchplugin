import { dispatchToWebview } from './utils';

export function onSelectionChanged(context) {
  const { actionContext } = context;
  const { document } = actionContext;
  const layer = document.selectedLayers().layers()[0];

  const layerName = String(layer.name());
  const objectID = String(layer.objectID());

  const payload = {
    layerName,
    objectID,
    data,
  };

  dispatchToWebview('SEARCH', payload, 'onchange-sketch');
}
