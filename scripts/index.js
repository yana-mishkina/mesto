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
const template = document.querySelector('#template').content;
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
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__photo-title');

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

profileEditButtonOpen.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addPhotoButtonOpen.addEventListener('click', function() {
  openPopup(popupAddPhoto);
});

//закртиые попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonClosePopupProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

buttonClosePopupAddPhoto.addEventListener('click', function(){
  closePopup(popupAddPhoto);
});

buttonClosePopupViewing.addEventListener('click', function() {
  closePopup(popupViewing);
})

//редактирование информации в профиле
function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', editProfileFormSubmitHandler); 

//вставка карочек из коробки
initialCards.forEach(function(item) {
  const element = template.querySelector('.element').cloneNode(true);
  const photo = element.querySelector('.element__photo');
  photo.src = item.link;
  photo.alt = item.name;
  element.querySelector('.element__title').textContent = item.name;
  elements.append(element); 
})

//добавление карточки пользователем
function addPhotoFormSubmitHandler (evt) {
  evt.preventDefault();
  const element = template.querySelector('.element').cloneNode(true);
  const photo = element.querySelector('.element__photo');
  const title = element.querySelector('.element__title');
  photo.src = linkInput.value;
  photo.alt = placeTitleInput.value;
  title.textContent = placeTitleInput.value;
  elements.prepend(element); 
  closePopup(popupAddPhoto);
  linkInput.value = '';
  placeTitleInput.value ='';
  element.querySelector('.button_type_delete').addEventListener('click', deleteElement);
  element.querySelector('.button_type_like').addEventListener('click', likeElement);
  photo.addEventListener('click', openPhoto);
}

formAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);

//удаление карточки
const buttonDelete = document.querySelectorAll('.button_type_delete');

function deleteElement (evt) {
  evt.target.closest('.element').remove();
}

buttonDelete.forEach(function(item) {
  item.addEventListener('click', deleteElement)
}); 

//лайк карточки 
const buttonLike = document.querySelectorAll('.button_type_like');

function likeElement (evt) {
  evt.target.classList.toggle('element__button_disabled');
}

buttonLike.forEach(function(item) {
  item.addEventListener('click', likeElement)
  });


//открытие модального окна просмотра фото 
const photo = document.querySelectorAll('.element__photo');

function openPhoto(evt) {
  if (evt.target.classList.contains('element__photo')) 
    openPopup(popupViewing);
  popupPhoto.src = evt.target.src;
  popupPhotoTitle.textContent = evt.target.alt;
}

photo.forEach(function(item) {
  item.addEventListener('click', openPhoto);
});