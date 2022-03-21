import "./pages/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import {
  profileEditButtonOpen,
  addPhotoButtonOpen,
  popupEditProfileSelector,
  popupAddPhotoSelector,
  popupViewingSelector,
  formEditProfileSelector,
  formAddPhotoSelector,
  nameInput,
  jobInput,
  initialCards,
  popupPhotoSelector,
  popupPhotoTitleSelector,
  config,
  profileTitleSelector,
  profileSubtitleSelector,
  cardSelector,
  containerSelector
} from "./utils/constants.js";

function createNewCard(item) {
  const card = new Card({ 
    name: item.name, 
    link: item.link, 
    handleCardClick: (item) => {
      popupPhotosViewing.open(item.name, item.link);
      },
    }, 
  cardSelector);
  return card.generate();
}

const cards = new Section({
  items: initialCards, 
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cards.addDefaultItem(cardElement);
  },
}, 
containerSelector);
cards.renderer();

const popupPhotosViewing = new PopupWithImage(popupViewingSelector, popupPhotoSelector, popupPhotoTitleSelector);
popupPhotosViewing.setEventListeners();

const userInfo = new UserInfo(profileTitleSelector, profileSubtitleSelector);

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector, 
  (formValues) => {
    userInfo.setUserInfo(formValues);
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(config, formEditProfileSelector);
formValidatorEditProfile.enableValidation();


const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, 
  (item) => {
    const cardElement = createNewCard(item);
    cards.addNewItem(cardElement);
    popupAddPhoto.close();
  }
);
popupAddPhoto.setEventListeners();

const formValidatorAddPhoto = new FormValidator(config, formAddPhotoSelector);
formValidatorAddPhoto.enableValidation();

profileEditButtonOpen.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
});

addPhotoButtonOpen.addEventListener('click', function () {
  popupAddPhoto.open();
});

