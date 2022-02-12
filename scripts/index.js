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
const element = template.querySelector('.element');
const popupPhotoContainer = document.querySelector('.popup__photo-container');
const buttonSubmit = formAddPhoto.querySelector('.popup__button_type_save');
const popups = document.querySelectorAll('.popup');

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
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

popups.forEach(function(popup) {
  popup.addEventListener('mousedown', function(e) {
      if (e.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
  })
})

//не поняла как объединить эти функции в универсальную:
buttonClosePopupProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

buttonClosePopupAddPhoto.addEventListener('click', function(){
  closePopup(popupAddPhoto);
});

buttonClosePopupViewing.addEventListener('click', function() {
  closePopup(popupViewing);
});

//редактирование информации в профиле
function handleProfileFormSubmit (evt) {
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

//функция создания карточки 
function createCard(cardTitle, cardUrl) {
  const card = element.cloneNode(true);
  card.querySelector('.element__title').textContent = cardTitle;
  const photo = card.querySelector('.element__photo');
  photo.src = cardUrl;
  photo.alt = cardTitle;
  addEventListener(card);
  return card;
}

//вставка карочек из коробки
initialCards.forEach(function(item) {
  elements.append(createCard(item.name, item.link)); 
})

//добавление карточки пользователем
function handleAddPhotoFormSubmit (evt) {
  evt.preventDefault();
  elements.prepend(createCard(placeTitleInput.value, linkInput.value))
  closePopup(popupAddPhoto);
  linkInput.value = '';
  placeTitleInput.value ='';
  buttonSubmit.classList.add('button_disabled');
  buttonSubmit.setAttribute('disabled', 'disabled');
}

formAddPhoto.addEventListener('submit', handleAddPhotoFormSubmit);

//удаление карточки
function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

//лайк карточки 
function likeCard (evt) {
  evt.target.classList.toggle('element__button_disabled');
}

//открытие модального окна просмотра фото 
function openPhoto(evt) {
  if (evt.target.classList.contains('element__photo')) 
    openPopup(popupViewing);
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
  popupPhotoTitle.textContent = evt.target.alt;
}