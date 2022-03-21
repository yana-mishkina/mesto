import { Popup } from "./Popup.js";
export { PopupWithImage };

class PopupWithImage extends Popup {
    constructor(popupSelector, photo, photoTitle) {
        super(popupSelector);
        this._photo = photo;
        this._photoTitle = photoTitle;
    }

    open(link, name) {
        super.open();
        this._photo.src = link;
        this._photo.alt = name;
        this._photoTitle.textContent = name;
    }
}