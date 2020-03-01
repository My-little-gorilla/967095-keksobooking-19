'use strict';

(function () {
  var HEIGHT_PIN = 70;

  var findElement = window.tools.findElement;

  var mapElement = findElement('.map');
  var filtersElement = findElement('.map__filters');
  var formElement = findElement('.ad-form');
  var mainPin = findElement('.map__pin--main');

  var addressElement = formElement.elements.address;

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
    addressElement.value = addressValue;
  };

  fillAdressField(mainPin, HEIGHT_PIN);
  changeFieldCondition(filtersElement.children, true);
  changeFieldCondition(formElement.children, true);

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    window.pin.renderedPins(window.data);
    changeFieldCondition(filtersElement.children);
    changeFieldCondition(formElement.children);
    fillAdressField(mainPin, HEIGHT_PIN);
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (window.tools.isEnter(evt)) {
      activateMap();
    }
  });

  mainPin.addEventListener('mousedown', function () {
    activateMap();
  });

  window.map = {
    formElement: formElement,
    element: mapElement
  };
})();
