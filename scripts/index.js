const profileEditButtonOpen = document.querySelector('.button_type_edit');
const addPhotoButtonOpen = document.querySelector('.button_type_add');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.button_type_resert');
const formElement = document.querySelectorAll('.popup__form');
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



//открытие попапов
function openPopupEditProfile() {
  popup[0].classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openPopupAddPhoto() {
  popup[1].classList.add('popup_opened');
}

profileEditButtonOpen.addEventListener('click', openPopupEditProfile);
addPhotoButtonOpen.addEventListener('click', openPopupAddPhoto);

//закртиые попапов
function closePopupEditProfile() {
  popup[0].classList.remove('popup_opened');
}

function closePopupAddPhoto() {
  popup[1].classList.remove('popup_opened');
  linkInput.value = '';
  placeTitleInput.value ='';
}

popupCloseButton[0].addEventListener('click', closePopupEditProfile);
popupCloseButton[1].addEventListener('click', closePopupAddPhoto);

//редактирование информации в профиле
function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopupEditProfile();
}

formElement[0].addEventListener('submit', editProfileFormSubmitHandler); 

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
  closePopupAddPhoto();
  linkInput.value = '';
  placeTitleInput.value ='';
  element.querySelector('.button_type_delete').addEventListener('click', deleteElement);
  element.querySelector('.button_type_like').addEventListener('click', likeElement);
  photo.addEventListener('click', openPhoto);
}

formElement[1].addEventListener('submit', addPhotoFormSubmitHandler);

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
const popupViewing = document.querySelector('.popup-viewing');
const photo = document.querySelectorAll('.element__photo');

function openPhoto(evt) {
  if (evt.target.classList.contains('element__photo')) 
     popupViewing.classList.add('popup-viewing_opened');
  popupViewing.querySelector('.popup-viewing__photo').src = evt.target.src;
  popupViewing.querySelector('.popup-viewing__photo-title').textContent = evt.target.alt;
}

photo.forEach(function(item) {
  item.addEventListener('click', openPhoto);
})


//закрытие модального окна просмотра фото
const buttonClosePopupViewing = document.querySelector('.popup-viewing__button');

function closePopupViewing () {
  popupViewing.classList.remove('popup-viewing_opened');
}

buttonClosePopupViewing.addEventListener ('click', closePopupViewing);
