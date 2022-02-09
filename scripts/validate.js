// Функция, которая добавляет класс с ошибкой
function showInputError(form, input, errorMessage) {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add('popup__field_type_error');
    error.classList.add('popup__field-error_active');
    error.textContent = errorMessage;
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(form, input) {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__field_type_error');
    error.classList.remove('popup__field-error_active');
    error.textContent = '';
}

// Функция, которая проверяет валидность поля
function checkInputValidity(form, input) {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
}

//Проверка всех полей в форме на валидность
function hasInvalidInput(inputList) {
    return inputList.some(function(input) {
      return !input.validity.valid;
    });
}

//Деактивация кнопки сабмита
function toggleButtonState(inputList, buttonSubmit) {
    if (hasInvalidInput(inputList)) {
      buttonSubmit.classList.add('button_disabled');
    } else {
      buttonSubmit.classList.remove('button_disabled');
    }
}

//добавление обработчика всем полям форм
function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonSubmit = form.querySelector('.button_type_submit');
    toggleButtonState(inputList, buttonSubmit);
    inputList.forEach(function(input) {
      input.addEventListener('input', function () {
        checkInputValidity(form, input);
        toggleButtonState(inputList, buttonSubmit);
      });
    });
}

//Добавление обработчиков всем формам
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(function(form) {
      form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      setEventListeners(form);
    });
}
    
  enableValidation();