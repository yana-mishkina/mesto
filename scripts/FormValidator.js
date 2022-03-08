export { FormValidator };

class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;
  }
  _showInputError = (input, errorMessage) => {
    const error = this._formSelector.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }

  _hideInputError = (input) => {
    const error = this._formSelector.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = (inputs) => {
    return inputs.some(function (input) {
      return !input.validity.valid;
    });
  }

  _toggleButtonState = (inputs, buttonSubmit) => {
    if (this._hasInvalidInput(inputs)) {
      buttonSubmit.classList.add(this._inactiveButtonClass);
      buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      buttonSubmit.classList.remove(this._inactiveButtonClass);
      buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners = () => {
    const inputs = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const buttonSubmit = this._formSelector.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, buttonSubmit);
    inputs.forEach(function (input) {
      input.addEventListener('input', () => {
        console.log('this =>', this);
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, buttonSubmit);
      });
    });
  }

  enableValidation = () => {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formSelector);
  }
}




