export default class {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }

  renderView() {
    return `
      <h1>${document.title}</h1>
    `;
  }
}
