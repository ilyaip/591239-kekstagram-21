'use strict';

const RANDOM_COMMENTS = 10;
const imgFilters = document.querySelector(".img-filters");
const filterDefault = document.querySelector("#filter-default");
const filterRandom = document.querySelector("#filter-random");
const filterDiscussed = document.querySelector("#filter-discussed");

let pictures = [];

function cleanPictures() {
  const userPictures = document.querySelectorAll(".picture");
  userPictures.forEach(function (item) {
    item.remove();
  });
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
  const clonedPictures = pictures.slice();
  window.debounce(function () {
    for (let i = 0; i < RANDOM_COMMENTS; i++) {
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
  const clonedPictures = pictures.slice();
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

function onSuccess(data) {
  pictures = data;
  imgFilters.classList.remove("img-filters--inactive");
  updateFilter(pictures);
}

window.backend.load(onSuccess, window.comments.onError);
