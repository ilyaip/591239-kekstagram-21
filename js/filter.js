'use strict';

(function () {
  let imgFilters = document.querySelector(".img-filters");
  let filterDefault = document.querySelector("#filter-default");
  let filterRandom = document.querySelector("#filter-random");
  let filterDiscussed = document.querySelector("#filter-discussed");
  let RANDOM_COMMENTS = 10;

  let pictureArray = [];

  function cleanPictures() {
    let pictures = document.querySelectorAll(".picture");
    for (let i = 0; i < pictures.length; i++) {
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
    window.debounce(function () {
      for (var i = 0; i < RANDOM_COMMENTS; i++) {
        window.rendercomments.renderPhoto(window.utils.getRandomElement(pictureArray));
      }
    }
    );
    filterRandom.classList.add("img-filters__button--active");
  });

  filterDiscussed.addEventListener("click", function () {
    cleanPictures();
    cleanActiveButton();
    let discussedArray = [];
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

  const successHandler = function (data) {
    pictureArray = data;
    console.log(pictureArray);
    imgFilters.classList.remove("img-filters--inactive");
    updateFilter(pictureArray);
  };

  window.backend.load(successHandler, window.rendercomments.errorHandler);
})();
