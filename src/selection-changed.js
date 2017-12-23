/* globals log */

import { dispatchToWebview } from './utils';

export function onSelectionChanged(context) {
  const { actionContext } = context;
  const { document } = actionContext;

  const layerName = String(document
    .selectedLayers()
    .layers()[0]
    .name());

  log(layerName);

  dispatchToWebview('SEARCH', layerName, 'onchange-sketch');
}
