'use strict';

(function () {
  var notLetMore = function () {
    var roomNumber = window.tools.findedElement('#room_number');
    var capacity = window.tools.findedElement('#capacity');

    return roomNumber.value <= capacity.value;
  };


  mapAdForm.addEventListener('change', function (evt) {
    // var currentField = evt.target;
    // var currentFieldValue = evt.target.value;
    if (!notLetMore()) {
      evt.target.setCustomValidity('no!');
    }
  });

})();
