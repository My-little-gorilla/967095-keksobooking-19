'use strict';

(function () {
  // Это не перечисление, а маппинг
  var HOUSE_MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var NO_GUESTS = 0;
  var MAX_ROOMS_OR_GUESTS = 100;


  var listen = window.tools.listen;


  var findElement = window.tools.findElement;
  var formContainerElement = findElement('.ad-form');

  var typeElement = formContainerElement.elements.type;
  var priceElement = formContainerElement.elements.price;
  var inElement = formContainerElement.elements.timein;
  var outElement = formContainerElement.elements.timeout;
  var roomsElement = formContainerElement.elements.rooms;
  var capacityElement = formContainerElement.elements.capacity;

  var changeMinLimit = function (inputElement, value) {
    inputElement.min = value;
    inputElement.placeholder = value;
  };

  var recalculatePriceLimit = function () {
    changeMinLimit(priceElement, HOUSE_MIN_PRICES[typeElement.value]);
  };

  var revalidateRoomsAndGuests = function () {
    if (!validateRooms(roomsElement.value, capacityElement.value)) {
      roomsElement.setCustomValidity('Вы выбрали неверное число гостей и комнат');
    } else {
      roomsElement.setCustomValidity('');
    }
  };

  listen(typeElement, 'change', function () {
    recalculatePriceLimit();
  });

  var syncValues = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };

  listen(inElement, 'change', function () {
    syncValues(inElement, outElement);
  });

  listen(outElement, 'change', function () {
    syncValues(outElement, inElement);
  });

  var validateRooms = function (rooms, guests) {
    rooms = parseInt(rooms, 10);
    guests = parseInt(guests, 10);

    if (rooms === MAX_ROOMS_OR_GUESTS) {
      return guests === NO_GUESTS;
    }

    if (guests === NO_GUESTS) {
      return rooms === MAX_ROOMS_OR_GUESTS;
    }

    return rooms >= guests;
  };

  var onRoomsOrGuestsChange = function () {
    revalidateRoomsAndGuests();
  };

  listen(roomsElement, 'change', onRoomsOrGuestsChange);
  listen(capacityElement, 'change', onRoomsOrGuestsChange);

  var init = function () {
    recalculatePriceLimit();
    revalidateRoomsAndGuests();
  };

  window.valid = {
    init: init
  };
})();
