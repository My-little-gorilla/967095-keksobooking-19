'use strict';

(function () {
  var HEIGHT_PIN = 70;

  var LimitX = {
    MIN: 0,
    MAX: 1200
  };

  var LimitY = {
    MIN: 130,
    MAX: 630
  };

  var PinSize = {
    WIDTH: 65,
    HEIGHT: 70
  };

  var findElement = window.tools.findElement;

  var mapElement = findElement('.map');
  var filtersElement = findElement('.map__filters');
  var formElement = findElement('.ad-form');
  var mainPin = findElement('.map__pin--main');
  var mapPinsElement = findElement('.map__pins');

  var addressElement = formElement.elements.address;

  var changeFieldCondition = function (arr, condition) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = condition;
    }
    return arr;
  };

  var setAddressField = function (x, y) {
    addressElement.value = Math.floor(x) + ', ' + Math.floor(y);
  };


  var fillAdressField = function (pin) {
    var pinWidth = pin.getBoundingClientRect().width;
    var pinX = pin.getBoundingClientRect().x - (pinWidth / 2);
    var pinY = pin.getBoundingClientRect().y;

    setAddressField(pinX, pinY);
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

  var getAddress = function (left, top) {
    var addressX = left + PinSize.WIDTH / 2;
    var addressY = top + PinSize.HEIGHT;

    if (addressX < LimitX.MIN) {
      addressX = LimitX.MIN;
    } else if (addressX > LimitX.MAX) {
      addressX = LimitX.MAX;
    }

    if (addressY < LimitY.MIN) {
      addressY = LimitY.MIN;
    } else if (addressY > LimitY.MAX) {
      addressY = LimitY.MAX;
    }

    return {
      x: addressX,
      y: addressY
    };
  };

  var movePinTo = function (left, top) {
    var address = getAddress(left, top);

    mainPin.style.left = (address.x - PinSize.WIDTH / 2) + 'px';
    mainPin.style.top = (address.y - PinSize.HEIGHT) + 'px';

    setAddressField(address.x, address.y);
  };

  var move = function (left, top, offset, evt, pinRect) {
    var leftTo = evt.clientX - left - offset.x;
    var topTo = evt.clientY - top - offset.y;

    movePinTo(leftTo, topTo, pinRect);
  };


  var onPinMouseDown = function (evt) {
    activateMap();
    var rect = mapPinsElement.getBoundingClientRect();
    var pinRect = mainPin.getBoundingClientRect();

    var offset = {
      x: evt.offsetX,
      y: evt.offsetY
    };

    var onMove = function (moveEvt) {
      moveEvt.stopPropagation();
      move(rect.left, rect.top, offset, moveEvt, pinRect);
    };

    var onUp = function () {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onUp);
  };

  mainPin.addEventListener('mousedown', onPinMouseDown);

  formElement.addEventListener('submit', function (evt) {
    // window.upload()
    window.upload(new FormData(formElement))
    evt.preventDefault();
  });

  window.map = {
    formElement: formElement,
    element: mapElement
  };
})();
