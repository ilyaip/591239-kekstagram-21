'use strict';

const RANDOM_COMMENTS = 10;
const imgFilters = document.querySelector(".img-filters");
const filterDefault = document.querySelector("#filter-default");
const filterRandom = document.querySelector("#filter-random");
const filterDiscussed = document.querySelector("#filter-discussed");

let pictures = [];

const cleanPictures = () => {
  const userPictures = document.querySelectorAll(".picture");
  userPictures.forEach((item) => {
    item.remove();
  });
};

const cleanActiveButton = () => {
  filterRandom.classList.remove("img-filters__button--active");
  filterDefault.classList.remove("img-filters__button--active");
  filterDiscussed.classList.remove("img-filters__button--active");
};

const updateFilter = (data) => {
  data.forEach((item) => {
    window.comments.renderPhoto(item);
  });
};

filterDefault.addEventListener("click", () => {
  cleanPictures();
  cleanActiveButton();
  window.debounce(() => {
    pictures.forEach((item) => {
      window.comments.renderPhoto(item);
    });
  });
  filterDefault.classList.add("img-filters__button--active");
});

filterRandom.addEventListener("click", () => {
  cleanPictures();
  cleanActiveButton();
  const clonedPictures = pictures.slice();
  window.debounce(() => {
    for (let i = 0; i < RANDOM_COMMENTS; i++) {
      const randomElementIndex = Math.floor(Math.random() * clonedPictures.length);
      window.comments.renderPhoto(clonedPictures[randomElementIndex]);
      clonedPictures.splice(randomElementIndex, 1);
    }
  }
  );
  filterRandom.classList.add("img-filters__button--active");
});

filterDiscussed.addEventListener("click", () => {
  cleanPictures();
  cleanActiveButton();
  const clonedPictures = pictures.slice();
  clonedPictures.sort((left, right) => {
    return right.comments.length - left.comments.length;
  });
  window.debounce(() => {
    clonedPictures.forEach((item) => {
      window.comments.renderPhoto(item);
    });
  });
  filterDiscussed.classList.add("img-filters__button--active");
});

const onSuccess = (data) => {
  pictures = data;
  imgFilters.classList.remove("img-filters--inactive");
  updateFilter(pictures);
};

window.backend.load(onSuccess, window.comments.onError);
