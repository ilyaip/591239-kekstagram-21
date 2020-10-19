'use strict';

var PHOTO_ARRAY_LENGHT = 25;
var MIN_NUMBER_PHOTO = 1;
var MAX_NUMBER_PHOTO = 6;
var MIN_NUMBER_OF_COMMENTS = 1;
var MAX_NUMBER_OF_COMMENTS = 5;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var picturesArray = [];
var comments = [];
var COMMENT_NAME = ["Anton", "Max", "Kantimir", "Marusya", "Toma", "Joshua"];
var COMMENT_DESCRIPTION = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];
var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
var pictureList = document.querySelector(".pictures");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createComments = function (commentsNumber) {
  for (var i = 0; i < commentsNumber; i++) {
    comments.push({
      avatar: `img/avatar-${getRandomInt(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO)}.svg`,
      message: COMMENT_DESCRIPTION[getRandomInt(0, COMMENT_DESCRIPTION.length - 1)],
      name: COMMENT_NAME[getRandomInt(0, COMMENT_NAME.length - 1)]
    });
  }
};

var createPictureArray = function () {
  for (var i = 0; i < PHOTO_ARRAY_LENGHT; i++) {
    var numberOfComment = getRandomInt(MIN_NUMBER_OF_COMMENTS, MAX_NUMBER_OF_COMMENTS);
    picturesArray.push({
      url: `photos/${i + 1}.jpg`,
      description: "Hello",
      like: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: createComments(numberOfComment),
      commentsNumber: numberOfComment
    });
  }
};

createPictureArray();

var renderPhoto = function (photo) {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(".picture__img").src = photo.url;
  picturElement.querySelector(".picture__likes").textContent = photo.like;
  picturElement.querySelector(".picture__comments").textContent = photo.commentsNumber;

  pictureList.appendChild(picturElement);
};

var renderPhotos = function () {
  for (var i = 0; i < picturesArray.length; i++) {
    renderPhoto(picturesArray[i]);
  }
};

renderPhotos();

// 10. Личный проект: доверяй, но проверяй (часть 1)

var inputUploadFile = document.querySelector("#upload-file");
var editingForm = document.querySelector(".img-upload__overlay");
var body = document.querySelector("body");
var closeEditingForm = document.querySelector("#upload-cancel");
var controlSmaller = document.querySelector(".scale__control--smaller");
var controlBigger = document.querySelector(".scale__control--bigger");
var controlValue = document.querySelector(".scale__control--value");
var uploadImg = document.querySelector(".img-upload__preview");

// Открытие и закрытие формы редактирования фото

var openForm = function () {
  editingForm.classList.remove("hidden");
  body.classList.add("modal-open");

  document.addEventListener("keydown", onPopupEscPress);
};

