export default class {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }

  async renderView() {
    return `
      <h1>${document.title}</h1>
    `;
  }
}
