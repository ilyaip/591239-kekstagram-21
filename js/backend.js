'use strict';

var statusCode = {
  OK: 200
};
var TIMEOUT_IN_MS = 10000;

var upload = function (data, handlerSuccess, handlerError) {
  var xhr = new XMLHttpRequest();
  var URL = "https://21.javascript.pages.academy/kekstagram";
  handleLoad(handlerSuccess, handlerError, xhr);
  xhr.open("POST", URL);
  xhr.send(data);
};

var load = function (handlerSuccess, handlerError) {
  var xhr = new XMLHttpRequest();
  var URL = "https://21.javascript.pages.academy/kekstagram/data";
  handleLoad(handlerSuccess, handlerError, xhr);
  xhr.open("GET", URL);
  xhr.send();
};

function handleLoad(handlerSuccess, handlerError, request) {
  request.responseType = "json";
  request.timeout = TIMEOUT_IN_MS;

  request.addEventListener("load", function () {
    if (request.status === statusCode.OK) {
      handlerSuccess(request.response);
    } else {
      handlerError("Статус ответа: " + request.status + " " + request.statusText);
    }
  });
  request.addEventListener("error", function () {
    handlerError("Произошла ошибка соединения");
  });
  request.addEventListener("timeout", function () {
    handlerError("Запрос не успел выполниться за " + request.timeout + "мс");
  });
}

window.backend = {
  upload,
  load
};

