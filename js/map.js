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


  var mapArea = findElement('.map__pins');

  mainPin.addEventListener('mousedown', onPinMouseDown);
  mainPin.addEventListener('mousedown', activateMap);

  var movePinTo = function (left, top) {
    mainPin.style.left = left + 'px';
    mainPin.style.left = top + 'px';
    addressElement.value = left + ',' + top;
  };


  var move = function (clientX, left, offsetX, maxLeft, clientY, top, offsetY, maxTop) {
    var left = clientX - left - offsetX;
    var top = clientY - top - offsetY;
    if (left < 0) {
      left = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }
    movePinTo(left, top);
  };


  var onPinMouseDown = function (evt) {
    var rect = mapArea.getBoundingClientRect();
    var maxLeft = rect.width;
    var offsetX = evt.offsetX;
    var offsetY = evt.offsetY;
    var onMove = function (evt) {
      evt.stopPropagation();
      move(evt.clientX, rect.left, offsetX, maxLeft, evt.clientY, rect.top, offsetY);
    };

    var onUp = function (evt) {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onUp);
  };

  window.map = {
    formElement: formElement,
    element: mapElement
  };
})();
