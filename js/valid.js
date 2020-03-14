'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var HOUSE_MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };


  var findElement = window.tools.findElement;
  var formConteiner = findElement('.ad-form');
  var type = findElement('#type');
  var checkIn = findElement('#timein');
  var checkOut = findElement('#timeout');


  var notLetMore = function () {
    var roomNumber = findElement('#room_number');
    var capacity = findElement('#capacity');
    var roomNumberValue = parseInt(roomNumber.value, 10);
    var capacityValue = parseInt(capacity.value, 10);
    // var price = findElement('#price');
    return roomNumberValue <= capacityValue;
  };


  var priceCheckValid = function (element) {
    var isValid = true;
    var priceText = price.value;
    var priceValue = parseInt(priceText, 10);

    var minPrice = element.value;

    if (priceValue > MAX_PRICE || priceValue < minPrice) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;
  };

  var checkInValid = function () {
    var isValid = true;
    var timeIn = parseInt(checkIn.value, 10);
    var timeOut = parseInt(checkOut.value, 10);
    if (timeOut > timeIn) {
      checkOut.value = checkIn.value;
    }
  };


  var validators = [
    priceCheckValid,
    notLetMore
  ];

  formConteiner.addEventListener('input', function (evt) {
    var currentEvent = evt.target;
    var currentElementEvent = evt.target.value;
    checkInValid();
    notLetMore();
    price.placeholder = HOUSE_MIN_PRICES[type.value];

    for (var i = 0; i < validators.length; i++) {
      var validator = validators[i];

      if (!validator(currentEvent)) {
        currentEvent.setCustomValidity('no');
        break;
      } else {
      currentEvent.setCustomValidity('');
    }}
  });

})();
