let profileEditButtonOpen = document.querySelector('.button_size_s');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.button_type_resert');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_value_name');
let jobInput = document.querySelector('.popup__field_value_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let submitButton = document.querySelector('.button_type_submit');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function unsavePopup () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

profileEditButtonOpen.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
profileEditButtonOpen.addEventListener('click', unsavePopup);
formElement.addEventListener('submit', formSubmitHandler); 
submitButton.addEventListener('click', closePopup);