'use strict';

(function () {
  var listen = window.tools.listen;
  var findElement = window.tools.findElement;

  var templatePinContent = findElement('#pin').content;
  var templatePinElement = findElement('.map__pin', templatePinContent);
  var mapPinsElement = findElement('.map__pins', window.map.element);

  var renderedPins = [];
  var focusedPinElement = null;

  var clearPins = function () {
    renderedPins.forEach(function (pinElement) {
      pinElement.remove();
    });
    focusedPinElement = null;
    renderedPins = [];
  };

  var focusPin = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };

  var unfocusPin = function (pinElement) {
    pinElement.classList.remove('map__pin--active');
  };

  var clearPinFocus = function () {
    if (focusedPinElement) {
      unfocusPin(focusedPinElement);
      focusedPinElement = null;
    }
  };


  var renderPins = function (pinsArr) {
    clearPins();
    var fragment = document.createDocumentFragment();
    pinsArr.forEach(function (pin) {
      var pinElement = templatePinElement.cloneNode(true);
      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      listen(pinElement, 'click', function () {
        window.card.create(pin);
        clearPinFocus();
        focusPin(pinElement);
        focusedPinElement = pinElement;
      });
      renderedPins.push(pinElement);
      fragment.appendChild(pinElement);
    });
    mapPinsElement.appendChild(fragment);
  };

  window.pin = {
    render: renderPins,
    clear: clearPins,
    clearFocus: clearPinFocus
  };
})();
