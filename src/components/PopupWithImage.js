import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._photoTitle = this._popup.querySelector('.popup__photo-title');
    }

    open(link, name) {
        this._popupPhoto.src = link;
        this._popupPhoto.alt = name;
        this._photoTitle.textContent = name;
        super.open();
    }
}