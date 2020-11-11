'use strict';

var imgFilters = document.querySelector(".img-filters");
var filterDefault = document.querySelector("#filter-default");
var filterRandom = document.querySelector("#filter-random");
var filterDiscussed = document.querySelector("#filter-discussed");
var RANDOM_COMMENTS = 10;

var pictureArray = [];

function cleanPictures() {
  var pictures = document.querySelectorAll(".picture");
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }
}

function cleanActiveButton() {
  filterRandom.classList.remove("img-filters__button--active");
  filterDefault.classList.remove("img-filters__button--active");
  filterDiscussed.classList.remove("img-filters__button--active");
}

function updateFilter(data) {
  for (var i = 0; i < data.length; i++) {
    window.rendercomments.renderPhoto(data[i]);
  }
}

filterDefault.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  window.debounce(function () {
    for (var i = 0; i < pictureArray.length; i++) {
      window.rendercomments.renderPhoto(pictureArray[i]);
    }
  });
  filterDefault.classList.add("img-filters__button--active");
});

filterRandom.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  var discussedArray = [];
  discussedArray = discussedArray.concat(pictureArray);
  window.debounce(function () {
    for (var i = 0; i < RANDOM_COMMENTS; i++) {
      const randomElementIndex = Math.floor(Math.random() * discussedArray.length);
      window.rendercomments.renderPhoto(discussedArray[randomElementIndex]);
      discussedArray.splice(randomElementIndex, 1);
    }
  }
  );
  filterRandom.classList.add("img-filters__button--active");
});

filterDiscussed.addEventListener("click", function () {
  cleanPictures();
  cleanActiveButton();
  var discussedArray = [];
  discussedArray = discussedArray.concat(pictureArray);
  discussedArray.sort(function (left, right) {
    return right.comments.length - left.comments.length;
  });
  window.debounce(function () {
    for (var i = 0; i < discussedArray.length; i++) {
      window.rendercomments.renderPhoto(discussedArray[i]);
    }
  });
  filterDiscussed.classList.add("img-filters__button--active");
});

var successHandler = function (data) {
  pictureArray = data;
  imgFilters.classList.remove("img-filters--inactive");
  updateFilter(pictureArray);
};

window.backend.load(successHandler, window.rendercomments.errorHandler);
