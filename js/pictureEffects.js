'use strict';

// Наложение эффекта и его насыщенности на изображение, изменение масштаба

var MAX_ZOOM = 100;
var MIN_ZOOM = 25;
var STEP = 25;
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

window.dialog.controlValue.value = MAX_ZOOM + "%";

var increaseZoom = function () {
  var oldValue = Number.parseInt(window.dialog.controlValue.value, 10);
  var newValue = oldValue + STEP;
  var result = newValue >= MAX_ZOOM ? MAX_ZOOM : newValue;
  window.dialog.controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
};

var decreaseZoom = function () {
  var oldValue = Number.parseInt(window.dialog.controlValue.value, 10);
  var newValue = oldValue - STEP;
  var result = newValue <= MIN_ZOOM ? MIN_ZOOM : newValue;
  window.dialog.controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
};

window.dialog.controlBigger.addEventListener("click", function () {
  increaseZoom();
});

window.dialog.controlSmaller.addEventListener("click", function () {
  decreaseZoom();
});

var pinSlider = document.querySelector(".effect-level__pin");
var pinField = document.querySelector(".effect-level");
var pinSliderValue = document.querySelector(".effect-level__value");
var uploadForm = document.querySelector(".img-upload__form");
var effectNone = document.querySelector("#effect-none");
var effectLevelDepth = document.querySelector(".effect-level__depth");
var uploadImg = document.querySelector(".img-upload__preview");
var sliderWidth = document.querySelector(".effect-level__line");

var currentEffect;
var sliderDefaultValue = {
  left: "450px",
  width: "100%"
};

uploadForm.addEventListener("change", checkedInput);

var filterChange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    uploadImg.style.filter = FILTERS[evt.target.value].DEFAULT;
  }
  currentEffect = evt.target.value;
  pinSlider.style.left = sliderDefaultValue.left;
  effectLevelDepth.style.width = sliderDefaultValue.width;
};

uploadForm.addEventListener("change", filterChange);

function checkedInput() {
  if (effectNone.checked) {
    pinField.classList.add("hidden");
  } else {
    pinField.classList.remove("hidden");
  }
}

function getSaturation(value) {
  return Math.round(((FILTERS[currentEffect].MAX_VALUE - FILTERS[currentEffect].MIN_VALUE) * (value / sliderWidth.offsetWidth) + FILTERS[currentEffect].MIN_VALUE) * 100) / 100;
}

function getValueSaturation(value) {
  switch (currentEffect) {
    case EFFECTS.CHROME:
      uploadImg.style.filter = `grayscale(${getSaturation(value) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.SEPIA:
      uploadImg.style.filter = `sepia(${getSaturation(value) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.MARVIN:
      uploadImg.style.filter = `invert(${getSaturation(value) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.PHOBOS:
      uploadImg.style.filter = `blur(${getSaturation(value) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.HEAT:
      uploadImg.style.filter = `brightness(${getSaturation(value) + FILTERS[currentEffect].UNIT})`;
      break;
    case EFFECTS.NONE:
      uploadImg.style.filter = "none";
      break;
  }
}

pinSlider.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

  var startX = evt.clientX;

  var dragged = false;

  var handlerMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    var newX = pinSlider.offsetLeft - shift;

    if (newX > 0 && newX < sliderWidth.offsetWidth) {
      pinSlider.style.left = newX + "px";
      effectLevelDepth.style.width = pinSlider.offsetLeft * 100 / sliderWidth.offsetWidth + "%";
    }

    getValueSaturation(newX);
    pinSliderValue.value = Number.parseInt(effectLevelDepth.style.width, 10);
  };

  var handlerMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", handlerMouseMove);
    document.removeEventListener("mouseup", handlerMouseUp);

    if (dragged) {
      var handlerClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        pinSlider.removeEventListener('click', handlerClickPreventDefault);
      };
      pinSlider.addEventListener('click', handlerClickPreventDefault);
    }
  };


  document.addEventListener("mousemove", handlerMouseMove);
  document.addEventListener("mouseup", handlerMouseUp);
});

