let profileEditButtonOpen = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let submitButton = document.querySelector('.submit-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButtonOpen.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 
submitButton.addEventListener('click', closePopup);