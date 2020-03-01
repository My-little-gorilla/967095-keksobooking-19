'use strict';

(function () {

  var findElement = window.tools.findElement;

  var templatePinContent = findElement('#pin').content;
  var templatePin = findElement('.map__pin', templatePinContent);
  var mapPins = findElement('.map__pins', window.map.element);


  var renderPins = function (pinsArr) {
    var fragment = document.createDocumentFragment();
    pinsArr.forEach(function (pin) {
      var pinElement = templatePin.cloneNode(true);
      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElement.querySelector('img').src = pin.autor.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;

      pinElement.addEventListener('click', function () {
        window.card.createdCardElement(pin);
      });
      fragment.appendChild(pinElement);
    });
    mapPins.appendChild(fragment);
  };

  var createFeatures = function (features, cardElement) {
    var featureList = cardElement.querySelector('.popup__features');
    var featureFragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + features[i]);
      featureFragment.appendChild(featureElement);
    }
    featureList.appendChild(featureFragment);
  };

  window.pin = {
    renderedPins: renderPins,
    createdFeatures: createFeatures
  };
})();
