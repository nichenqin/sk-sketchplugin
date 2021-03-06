export default function (dispatch) {
  window.sketchBridge = jsonData => {
    switch (jsonData.action) {
      case 'SEARCH':
        return dispatch(jsonData.payload);
      default:
        throw new Error('unknown action received from the bridge');
    }
  };
}
