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
    ownerId: item.owner,
    handleCardClick: () => {
      popupPhotosViewing.open(item.link, item.name);
      },
    handleDeleteClick: (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeFormSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            console.log('id', id)
            // card.deleteCard();
            // popupDeleteConfirm.close();
          });
        });
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

const buttonSubmitProfile = document.querySelector('.button_submit_profile');

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector, 
  (formValues) => {
    buttonSubmitProfile.textContent = 'Сохранение...';
    api.editProfile(formValues.name, formValues.job)
      .then(() => {
        userInfo.setUserInfo(formValues.name, formValues.job);
      })
      .catch((err) => {
        console.log(`Ошибка обновления информации профиля. ${err}.`);
      })
      .finally(() => {
        popupEditProfile.close();
        buttonSubmitProfile.textContent = 'Сохранить';
      })   
  }
);
popupEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(config, formEditProfileSelector);
formValidatorEditProfile.enableValidation();

const buttonSubmitPhoto = document.querySelector('.button_submit_photo');

const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, 
  (item) => {
    buttonSubmitPhoto.textContent = 'Сохранение...';
    api.addCard(item.name, item.link)
      .then(res => {
        const cardElement = createNewCard({ name: res.name, link: res.link, likes: res.likes, id: res._id, userId: userId,
          ownerId: res.owner });
        cards.addNewItem(cardElement);
        popupAddPhoto.close();
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки. ${err}.`);
      })
      .finally(() => {
        popupEditAvatar.close();
        buttonSubmitPhoto.textContent = 'Сохранить';
      });
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

const buttonSubmitAvatar = document.querySelector('.button_submit_avatar');

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',
(formValue) => {
  buttonSubmitAvatar.textContent = 'Сохранение...';
  api.editAvatar(formValue.avatar)
    .then(() => {
      userInfo.setUserAvatar(formValue.avatar);
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара. ${err}.`);
    })
    .finally(() => {
      popupEditAvatar.close();
      buttonSubmitAvatar.textContent = 'Сохранить';
    });
});

popupEditAvatar.setEventListeners();

const formValidatorEditAvatar = new FormValidator(config, formEditAvatarSelector);
formValidatorEditAvatar.enableValidation();

const editAvatarButtonOpen = document.querySelector('.button_type_edit-avatar');

editAvatarButtonOpen.addEventListener('click', function() {
  popupEditAvatar.open();
});