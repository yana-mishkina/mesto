// Функция, которая добавляет класс с ошибкой
function showInputError(form, input, errorMessage, inputErrorClass, errorClass) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.classList.add(errorClass);
  error.textContent = errorMessage;
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(form, input, inputErrorClass, errorClass) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
}

// Функция, которая проверяет валидность поля
function checkInputValidity(form, input, inputErrorClass, errorClass) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
}

//Проверка всех полей в форме на валидность
function hasInvalidInput(inputs) {
  return inputs.some(function(input) {
    return !input.validity.valid;
  });
}

//Деактивация кнопки сабмита
function toggleButtonState(inputs, buttonSubmit, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', 'disabled');
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled', 'disabled');
  }
}

//добавление обработчика всем полям форм
function setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);
  toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
    });
  });
}

//Добавление обработчиков всем формам
function enableValidation(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

enableValidation(
  formSelector = '.popup__form', 
  inputSelector = '.popup__field', 
  submitButtonSelector = '.button_type_submit', 
  inactiveButtonClass = 'button_disabled', 
  inputErrorClass = 'popup__field_type_error', 
  errorClass = 'popup__field-error_active'
  );