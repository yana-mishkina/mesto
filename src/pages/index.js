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
  config,
  profileTitleSelector,
  profileSubtitleSelector,
  cardSelector,
  containerSelector,
  formEditAvatarSelector,
  buttonDeleteConfirm,
  buttonSubmitProfile,
  buttonSubmitPhoto,
  buttonSubmitAvatar,
  avatarSelector,
  popupDeleteConfirmSelector,
  popupEditAvatarSelector,
  editAvatarButtonOpen
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
    owner: item.owner._id,

    handleCardClick: () => {
      popupPhotosViewing.open(item.link, item.name);
      },

    handleDeleteClick: () => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeFormSubmitHandler(() => {
        buttonDeleteConfirm.textContent = "Удаление...";
        api.deleteCard(item._id)
        .then(() => {
          card.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка удаления. ${err}.`);
        })
        .finally(() => {
          popupDeleteConfirm.close();
          buttonDeleteConfirm.textContent = 'Да';
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

const userInfo = new UserInfo(profileTitleSelector, profileSubtitleSelector, avatarSelector);

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

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector,
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

const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, 
  (item) => {
    buttonSubmitPhoto.textContent = 'Сохранение...';
    api.addCard(item.name, item.link)
      .then(res => {
        const cardElement = createNewCard({ name: res.name, link: res.link, likes: res.likes, id: res._id, userId: userId,  owner: res.owner._id });
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

const formValidatorAddPhoto = new FormValidator(config, formAddPhotoSelector);
formValidatorAddPhoto.enableValidation();

const popupDeleteConfirm = new PopupWithForm(popupDeleteConfirmSelector);
popupDeleteConfirm.setEventListeners();


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

editAvatarButtonOpen.addEventListener('click', function() {
  popupEditAvatar.open();
});