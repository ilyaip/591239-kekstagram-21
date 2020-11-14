'use strict';

var statusCode = {
  OK: 200
};
var TIMEOUT_IN_MS = 10000;

var upload = function (data, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  var URL = "https://21.javascript.pages.academy/kekstagram";
  handlerLoad(onSuccess, onError, xhr);
  xhr.open("POST", URL);
  xhr.send(data);
};

var load = function (onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  var URL = "https://21.javascript.pages.academy/kekstagram/data";
  handlerLoad(onSuccess, onError, xhr);
  xhr.open("GET", URL);
  xhr.send();
};

function handlerLoad(onSuccess, onError, request) {
  request.responseType = "json";
  request.timeout = TIMEOUT_IN_MS;

  request.addEventListener("load", function () {
    if (request.status === statusCode.OK) {
      onSuccess(request.response);
    } else {
      onError("Статус ответа: " + request.status + " " + request.statusText);
    }
  });
  request.addEventListener("error", function () {
    onError("Произошла ошибка соединения");
  });
  request.addEventListener("timeout", function () {
    onError("Запрос не успел выполниться за " + request.timeout + "мс");
  });
}

window.backend = {
  upload: upload,
  load: load,
};

