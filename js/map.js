'use strict';

(function () {

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

  var MainPinStartPosition = {
    LEFT: 570,
    TOP: 375
  };


  var findElement = window.tools.findElement;
  var listen = window.tools.listen;

  var mapElement = findElement('.map');
  var filtersFormElement = findElement('.map__filters');
  var formElement = findElement('.ad-form');
  var mainPinElement = findElement('.map__pin--main');
  var mapPinsElement = findElement('.map__pins');
  var mapResetButtonElement = findElement('.ad-form__reset');

  var addressElement = formElement.elements.address;

  // Данные пинов
  var pins = [];
  // Активирована страница, или нет
  var activated = false;

  var changeFieldCondition = function (arr, condition) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = condition;
    }
    return arr;
  };

  var setAddressField = function (x, y) {
    addressElement.value = Math.floor(x) + ', ' + Math.floor(y);
  };


  var fillAdressField = function (pin, active) {
    var mapRect = mapPinsElement.getBoundingClientRect();
    var pinRect = pin.getBoundingClientRect();

    var halfOfWidh = PinSize.WIDTH / 2;

    var left = pinRect.left - mapRect.left;
    var top = pinRect.top - mapRect.top;

    var pinX = left + halfOfWidh;
    var pinY = active
      ? top + PinSize.HEIGHT
      // Потому что заблокированный пин — круглый
      : top + halfOfWidh;

    setAddressField(pinX, pinY);
  };

  fillAdressField(mainPinElement, false);
  changeFieldCondition(filtersFormElement.children, true);
  changeFieldCondition(formElement.children, true);

  var onLoad = function (data) {
    pins = data;
    window.pin.render(window.filter(pins));
  };

  var activateMap = function () {
    if (activated) {
      return;
    }
    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    window.backend.load(onLoad, window.modals.showLoadError);


    changeFieldCondition(filtersFormElement.children);
    changeFieldCondition(formElement.children);
    fillAdressField(mainPinElement, true);

    window.valid.init();

    activated = true;
  };


  var deactivateMap = function () {
    mapElement.classList.add('map--faded');
    formElement.classList.add('ad-form--disabled');
    mainPinElement.style.left = MainPinStartPosition.LEFT + 'px';
    mainPinElement.style.top = MainPinStartPosition.TOP + 'px';
    formElement.reset();
    window.pin.clear();
    window.card.remove();
    changeFieldCondition(formElement.children, true);
    fillAdressField(mainPinElement, false);
    activated = false;
  };


  listen(mainPinElement, 'keydown', function (evt) {
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

    mainPinElement.style.left = (address.x - PinSize.WIDTH / 2) + 'px';
    mainPinElement.style.top = (address.y - PinSize.HEIGHT) + 'px';

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
    var pinRect = mainPinElement.getBoundingClientRect();

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
    listen(document, 'mousemove', onMove, true);
    listen(document, 'mouseup', onUp);
  };

  listen(mainPinElement, 'mousedown', onPinMouseDown);

  listen(formElement, 'submit', function (evt) {
    evt.preventDefault();

    window.backend.save(
        new FormData(formElement),
        function () {
          window.modals.showSaveSuccess();
          deactivateMap();
        },
        window.modals.showSaveError
    );
  });

  listen(mapResetButtonElement, 'click', deactivateMap);

  var applyFilter = function () {
    window.pin.render(window.filter(pins));
    window.card.remove();
  };

  var applyFilterDebounced = window.tools.debounce(applyFilter);

  listen(filtersFormElement, 'change', function () {
    applyFilterDebounced();
  });

  window.map = {
    formElement: formElement,
    element: mapElement,
    deactivate: deactivateMap
  };
})();
