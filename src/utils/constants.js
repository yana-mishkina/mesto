export const profileEditButtonOpen = document.querySelector('.button_type_edit');
export const addPhotoButtonOpen = document.querySelector('.button_type_add');
export const popupEditProfileSelector = '.popup_profile';
export const popupAddPhotoSelector = '.popup_add-photo';
export const popupViewingSelector = '.popup_viewing';
export const formEditProfileSelector = document.querySelector('form[name=profile-form]');
export const formAddPhotoSelector = document.querySelector('form[name=add-photo-form]');
export const nameInput = document.querySelector('.popup__field_value_name');
export const jobInput = document.querySelector('.popup__field_value_job');
export const initialCards = [
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
export const config = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}
export const profileTitleSelector = '.profile__title';
export const profileSubtitleSelector = '.profile__subtitle';
export const cardSelector = '#template';
export const containerSelector = '.elements';