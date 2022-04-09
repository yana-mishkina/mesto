import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButtonOpen,
  addPhotoButtonOpen,
  popupEditProfileSelector,
  popupAddPhotoSelector,
  popupViewingSelector,
  formEditProfileSelector,
  formAddPhotoSelector,
  config,
  profileTitleSelector,
  profileSubtitleSelector,
  cardSelector,
  containerSelector,
  formEditAvatarSelector,
  avatarSelector,
  popupDeleteConfirmSelector,
  popupEditAvatarSelector,
  editAvatarButtonOpen
} from "../utils/constants.js";
import { api } from "../components/Api.js";

let userId;

api.getData()
  .then(( [userData, cardsList] ) => {
    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id
    
    cards.renderer(cardsList);
  })
  .catch((err) => console.log(err));

function createNewCard(item) {
  const card = new Card({ 
    name: item.name, 
    link: item.link,
    likes: item.likes,
    id: item._id,
    userId: userId,
    owner: item.owner._id,
    handleCardClick: () => handleCardClick(item),
    handleDeleteClick: () => handleDeleteClick(card),
    handleLikeClick: () => handleLikeClick(card, item)
  },
  cardSelector);
  
  return card.generate();
}

function handleCardClick(card) {
  popupPhotosViewing.open(card.link, card.name);
}

function handleDeleteClick(card) {
  popupDeleteConfirm.open();
      popupDeleteConfirm.changeFormSubmitHandler(() => {
        popupDeleteConfirm.renderLoading('Удаление...');
        api.deleteCard(card._id)
        .then(() => {
          card.deleteCard();
          popupDeleteConfirm.close();
        })
        .catch((err) => {
          console.log(`Ошибка удаления. ${err}.`);
        })
        .finally(() => {
          popupDeleteConfirm.renderLoading('Да');
        });
      });
}

function handleLikeClick(card, data) {
  if (card.isLiked()) {
    api.deleteLike(data._id)
      .then(res => {
        card.setLikeCount(res.likes)
      })
      .catch((err) => {
        console.log(`Ошибка лайка. ${err}.`);
      })
  } else {
    api.addLike(data._id)
      .then(res => {
        card.setLikeCount(res.likes)
      })
      .catch((err) => {
        console.log(`Ошибка лайка. ${err}.`);
      })
    }
  }

const cards = new Section({
  renderer: (item) => {
    const card = createNewCard(item);
    cards.addNewItem(card);
  },
}, 
containerSelector);

const popupPhotosViewing = new PopupWithImage(popupViewingSelector);
popupPhotosViewing.setEventListeners();

const userInfo = new UserInfo(profileTitleSelector, profileSubtitleSelector, avatarSelector);

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector, 
  (formValues) => {
    popupEditProfile.renderLoading('Сохранение...');
    api.editProfile(formValues.name, formValues.job)
      .then(() => {
        userInfo.setUserInfo(formValues.name, formValues.job);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка обновления информации профиля. ${err}.`);
      })
      .finally(() => {
        popupEditProfile.renderLoading('Сохранить');
      })   
  }
);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector,
  (formValue) => {
    popupEditAvatar.renderLoading('Сохранение...');
    api.editAvatar(formValue.avatar)
      .then(() => {
        userInfo.setUserAvatar(formValue.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара. ${err}.`);
      })
      .finally(() => {
        popupEditAvatar.renderLoading('Сохранить');
      });
  });
  popupEditAvatar.setEventListeners();

const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, 
  (item) => {
    popupAddPhoto.renderLoading('Сохранение...');
    api.addCard(item.name, item.link)
      .then(res => {
        const newCard = createNewCard(res)
        cards.addNewItem(newCard);
        popupAddPhoto.close();
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки. ${err}.`);
      })
      .finally(() => {
        popupAddPhoto.renderLoading('Сохранить');
      });
  }
);
popupAddPhoto.setEventListeners();

const popupDeleteConfirm = new PopupWithForm(popupDeleteConfirmSelector);
popupDeleteConfirm.setEventListeners();


const formValidatorEditProfile = new FormValidator(config, formEditProfileSelector);
formValidatorEditProfile.enableValidation();

const formValidatorEditAvatar = new FormValidator(config, formEditAvatarSelector);
  formValidatorEditAvatar.enableValidation();

const formValidatorAddPhoto = new FormValidator(config, formAddPhotoSelector);
formValidatorAddPhoto.enableValidation();


profileEditButtonOpen.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  popupEditProfile.open();
});

addPhotoButtonOpen.addEventListener('click', function () {
  formValidatorAddPhoto.toggleButtonState();
  popupAddPhoto.open();
});

editAvatarButtonOpen.addEventListener('click', function() {
  formValidatorEditAvatar.toggleButtonState();
  popupEditAvatar.open();
});