'use strict';

(function () {
  var ENTER = 13;
  var ESC = 27;
  var DEBOUNCE_INTERVAL = 300;

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

  var listen = function (element, event, handler, useCapture) {
    element.addEventListener(event, handler, useCapture);
  };

  var unlisten = function (element, event, handler, useCapture) {
    element.removeEventListener(event, handler, useCapture);
  };

  var debounce = function (cb) {
    var lastTimeOut = null;
    return function () {
      var parameters = arguments;
      if (lastTimeOut) {
        window.clearTimeOut(lastTimeOut);
      }
      lastTimeOut= window.setTimeOut(function () {
        cd.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.tools = {
    findElement: findElement,
    getRandomNumber: getRandomNumber,
    isEnter: isEnter,
    isEsc: isEsc,
    listen: listen,
    unlisten: unlisten,
    debounce: debounce
  };
})();
