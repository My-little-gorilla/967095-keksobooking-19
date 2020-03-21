'use strict';

(function () {
  // Это не перечисление, это объект для маппинга
  var HOUSE_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var findElement = window.tools.findElement;

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
      window.removeEventListener('keydown', removeCardHandler);
    }
    cardElement = null;
  };

  var removeCardHandler = function (evt) {
    if (window.tools.isEsc(evt)) {
      removeCardElement();
    }
  };

  var createFeatures = function (features, cardElement) {
    var featureList = cardElement.querySelector('.popup__features');
    var featureFragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + features[i]);
      featureFragment.appendChild(featureElement);
    }
    featureList.appendChild(featureFragment);
  };

  var createCardElement = function (pin) {
    var card = pin;
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');

    removeCardElement();

    cardElement = templateCard.cloneNode(true);
    var cardPhotoContainer = findElement('.popup__photos', cardElement);
    var filtersElement = findElement('.map__filters-container');

    var closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCardElement();
    });

    window.addEventListener('keydown', removeCardHandler);


    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var type = HOUSE_TYPES[card.offer.type];
    cardElement.querySelector('.popup__type').textContent = type;

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    createFeatures(card.offer.features, cardElement);
    renderCardImage(cardPhotoContainer, card.offer.photos);

    filtersElement.insertAdjacentElement('beforebegin', cardElement);
  };

  window.card = {
    createdCardElement: createCardElement,
    removeCard: removeCardHandler
  };
})();
