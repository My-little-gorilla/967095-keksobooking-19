'use strict';

(function () {
  var findElement = window.tools.findElement;
  var listen = window.tools.listen;
  var unlisten = window.tools.listen;
  var isEsc = window.tools.isEsc;

  var succesSaveContent = findElement('#success').content;
  var succesSaveTemplate = findElement('.success', succesSaveContent);

  var errorSaveContent = findElement('#error').content;
  var errorSaveTemplate = findElement('.error', errorSaveContent);

  var errorLoadContent = findElement('#error-load').content;
  var errorLoadTemplate = findElement('.error', errorLoadContent);

  var renderModal = function (template, onCreated) {
    var element = template.cloneNode(true);

    var onDocumentKeydown = function (evt) {
      if (isEsc(evt)) {
        remove();
      }
    };

    var onClick = function () {
      remove();
    };

    var remove = function () {
      unlisten(element, 'click', onClick);
      unlisten(document, 'keydown', onDocumentKeydown);
      element.remove();
    };

    listen(document, 'keydown', onDocumentKeydown);
    listen(element, 'click', onClick);

    if (onCreated) {
      onCreated(element);
    }

    document.body.prepend(element);
  };

  var showSaveSuccess = function () {
    renderModal(succesSaveTemplate);
  };

  var showSaveError = function () {
    renderModal(errorSaveTemplate);
  };

  var showLoadError = function (errText) {
    renderModal(errorLoadTemplate, function (modalElement) {
      var detailsElement = findElement('.error__details', modalElement);
      detailsElement.textContent = errText;
    });
  };

  window.modals = {
    showSaveSuccess: showSaveSuccess,
    showSaveError: showSaveError,
    showLoadError: showLoadError
  };
})();
