'use strict';

(function () {
  var ENTER = 13;
  var ESC = 27;

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

  var isEnter = function (evt) {
    return evt.keyCode === ENTER;
  };

  var isEsc = function (evt) {
    return evt.keyCode === ESC;
  };

  window.tools = {
    findElement: findElement,
    getRandomNumber: getRandomNumber,
    isEnter: isEnter,
    isEsc: isEsc
  };
})();
