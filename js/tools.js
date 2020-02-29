'use strict';

(function () {
  var ENTER = 13;

  var findElement = function (query, element, all) {
    if (!element) {
      element = document;
    }
    var method = 'querySelector' + (all ? 'All' : '');
    return element[method](query);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };


  window.tools = {
    findedElement: findElement,
    randomElement: getRandomNumber,
    map: findElement('.map'),
    enterKeycode: ENTER
  };
})();
