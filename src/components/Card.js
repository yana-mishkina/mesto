export default class Card {
    constructor({ name, link, likes, id, userId, owner, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._id = id;
        this._userId = userId;
        this._owner = owner;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._cardSelector = cardSelector;
    }

    _getCardElement() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generate() {
        this._card = this._getCardElement();
        this._cardPhoto = this._card.querySelector('.element__photo');
        this._likeButton = this._card.querySelector('.button_type_like');
        this._deleteButton = this._card.querySelector('.button_type_delete');
        this._likeCountElement = this._card.querySelector('.element__like-count');
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this._card.querySelector('.element__title').textContent = this._name;
        this.setLikeCount(this._likes);
        if (this._owner !== this._userId) {
            this._deleteButton.style.display = 'none';
        }
        this._addEventListener();

        return this._card;
    }

    _likeCard() {
        this._likeButton.classList.remove('element__button_disabled');
    }

    _nonLikeCard() {
        this._likeButton.classList.add('element__button_disabled');
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        return userHasLikedCard;
    }

    setLikeCount(newLikes) {
        this._likes = newLikes;
        this._likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._likeCard();
        } else {
            this._nonLikeCard();
        }
    }

    deleteCard() {
       this._card.remove();
       this._card = null;
    }

    _addEventListener() {
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

