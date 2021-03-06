export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
  }
  _showInputError(input, errorMessage) {
    const { inputErrorClass, errorClass } = this._config;
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = errorMessage;
  }

  _hideInputError(input) {
    const { inputErrorClass, errorClass } = this._config;
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = () => {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleButtonState() {
    const { inactiveButtonClass } = this._config;
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      this._buttonSubmit.classList.remove(inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetError() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this.toggleButtonState();
  }
}

