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
  nameInput,
  jobInput,
  initialCards,
  config,
  profileTitleSelector,
  profileSubtitleSelector,
  cardSelector,
  containerSelector,
  formEditAvatarSelector
} from "../utils/constants.js";
import { api } from "../components/Api.js";

let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
    userId = res._id;
  })

api.getInitialCards() 
  .then(cardsList => {
    cardsList.forEach(data => {
      const cardElement = createNewCard(data);
      cards.addNewItem(cardElement);
    })
  })
  

function createNewCard(item) {
  const card = new Card({ 
    name: item.name, 
    link: item.link,
    likes: item.likes,
    id: item._id,
    userId: userId,
    ownerId: item.owner._id,
    handleCardClick: () => {
      popupPhotosViewing.open(item.link, item.name);
      },
    handleDeleteClick: () => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeFormSubmitHandle(() => {
        api.deleteCard(id)
          .then((id) => {
            card.deleteCard(id);
            popupDeleteConfirm.close();
          })
        })
      },
    handleLikeClick: (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikeCount(res.likes)
          })
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikeCount(res.likes)
          })
        }
      }
    }, 
  cardSelector);
  return card.generate();
}

const cards = new Section({
  items: [], 
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cards.addDefaultItem(cardElement);
  },
}, 
containerSelector);
cards.renderer();

const popupPhotosViewing = new PopupWithImage(popupViewingSelector);
popupPhotosViewing.setEventListeners();

const avatarSelector = ('.profile__image');

const userInfo = new UserInfo(profileTitleSelector, profileSubtitleSelector, avatarSelector);

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector, 
  (formValues) => {
    api.editProfile(formValues.name, formValues.job)
      .then(() => {
        userInfo.setUserInfo(formValues.name, formValues.job);
        popupEditProfile.close();
      });
  }
);
popupEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(config, formEditProfileSelector);
formValidatorEditProfile.enableValidation();


const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, 
  (item) => {
    api.addCard(item.name, item.link)
      .then(res => {
        const cardElement = createNewCard({ name: res.name, link: res.link, likes: res.likes, id: res._id, userId: userId,
          ownerId: res.owner._id });
        cards.addNewItem(cardElement);
        popupAddPhoto.close();
      })
  }
);
popupAddPhoto.setEventListeners();


const popupDeleteConfirm = new PopupWithForm('.popup_delete-confirm');
popupDeleteConfirm.setEventListeners();


const formValidatorAddPhoto = new FormValidator(config, formAddPhotoSelector);
formValidatorAddPhoto.enableValidation();

profileEditButtonOpen.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
});

addPhotoButtonOpen.addEventListener('click', function () {
  formValidatorAddPhoto.toggleButtonState();
  popupAddPhoto.open();
});

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',
(formValue) => {
  api.editAvatar(formValue.avatar)
    .then(() => {
      userInfo.setUserAvatar(formValue.avatar);
    });
    popupEditAvatar.close();
});
popupEditAvatar.setEventListeners();

const formValidatorEditAvatar = new FormValidator(config, formEditAvatarSelector);
formValidatorEditAvatar.enableValidation();

const editAvatarButtonOpen = document.querySelector('.button_type_edit-avatar');

editAvatarButtonOpen.addEventListener('click', function() {
  popupEditAvatar.open();
});