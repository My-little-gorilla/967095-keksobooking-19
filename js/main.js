'use strict';

var TOTAL_POSTS = 8;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKINS_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var ALL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var map = document.querySelector('.map');
map.classList.remove('map--faded');


var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = map.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomAddresses = function () {
  var addresses = [];
  for (var i = 0; i < TOTAL_POSTS; i++) {
    addresses[i] = '' + getRandomNumber(100, 1000) + ',' + ' ' + getRandomNumber(100, 1000) + '';
  }
  return addresses;
};

var getRandomTextNumber = function (text) {
  var textArr = [];
  for (var i = 0; i < TOTAL_POSTS; i++) {
    textArr[i] = text + getRandomNumber(1, 8);
  }
  return textArr;
};

var ADDRESSES = getRandomAddresses();
var DESCRIPTIONS = getRandomTextNumber('description');
var TITLES = getRandomTextNumber('title');


var getRandomLengthElements = function (elements) {
  var length = getRandomNumber(0, elements.length + 1);
  return elements.slice(0, length);
};


var getSrcAvatar = function () {
  var address = [];
  for (var i = 1; i < TOTAL_POSTS + 1; i++) {
    address[i] = 'img/avatars/user0' + i + '.png';
  }
  return address;
};
var avatarsUrl = getSrcAvatar();

var generatePin = function () {
  var userGen = {
    autor: {
      avatar: avatarsUrl.pop()
    },
    offer: {
      title: TITLES[getRandomNumber(0, TOTAL_POSTS)],
      address: ADDRESSES[getRandomNumber(0, TOTAL_POSTS)],
      price: getRandomNumber(134, 37463),
      type: TYPES[getRandomNumber(0, TYPES.length)],
      rooms: getRandomNumber(1, 5),
      checkin: CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)],
      checkout: CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)],
      features: getRandomLengthElements(ALL_FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
      photos: getRandomLengthElements(ALL_PHOTOS),
      guests: getRandomNumber(0, 10)
    },
    location: {
      x: getRandomNumber(0, 1200),
      y: getRandomNumber(130, 630)
    }
  };
  return userGen;
};

var generatePins = function (length) {
  var pins = [];
  for (var i = 0; i < length; i++) {
    var pin = generatePin();
    pins[i] = pin;
  }
  return pins;
};

var pins = generatePins(TOTAL_POSTS);


var renderPins = function (pinsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsArr.length; i++) {

    var pin = pinsArr[i];

    var pinElement = templatePin.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.autor.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;


    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};


var createCardElement = function () {
  var card = pins[0];
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();
  var cardElement = templateCard.cloneNode(true);
  var cardPhotoContainer = cardElement.querySelector('.popup__photos');
  var cardPhotoContainerImages = cardPhotoContainer.querySelectorAll('img');


  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

  var type = card.offer.type;
  if (card.offer.type === 'flat') {
    type = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    type = 'Бунгало';
  } else if (card.offer.type === 'house') {
    type = 'Дом';
  } else {
    type = 'Дворец';
  }

  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardPhotoContainerImages.length = card.offer.photos.length;

  for (var i = 0; i < card.offer.photos.length; i++) {
    cardPhotoContainerImages[i].src = card.offer.photos[i];
  }

  cardFragment.appendChild(cardElement);
  map.appendChild(cardFragment);
};


createCardElement();
renderPins(pins);
