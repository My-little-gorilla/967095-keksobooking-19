'use strict';

(function () {
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

  var getRandomNumber = window.tools.getRandomNumber;

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


  window.data = pins;

})();
