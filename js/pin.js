'use strict';

(function () {

  var findElement = window.tools.findElement;

  var templatePinContent = findElement('#pin').content;
  var templatePin = findElement('.map__pin', templatePinContent);
  var mapPins = findElement('.map__pins', window.map.element);

  var renderedPins = [];

  var clearPins = function () {
    renderedPins.forEach(function (pinElement) {
      pinElement.remove();
    });
    renderedPins = [];
  };

  var focusPin = function (evt) {
    if (evt.currentTarget.focus) {
      evt.currentTarget.classList.add('map__pin--active');
    }
    // if (evt.currentTarget.blur) {
    //   evt.currentTarget.classList.remove('map__pin--active');
    // }
  };

  var renderPins = function (pinsArr) {
    clearPins();
    var fragment = document.createDocumentFragment();
    pinsArr.forEach(function (pin) {
      var pinElement = templatePin.cloneNode(true);
      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      pinElement.addEventListener('click', function (evt) {
        window.card.create(pin);
        focusPin(evt);
      });

      renderedPins.push(pinElement);
      fragment.appendChild(pinElement);
    });
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    clear: clearPins
  };
})();
