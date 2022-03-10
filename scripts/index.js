import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileEditButtonOpen = document.querySelector('.button_type_edit');
const addPhotoButtonOpen = document.querySelector('.button_type_add');
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupViewing = document.querySelector('.popup_viewing');
const formEditProfile = document.querySelector('form[name=profile-form]');
const formAddPhoto = document.querySelector('form[name=add-photo-form]');
const nameInput = document.querySelector('.popup__field_value_name');
const jobInput = document.querySelector('.popup__field_value_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const linkInput = document.querySelector('.popup__field_value_link');
const placeTitleInput = document.querySelector('.popup__field_value_place-title');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popups = document.querySelectorAll('.popup');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
const config = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddPhoto = new FormValidator(config, formAddPhoto);
formValidatorAddPhoto.enableValidation();

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

profileEditButtonOpen.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formValidatorEditProfile.resetError();
});

addPhotoButtonOpen.addEventListener('click', function () {
  formAddPhoto.reset();
  formValidatorAddPhoto.resetError();
  openPopup(popupAddPhoto);
});

function handleCardClick(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupPhotoTitle.textContent = name;
  openPopup(popupViewing);
}

//закртиые попапов
function closeByEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('button__icon')) {
      closePopup(popup);
    }
  });
});

//редактирование информации в профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//добавление карточек
function createCard(item) {
  const card = new Card(item.name, item.link, handleCardClick, '#template').generate();
  return card;
}

initialCards.forEach((item) => {
  elements.append(createCard(item));
});

function handleAddPhotoFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeTitleInput.value,
    link: linkInput.value
  }
  elements.prepend(createCard(newCard));
  closePopup(popupAddPhoto);
}

formAddPhoto.addEventListener('submit', handleAddPhotoFormSubmit);

