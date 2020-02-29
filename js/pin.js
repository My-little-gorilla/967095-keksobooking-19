'use strict';

(function () {
  var TOTAL_POSTS = 8;
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  var cardElement = null;
  var templatePin = window.tools.findedElement('#pin').content.querySelector('.map__pin');
  var mapPins = window.tools.map.querySelector('.map__pins');


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
