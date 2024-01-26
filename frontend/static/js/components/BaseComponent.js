export default class {
  props;

  constructor(props = {}) {
    this.props = props;
  }

  setTitle(title) {
    document.title = title;
  }

  async renderView() {
    return `
      <h1>${document.title}</h1>
    `;
  }
}