var closeForm = function () {
  editingForm.classList.add("hidden");
  body.classList.remove("modal-open");

  document.removeEventListener("keydown", onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if ((inputHashtags != document.activeElement) && (evt.key === 'Escape')) {
    evt.preventDefault();
    editingForm.classList.add("hidden");
    body.classList.remove("modal-open");
  }
};

var cleanInput = function () {
  inputUploadFile.value = "";
};

inputUploadFile.addEventListener("change", function () {
  openForm();
  controlValue.value = "100%";
  uploadImg.style.transform = "scale(1)";
});

closeEditingForm.addEventListener("click", function () {
  closeForm();
  cleanInput();
  cleanFilters();
});

// Изменение масштаба фото
var MAX_ZOOM = 100;
var MIN_ZOOM = 25;
var STEP = 25;

controlValue.value = MAX_ZOOM + "%";

var increaseZoom = function () {
  var oldValue = Number.parseInt(controlValue.value);
  var newValue = oldValue + STEP;
  var result = newValue >= MAX_ZOOM ? MAX_ZOOM : newValue;
  controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
};

var decreaseZoom = function () {
  var oldValue = Number.parseInt(controlValue.value);
  var newValue = oldValue - STEP;
  var result = newValue <= MIN_ZOOM ? MIN_ZOOM : newValue;
  controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
};

controlBigger.addEventListener("click", function () {
  increaseZoom();
});

controlSmaller.addEventListener("click", function () {
  decreaseZoom();
});

// Наложение эффекта на изображение

var pinSlider = document.querySelector(".effect-level__pin");
var effectLevelValue = document.querySelector(".effect-level__value");
var pinField = document.querySelector(".effect-level");
var uploadForm = document.querySelector(".img-upload__form");
var effectNone = document.querySelector("#effect-none");
var effectLevelDepth = document.querySelector(".effect-level__depth");

var FILTERS = {
  chrome: {
    DEFAULT: "grayscale(1)",
    MIN_VALUE: "0",
    MAX_VALUE: "1",
    UNIT: ""
  },
  sepia: {
    DEFAULT: "sepia(1)",
    MIN_VALUE: "0",
    MAX_VALUE: "1",
    UNIT: ""
  },
  marvin: {
    DEFAULT: "invert(100%)",
    MIN_VALUE: "0",
    MAX_VALUE: "100",
    UNIT: "%"
  },
  phobos: {
    DEFAULT: "blur(3px)",
    MIN_VALUE: "0",
    MAX_VALUE: "3",
    UNIT: "px"
  },
  heat: {
    DEFAULT: "brightness(3)",
    MIN_VALUE: "1",
    MAX_VALUE: "3",
    UNIT: ""
  },
  none: {
    DEFAULT: "none"
  },
};

var EFFECTS = {
  CHROME: "chrome",
  SEPIA: "sepia",
  MARVIN: "marvin",
  PHOBOS: "phobos",
  HEAT: "heat",
  NONE: "none"
};

var PIN_LENGHT = 450;
var currentEffect;
var pinValue;

uploadForm.addEventListener("change", checkedInput);

var filterChange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    uploadImg.style.filter = FILTERS[evt.target.value].DEFAULT;
  }
  pinValue = effectLevelDepth.offsetWidth;
  currentEffect = evt.target.value;
};

uploadForm.addEventListener("change", filterChange);

function checkedInput() {
  if (effectNone.checked) {
    pinField.classList.add("hidden");
  } else {
    pinField.classList.remove("hidden");
  }
}

function cleanFilters() {
  uploadImg.style.filter = "none";
}

function getSaturation(value) {
  return Math.round(((FILTERS[currentEffect].MAX_VALUE - FILTERS[currentEffect].MIN_VALUE) * (value / PIN_LENGHT) + FILTERS[currentEffect].MIN_VALUE) * 100) / 100;
}

pinSlider.addEventListener("mouseup", function () {
  switch (currentEffect) {
    case EFFECTS.CHROME:
      uploadImg.style.filter = `grayscale(${getSaturation(pinValue) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.SEPIA:
      uploadImg.style.filter = `sepia(${getSaturation(pinValue) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.MARVIN:
      uploadImg.style.filter = `invert(${Math.round(getSaturation(pinValue)) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.PHOBOS:
      uploadImg.style.filter = `blur(${getSaturation(pinValue) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.HEAT:
      uploadImg.style.filter = `brightness(${getSaturation(pinValue) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.NONE:
      uploadImg.style.filter = "none";
      break;
  }
});

// Валидация хэш-тегов

var inputHashtags = document.querySelector(".text__hashtags");
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS = 5;
var checkHashtags = /^#[a-zа-я0-9]{1,20}$/;

inputHashtags.addEventListener('input', function () {
  var hashtagsArray = inputHashtags.value.trim().toLowerCase().split(/\s+/);
  for (var i = 0; i < hashtagsArray.length; i++) {
    var valueLength = hashtagsArray[i].length;
    if (valueLength < MIN_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег не может состоять только из #");
    } else if (valueLength >= MAX_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег должен содержать не польше 20-ти символов");
    } else if (!checkHashtags.test(hashtagsArray[i])) {
      inputHashtags.setCustomValidity("Хэш-тег должен начинаться с # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.");
    } else if (i >= MAX_HASHTAGS) {
      inputHashtags.setCustomValidity("Нельзя указать больше 5 хэш-тегов");
    } else {
      inputHashtags.setCustomValidity('');
    }
    var duplicatedHashtags = hashtagsArray.filter(function (item) {
      return item === hashtagsArray[i];
    });
    if (duplicatedHashtags.length > 1) {
      inputHashtags.setCustomValidity("Хэш-теги не могут быть одинаковыми");
    }
  }
});

