'use strict';

const TIMEOUT_IN_MS = 10000;
const URL_POST = "https://21.javascript.pages.academy/kekstagram";
const URL_GET = "https://21.javascript.pages.academy/kekstagram/data";

const StatusCode = {
  OK: 200
};

function upload(data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  handleLoad(onSuccess, onError, xhr);
  xhr.open("POST", URL_POST);
  xhr.send(data);
}

function load(onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  handleLoad(onSuccess, onError, xhr);
  xhr.open("GET", URL_GET);
  xhr.send();
}

function handleLoad(onSuccess, onError, request) {
  request.responseType = "json";
  request.timeout = TIMEOUT_IN_MS;

  request.addEventListener("load", function () {
    if (request.status === StatusCode.OK) {
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
  upload,
  load
};

