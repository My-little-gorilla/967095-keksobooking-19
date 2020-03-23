'use strict';

(function () {
  // Это маппинг, а не перечисление
  var PRICES = {
    low: {floor: 0, ceil: 10000},
    middle: {floor: 10000, ceil: 50000},
    high: {floor: 50000, ceil: Infinity}
  };

  var findElement = window.tools.findElement;

  var filtersFormElement = findElement('.map__filters');
  var featuresSelectElement = findElement('#housing-features');
  var typeSelectElement = filtersFormElement.elements['housing-type'];
  var priceSelectElement = filtersFormElement.elements['housing-price'];
  var roomsSelectElement = filtersFormElement.elements['housing-rooms'];
  var guestsSelectElement = filtersFormElement.elements['housing-guests'];
  var featuresElements = featuresSelectElement.elements;

  var isAny = function (value) {
    return value === 'any';
  };

  var isType = function (pin, type) {
    return isAny(type) || pin.offer.type === type;
  };

  var isPrice = function (pin, price) {
    if (isAny(price)) {
      return true;
    }

    var limits = PRICES[price];
    return pin.offer.price >= limits.floor
      && pin.offer.price < limits.ceil;
  };

  var isRooms = function (pin, rooms) {
    if (isAny(rooms)) {
      return true;
    }
    rooms = parseInt(rooms, 10);

    return pin.offer.rooms === rooms;
  };


  var isGuests = function (pin, guests) {
    if (isAny(guests)) {
      return true;
    }
    guests = parseInt(guests, 10);

    return pin.offer.guests === guests;
  };

  var isFeatures = function (pin) {
    for (var i = 0; i < featuresElements.length; i++) {
      var featureElement = featuresElements[i];
      if (!featureElement.checked) {
        continue;
      }

      var hasFeature = pin.offer.features.some(function (feature) {
        return feature === featureElement.value;
      });

      if (!hasFeature) {
        return false;
      }
    }

    return true;
  };

  window.filter = function (pins) {
    var outPins = [];

    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      if (isType(pin, typeSelectElement.value)
          && isPrice(pin, priceSelectElement.value)
          && isRooms(pin, roomsSelectElement.value)
          && isGuests(pin, guestsSelectElement.value)
          && isFeatures(pin)) {

        outPins.push(pin);
      }

      if (outPins.length === 5) {
        return outPins;
      }
    }

    return outPins;
  };
})();
