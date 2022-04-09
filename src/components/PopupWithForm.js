import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__field');
        this._buttonSubmit = this._form.querySelector('.button_type_submit');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    changeFormSubmitHandler(newHandleFormSubmit) {
        this._handleFormSubmit = newHandleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          });
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(buttonText) {
        this._buttonSubmit.textContent = buttonText;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }
}