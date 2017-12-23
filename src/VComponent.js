class VComponent {
  constructor(context) {
    this.name = 'tb-ui';
    this.context = context;
    this.pluginRoot = this.context.scriptPath
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent();
  }
}

export default VComponent;
