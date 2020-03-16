'use strict';

(function () {
  var HOUSE_MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var listen = window.tools.listen;


  var findElement = window.tools.findElement;
  var formContainer = findElement('.ad-form');

  var typeElement = formContainer.elements.type;
  var priceElement = formContainer.elements.price;
  var inElement = formContainer.elements.timein;
  var outElement = formContainer.elements.timeout;
  var roomsElement = formContainer.elements.rooms;
  var capacityElement = formContainer.elements.capacity;

  var changeMinLimit = function (inputElement, value) {
    inputElement.min = value;
    inputElement.placeholder = value;
  };

  listen(typeElement, 'change', function (evt) {
    changeMinLimit(priceElement, HOUSE_MIN_PRICES[evt.target.value]);
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

    if (rooms === 100) {
      return guests === 0;
    }

    if (guests === 0) {
      return rooms === 100;
    }

    return rooms >= guests;
  };

  var onRoomsOrGuestsChange = function () {
    if (!validateRooms(roomsElement.value, capacityElement.value)) {
      roomsElement.setCustomValidity('Вы выбрали неверное число гостей и комнат');
    } else {
      roomsElement.setCustomValidity('');
    }
  };

  listen(roomsElement, 'change', onRoomsOrGuestsChange);
  listen(capacityElement, 'change', onRoomsOrGuestsChange);

})();
