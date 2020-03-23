'use strict';

(function () {
  var listen = window.tools.listen;
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
    evt.currentTarget.classList.add('map__pin--active');
  };
  var unfocusPin = function (evt) {
    evt.currentTarget.classList.remove('map__pin--active');
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
      listen(pinElement, 'click', function (evt) {
        window.card.create(pin);
        focusPin(evt);
      });
      listen(pinElement, 'blur', function (evt) {
        unfocusPin(evt);
      });
      listen(pinElement, 'keydown', function (evt) {
        if (window.tools.isEsc(evt)) {
          unfocusPin(evt);
        }
      });
      renderedPins.push(pinElement);
      fragment.appendChild(pinElement);
    });
    mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPins,
    clear: clearPins
  };
})();
