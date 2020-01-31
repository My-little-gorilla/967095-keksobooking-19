'use strict';

var TOTAL_POSTS = 8;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUTS = [
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
var ALL_PHOTOS
 = [
   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
 ];


var titles = [
  'заголовок1',
  'заголовок2',
  'заголовок3',
  'заголовок4',
  'заголовок5',
  'заголовок6',
  'заголовок7',
  'заголовок8'
];
var addresses = [
  '100, 200',
  '200, 100',
  '120, 210',
  '300, 300',
  '400, 100',
  '520, 120',
  '600, 720',
  '700, 900'
];
var descriptions = [
  'описание1',
  'описание2',
  'описание3',
  'описание4',
  'описание5',
  'описание6',
  'описание7',
  'описание8'
];

var dataItems = [];

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = map.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomItem = function (item) {
  return item[getRandomNumber(0, item.length)];
};

var getPosts = function (returnedFunction) {
  var currentArr = [];
  for (var i = 1; i <= TOTAL_POSTS; i++) {
    currentArr[i - 1] = returnedFunction();
  }
  return currentArr;
};


var getRandomIndex = function (arr) {
  var index = getRandomNumber(0, arr.length);
  arr.length = index;
  return arr;
};


var getSrcAvatar = function () {
  var address = [];
  for (var i = 1; i < TOTAL_POSTS + 1; i++) {
    address[i] = 'img/avatars/user0' + i + '.png';
  }
  return address;
};
var avatarsUrl = getSrcAvatar();


var getAutor = function () {
  var userArr = [];
  var avatarUrl = avatarsUrl.pop();
  var userAutor = {
    avatar: avatarUrl
  };
  return userAutor;
};

var getOffer = function () {
  var userOffer = {
    title: getRandomItem(titles),
    address: getRandomItem(addresses),
    price: getRandomNumber(100, 10000),
    type: getRandomItem(TYPES),
    room: getRandomNumber(1, 700),
    guest: getRandomNumber(0, 100),
    checkin: getRandomItem(CHECKINS),
    checkout: getRandomItem(CHECKOUTS),
    features: getRandomIndex(ALL_FEATURES),
    description: getRandomItem(descriptions),
    photos: getRandomIndex(ALL_PHOTOS)
  };
  return userOffer;
};

var getLocation = function () {
  var userLocation = {
    x: getRandomNumber(0, 100),
    y: getRandomNumber(130, 630)
  };
  return userLocation;
};

var getUserItems = function () {
  var userItems = {
    userAutors: getPosts(getAutor),
    userOffers: getPosts(getOffer),
    userLocations: getPosts(getLocation)
  };
  return userItems;
};

var userData = getUserItems();

var renderPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < TOTAL_POSTS; i++) {

    var dataItem = userData[i];

    var pinElement = templatePin.cloneNode(true);
    pinElement.style.left = dataItem.userLocations.x + 'px';
    pinElement.style.top = dataItem.userLocations.y + 'px';
    pinElement.querySelector('img').src = dataItem.userAutors.avatar;
    pinElement.querySelector('img').alt = dataItem.userOffers.title;

    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};

renderPin();
