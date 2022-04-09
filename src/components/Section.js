export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer(items) {
        items.reverse().forEach(item => {
            this._renderer(item);
          });
    }

    addDefaultItem(item) {
        this._container.append(item);
    }

    addNewItem(item) {
        this._container.prepend(item);
    }
}