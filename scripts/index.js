import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
export { openPopup, popupViewing };

const profileEditButtonOpen = document.querySelector('.button_type_edit');
const addPhotoButtonOpen = document.querySelector('.button_type_add');
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupViewing = document.querySelector('.popup_viewing');
const buttonClosePopupProfile = document.querySelector('.button_profile');
const buttonClosePopupAddPhoto = document.querySelector('.button_add-photo');
const buttonClosePopupViewing = document.querySelector('.button_viewing');
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

const buttonSubmit = formAddPhoto.querySelector('.popup__button_type_save');
const popups = document.querySelectorAll('.popup');
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
  formValidatorEditProfile.toggleButtonState();
});

addPhotoButtonOpen.addEventListener('click', function () {
  openPopup(popupAddPhoto);
  formValidatorAddPhoto.resetError();
  formValidatorAddPhoto.toggleButtonState();
});

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

popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
})

buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

buttonClosePopupAddPhoto.addEventListener('click', function () {
  closePopup(popupAddPhoto);
});

buttonClosePopupViewing.addEventListener('click', function () {
  closePopup(popupViewing);
});

//редактирование информации в профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//навешиваем слушателей на элемент
function addEventListener(el) {
  el.querySelector('.button_type_delete').addEventListener('click', deleteCard);
  el.querySelector('.button_type_like').addEventListener('click', likeCard);
  el.querySelector('.element__photo').addEventListener('click', openPhoto);
}

//создание карточек из коробки
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generate();
  elements.append(cardElement);
});


//добавление карточки пользователем
function handleAddPhotoFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(placeTitleInput.value, linkInput.value);
  const cardElement = card.generate();
  elements.prepend(cardElement);
  closePopup(popupAddPhoto);
  linkInput.value = '';
  placeTitleInput.value = '';
  buttonSubmit.classList.add('button_disabled');
  buttonSubmit.setAttribute('disabled', 'disabled');
}

formAddPhoto.addEventListener('submit', handleAddPhotoFormSubmit);
