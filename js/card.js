'use strict';

(function () {
  var ESC = 27;
  var cardElement = null;

  var renderCardImage = function (container, photos) {
    var imageTemplate = container.querySelector('img');
    for (var i = 0; i < photos.length; i++) {
      var imageElement = imageTemplate.cloneNode();
      imageElement.src = photos[i];
      container.appendChild(imageElement);
    }
    imageTemplate.remove();
  };

  var removeCardElement = function () {
    if (cardElement) {
      cardElement.remove();
    }
    cardElement = null;
  };

  var removeCardHandler = function (evt) {
    if (evt.keyCode === ESC) {
      removeCardElement();
    }
  };

  var createCardElement = function (pin) {
    var card = pin;
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');

    removeCardElement();

    cardElement = templateCard.cloneNode(true);
    var cardPhotoContainer = window.tools.findedElement('.popup__photos', cardElement);
    var filtersElement = window.tools.findedElement('.map__filters-container');

    var closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCardElement();
    });

    window.tools.map.addEventListener('keydown', removeCardHandler);


    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var houseTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    var type = houseTypes[card.offer.type];
    cardElement.querySelector('.popup__type').textContent = type;

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = card.autor.avatar;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    window.pin.createdFeatures(card.offer.features, cardElement);
    renderCardImage(cardPhotoContainer, card.offer.photos);

    filtersElement.insertAdjacentElement('beforebegin', cardElement);
  };

  window.card = {
    createdCardElement: createCardElement,
    removeCard: removeCardHandler
  };
})();
