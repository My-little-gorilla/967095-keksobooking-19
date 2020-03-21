'use strict';

(function () {
  // Это маппинг, а не перечисление
  var PRICES = {
    low: {floor: 0, ceil: 10000},
    middle: {floor: 10000, ceil: 50000},
    high: {floor: 50000, ceil: Infinity}
  };

  var isEsc = window.tools.isEsc;

  var findElement = window.tools.findElement;

  var filtersForm = findElement('.map__filters');
  var featuresSelect = findElement('#housing-features');

  var typeSelect = filtersForm.elements['housing-type'];
  var priceSelect = filtersForm.elements['housing-price'];
  var roomsSelect = filtersForm.elements['housing-rooms'];
  var guestsSelect = filtersForm.elements['housing-guests'];
  var featuresElements = featuresSelect.elements;

  console.log(featuresElements);


  var isAny = function (value) {
    return value === 'any';
  };

  var isType = function (pin, type) {
    return isAny(type) || pin.offer.type === type;
  };

  var isPrice = function (pin, price) {
    if (isAny(price)) {
      return true;
    };

    var limits = PRICES[price];
    return pin.offer.price >= limits.floor
      && pin.offer.price < limits.ceil;
  };

  var isRooms = function (pin, rooms) {
    if (isAny(rooms)) {
      return true;
    } else {
      rooms = parseInt(rooms, 10)
    };

    if (pin.offer.rooms === rooms) {
      return true;
    };
  };


  var isGuests = function (pin, guests) {
    if (isAny(guests)) {
      return true;
    } else {
      guests = parseInt(guests, 10)
    };

    if (pin.offer.guests === guests) {
      return true;
    };
  };

  var isChecked = function (pin) {
    if (isAny(features)) {
      return true;
    };
    var checkboxesChecked = [];
    for (var i = 0; i < featuresElements.length; i++) {
    if (featuresElements[i].checked) {
       checkboxesChecked.push(featuresElements[i].value);
     }
   };
   if (pin.offer.features === checkboxesChecked) {
     return true;
  }
};

  window.filter = function (pins) {

    return pins.filter(function (pin) {
      return isType(pin, typeSelect.value)
        && isPrice(pin, priceSelect.value)
        && isRooms(pin, roomsSelect.value)
        && isGuests(pin, guestsSelect.value)

        // && isChecked(pin, features.value);
    });
  };
})();
