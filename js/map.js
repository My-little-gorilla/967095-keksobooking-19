'use strict';

(function () {
  var HEIGHT_PIN = 70;
  var map = window.tools.findedElement('.map');

  var mapFilter = window.tools.findedElement('.map__filters');
  var mapFilters = mapFilter.children;
  var mapAdForm = window.tools.findedElement('.ad-form');
  var mapAdFormFields = mapAdForm.children;
  var mainPin = window.tools.findedElement('.map__pin--main');
  var addressField = window.tools.findedElement('#address');

  var changeFieldCondition = function (arr, condition) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = condition;
    }
    return arr;
  };


  var fillAdressField = function (pin) {
    var pinWidth = pin.getBoundingClientRect().width;
    var pinX = Math.floor(pin.getBoundingClientRect().x - (pinWidth / 2));
    var pinY = Math.floor(pin.getBoundingClientRect().y);

    var addressValue = pinX + ', ' + pinY;
    addressField.value = addressValue;
  };

  fillAdressField(mainPin, HEIGHT_PIN);
  changeFieldCondition(mapFilters, true);
  changeFieldCondition(mapAdFormFields, true);

  var activateMap = function () {
    map.classList.remove('map--faded');
    mapAdForm.classList.remove('ad-form--disabled');

    window.pin.renderedPins(window.data.pins);
    changeFieldCondition(mapFilters);
    changeFieldCondition(mapAdFormFields);
    fillAdressField(mainPin, HEIGHT_PIN);
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.tools.enterKeycode) {
      activateMap();
    }
  });
  mainPin.addEventListener('mousedown', function () {
    var buttonPressed = window.event.button;
    if (buttonPressed === 0) {
      activateMap();
    }
  });

  var noticeForm = window.tools.findedElement('.notice');
  noticeForm.addEventListener('mouseover', function () {
    map.removeEventListener('keydown', window.card.removeCard);
  });

})();
