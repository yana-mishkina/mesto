export default class Card {
    constructor({ name, link, handleCardClick }, cardSelector) {
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
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
        this._addEventListener();
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this._card.querySelector('.element__title').textContent = this._name;

        return this._card;
    }

    _likeCard(e) {
        e.target.classList.toggle('element__button_disabled');
    }

    _deleteCard(e) {
        e.target.closest('.element').remove();
    }

    _addEventListener() {
        this._card.querySelector('.button_type_delete').addEventListener('click', (e) => {
            this._deleteCard(e);
        });
        this._card.querySelector('.button_type_like').addEventListener('click', (e) => {
            this._likeCard(e);
        });
        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

