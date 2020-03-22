'use strict';

(function () {
  var SUCCESS_STATUS_CODE = 200;
  var TIMEOUT = 10000;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var ErrorText = {
    GENERIC: 'Произошла ошибка запроса',
    CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос выполнялся слишком долго'
  };

  var request = function (url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError(ErrorText.GENERIC + ' ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorText.CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorText.TIMEOUT);
    });

    xhr.timeout = TIMEOUT;

    var method = data ? 'POST' : 'GET';

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request(Url.LOAD, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    request(Url.SAVE, onLoad, onError, data);
  };

  window.backend = {
    save: save,
    load: load
  };
})();
