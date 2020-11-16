'use strict';

var RANDOM_COMMENTS = 10;
var imgFilters = document.querySelector(".img-filters");
var filterDefault = document.querySelector("#filter-default");
var filterRandom = document.querySelector("#filter-random");
var filterDiscussed = document.querySelector("#filter-discussed");

var pictures = [];

function cleanPictures() {
  var userPictures = document.querySelectorAll(".picture");
  for (var i = 0; i < userPictures.length; i++) {
    userPictures[i].remove();
  }
}

function cleanActiveButton() {
  filterRandom.classList.remove("img-filters__button--active");
  filterDefault.classList.remove("img-filters__button--active");
  filterDiscussed.classList.remove("img-filters__button--active");
}

function updateFilter(data) {
  data.forEach(function (item) {
    window.comments.renderPhoto(item);
  });
}

filterDefault.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  window.debounce(function () {
    pictures.forEach(function (item) {
      window.comments.renderPhoto(item);
    });
  });
  filterDefault.classList.add("img-filters__button--active");
});

filterRandom.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  var clonedPictures = [];
  clonedPictures = clonedPictures.concat(pictures);
  window.debounce(function () {
    for (var i = 0; i < RANDOM_COMMENTS; i++) {
      const randomElementIndex = Math.floor(Math.random() * clonedPictures.length);
      window.comments.renderPhoto(clonedPictures[randomElementIndex]);
      clonedPictures.splice(randomElementIndex, 1);
    }
  }
  );
  filterRandom.classList.add("img-filters__button--active");
});

filterDiscussed.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  var clonedPictures = [];
  clonedPictures = clonedPictures.concat(pictures);
  clonedPictures.sort(function (left, right) {
    return right.comments.length - left.comments.length;
  });
  window.debounce(function () {
    clonedPictures.forEach(function (item) {
      window.comments.renderPhoto(item);
    });
  });
  filterDiscussed.classList.add("img-filters__button--active");
});

var successHandler = function (data) {
  pictures = data;
  imgFilters.classList.remove("img-filters--inactive");
  updateFilter(pictures);
};

window.backend.load(successHandler, window.comments.errorHandler);
