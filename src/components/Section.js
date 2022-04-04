export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer() {
        this._items.forEach(item => {
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