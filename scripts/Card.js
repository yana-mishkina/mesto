import { openPopup, popupViewing } from "./index.js";
export { Card };

class Card {
    constructor(name, link) {
      this._name = name;
      this._link = link;
    }
  
    _getCardElement() {
      const cardElement = document
        .querySelector('#template')
        .content
        .querySelector('.element')
        .cloneNode(true);
      
      return cardElement;
    }
  
    generate() {
      this._card = this._getCardElement();
      this._addEventListener();
      this._card.querySelector('.element__photo').src = this._link;
      this._card.querySelector('.element__photo').alt = this._name;
      this._card.querySelector('.element__title').textContent = this._name;
  
      return this._card;
    }
    
    _likeCard(e) {
      e.target.classList.toggle('element__button_disabled');
    }
  
    _deleteCard(e) {
      e.target.closest('.element').remove();
    }
  
    _openPhoto() {
      openPopup(popupViewing);
      const popupPhoto = document.querySelector('.popup__photo');
      popupPhoto.src = this._link;
      popupPhoto.alt = this._name;
      const popupPhotoTitle = document.querySelector('.popup__photo-title');
      popupPhotoTitle.textContent = this._name;
    }
  
    _addEventListener() {
      this._card.querySelector('.button_type_delete').addEventListener('click', (e) => {
        this._deleteCard(e);
      });
      this._card.querySelector('.button_type_like').addEventListener('click', (e) => {
        this._likeCard(e);
      });
      this._card.querySelector('.element__photo').addEventListener('click', (e) => {
        this._openPhoto(e);
      });
    }  
}

