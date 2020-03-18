'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
    window.upload = function (data) {


      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
};
})();
