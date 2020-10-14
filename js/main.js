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
});

closeEditingForm.addEventListener("click", function () {
  closeForm();
  cleanInput();
});

// Изменение масштаба фото
var MAX_ZOOM = 100;
var MIN_ZOOM = 25;

controlValue.value = MAX_ZOOM + "%";

var increaseZoom = function () {
  if (Number.parseInt(controlValue.value) < MAX_ZOOM) {
    controlValue.value = Number.parseInt(controlValue.value) + MIN_ZOOM + "%";
    uploadImg.style.transform = `scale(0.${Number.parseInt(controlValue.value)})`;
  }
  if (Number.parseInt(controlValue.value) > 75) {
    uploadImg.style.transform = `scale(1)`;
  }
};

var decreaseZoom = function () {
  if (Number.parseInt(controlValue.value) > MIN_ZOOM) {
    controlValue.value = Number.parseInt(controlValue.value) - MIN_ZOOM + "%";
    uploadImg.style.transform = `scale(0.${Number.parseInt(controlValue.value)})`;
  }
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
var inputFilter = document.querySelectorAll(".effects__radio");
var effectChrome = document.querySelector("#effect-chrome");
var effectSepia = document.querySelector("#effect-sepia");
var effectMarvin = document.querySelector("#effect-marvin");
var effectPhobos = document.querySelector("#effect-phobos");
var effectHeat = document.querySelector("#effect-heat");
var effectNone = document.querySelector("#effect-none");
var effectList = document.querySelectorAll(".effects__item");


var filterChange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    uploadImg.classList.add(`effects__preview--${evt.target.value}`);
  }
};

uploadForm.addEventListener("change", cleanClass);
uploadForm.addEventListener("change", filterChange);

function checkedInput() {
  if (effectNone.checked) {
    pinField.classList.add("hidden");
  } else {
    pinField.classList.remove("hidden");
  }
}

uploadForm.addEventListener("change", checkedInput);

function cleanClass() {
  uploadImg.classList.remove("effects__preview--chrome");
  uploadImg.classList.remove("effects__preview--sepia");
  uploadImg.classList.remove("effects__preview--marvin");
  uploadImg.classList.remove("effects__preview--phobos");
  uploadImg.classList.remove("effects__preview--heat");
}

function test() {
pinSlider.addEventListener("mouseup", function () {
    if (uploadImg.classList.contains("effects__preview--chrome")) {
      uploadImg.style.filter = "grayscale(0.5)";
    } else if (uploadImg.classList.contains("effects__preview--sepia")) {
      uploadImg.style.filter = "sepia(1)";
    } else if (uploadImg.classList.contains("effects__preview--marvin")) {
      uploadImg.style.filter = "invert(10%)";
    } else if (uploadImg.classList.contains("effects__preview--phobos")) {
      uploadImg.style.filter = "blur(10px)";
    } else if (uploadImg.classList.contains("effects__preview--heat")) {
      uploadImg.style.filter = "brightness(2)";
    } else if (effectNone) {
      uploadImg.style.filter = "none";
    }
  });
}

uploadForm.addEventListener("change", test);

// Валидация хэш-тегов

var inputHashtags = document.querySelector(".text__hashtags");
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var re = /^#[\w\d\й\Й\ц\Ц\у\У\к\К\е\Е\н\Н\г\Г\ш\Ш\щ\Щ\з\З\х\Х\ъ\ф\Ф\ы\Ы\в\В\а\А\п\П\р\Р\о\О\л\Л\д\Д\ж\Ж\э\Э\я\Я\ч\Ч\с\С\м\М\и\И\т\Т\ь\Ь\б\Б\ю\Ю]*$/;

var comparisonOfHashtags = function (array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = (i + 1); j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
};

inputHashtags.addEventListener('input', function () {
  var hashtagsArray = inputHashtags.value.trim().toLowerCase().split(/\s+/);
  console.log(hashtagsArray);
  for (var i = 0; i < hashtagsArray.length; i++) {
    var valueLength = hashtagsArray[i].length;
    if (valueLength < MIN_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег не может состоять только из #");
    } else if (valueLength >= MAX_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег должен содержать не польше 20-ти символов");
    } else if (!re.test(hashtagsArray[i])) {
      inputHashtags.setCustomValidity("Хэш-тег должен начинаться с # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.");
    } else if (i > 4) {
      inputHashtags.setCustomValidity("Нельзя указать больше 5 хэш-тегов");
    } else {
      inputHashtags.setCustomValidity('');
    }
  }
  if (comparisonOfHashtags(hashtagsArray)) {
    inputHashtags.setCustomValidity("Хэш-теги не должны повторяться");
  }
});

