'use strict';

var TOTAL_POSTS = 8;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
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
    textArr[i] = text + getRandomNumber(1, TOTAL_POSTS);
  }
  return textArr;
};

var randomAddresses = getRandomAddresses();
var randomDescriptions = getRandomTextNumber('description');
var randomTitles = getRandomTextNumber('title');


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
      title: randomTitles[getRandomNumber(0, TOTAL_POSTS)],
      address: randomAddresses[getRandomNumber(0, TOTAL_POSTS)],
      price: getRandomNumber(134, 37463),
      type: TYPES[getRandomNumber(0, TYPES.length)],
      rooms: getRandomNumber(1, 5),
      checkin: CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)],
      checkout: CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)],
      features: getRandomLengthElements(ALL_FEATURES),
      description: randomDescriptions[getRandomNumber(0, randomDescriptions.length)],
      photos: getRandomLengthElements(ALL_PHOTOS),
      guests: getRandomNumber(0, 10)
    },
    location: {
      x: getRandomNumber(0, 1200) - (WIDTH_PIN / 2),
      y: getRandomNumber(130, 630) - HEIGHT_PIN
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


var renderCardImage = function (container, photos) {
  var imageTemplate = container.querySelector('img');
  for (var i = 0; i < photos.length; i++) {
    var imageElement = imageTemplate.cloneNode();
    imageElement.src = photos[i];
    container.appendChild(imageElement);
  }
  imageTemplate.remove();
};

var createCardElement = function (pin) {
  var card = pin;
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = templateCard.cloneNode(true);
  var cardPhotoContainer = cardElement.querySelector('.popup__photos');
  var filtersElement = document.querySelector('.map__filters-container');


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

  createFeatures(card.offer.features, cardElement);
  renderCardImage(cardPhotoContainer, card.offer.photos);

  filtersElement.insertAdjacentElement('beforebegin', cardElement);
};

// createCardElement(pins[0]);
renderPins(pins);


// close popup
var ESC = 27;
var ENTER = 13;
var closeButton = document.querySelector('.popup__close');
var popupCard = document.querySelector('.map__card');
var renderedPins = Array.from(document.querySelectorAll('.map__pin'));


// var PIN_TIP_HEIGHT = 22;
// var MAIN_PIN_HEIGHT = 65;
var mapFilter = document.querySelector('.map__filters');
var mapFilters = mapFilter.children;
var mapAdForm = document.querySelector('.ad-form');
var mapAdFormFields = mapAdForm.children;
var mainPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');


var changeFieldCondition = function (arr, condition) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = condition;
  }
  return arr;
};


mapPins.addEventListener('click', function (evt) {
  var arr = [];
  var target = event.target;
  if (target.className != 'map__pin' || target.className === 'map__pin--main') return;
  for (var i = 0; i <= TOTAL_POSTS; i++) {
    if (target === userPins[i])
    arr[i] = userPins[i];
  }
  var currentPin = arr.length;
  createCardElement(pins[currentPin - 1]);
});



var fillAdressField = function (pin) {
  var pinWidth = pin.getBoundingClientRect().width;
  // var pinHeight = pin.getBoundingClientRect().height;
  var pinX = Math.floor(pin.getBoundingClientRect().x - (pinWidth / 2));
  var pinY = Math.floor(pin.getBoundingClientRect().y);

  var addressValue = pinX + ', ' + pinY;
  addressField.value = addressValue;
};

fillAdressField(mainPin, HEIGHT_PIN);
changeFieldCondition(mapFilters, true);
changeFieldCondition(mapAdFormFields, true);

var activateMap = function () {
  renderPins(pins);
  changeFieldCondition(mapFilters);
  changeFieldCondition(mapAdFormFields);
  fillAdressField(mainPin, HEIGHT_PIN);
};

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    activateMap();
  }
});
mainPin.addEventListener('mousedown', function () {
  var buttonPressed = window.event.button;
  if (buttonPressed === 0) {
    activateMap();
  }
});

var deliteMainPin = function (arr) {
 return arr.splice(1, arr.length);
};

var userPins = deliteMainPin(renderedPins);




var closePopup = function (element) {
  element.classList.add('hidden');
};


var delitePopup = function (evt) {
  if (evt.keyCode === ESC) {
    closePopup(popupCard);
  }
};

closeButton.addEventListener ('click', function () {
  closePopup(popupCard);
});

document.addEventListener ('keydown', delitePopup);


// valid

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var notLetMore = function () {
  return roomNumber.value <= capacity.value;
};

notLetMore();

// var checkValidityHandler = function (check, element) {
//   if (!check) {
//     element.setCustomValidity('you wrong!');
//   }
// };
